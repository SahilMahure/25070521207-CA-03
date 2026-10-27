import { menuItems as defaultMenuItems } from "../data/mockMenu";

const BASE_URL = "http://localhost:5000/api";

function getStoredToken() {
  return localStorage.getItem("velvet_token") || sessionStorage.getItem("velvet_token");
}

function authHeaders() {
  const token = getStoredToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

// Fallback Mock Storage for Orders & Reservations when backend is unreachable
function getLocalList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    return [];
  }
}

function saveLocalList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (e) {
    // Ignore storage quota
  }
}

export const api = {
  // Auth
  async signup(data) {
    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Sign up failed");
      return json;
    } catch (err) {
      if (err.message && err.message !== "Failed to fetch") {
        throw err;
      }
      // Offline fallback: save to local accounts
      const localUsers = getLocalList("velvet_users");
      const exists = localUsers.some(u => u.email.toLowerCase() === data.email.toLowerCase());
      if (exists) throw new Error("An account with this email already exists.");
      localUsers.push({ ...data, createdAt: new Date() });
      saveLocalList("velvet_users", localUsers);
      return { success: true, message: "Account created successfully! Please log in." };
    }
  },

  async login({ email, password }) {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Invalid credentials");
      return json;
    } catch (err) {
      if (err.message && err.message !== "Failed to fetch") {
        throw err;
      }
      // Offline fallback: verify against local accounts
      const localUsers = getLocalList("velvet_users");
      const found = localUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!found || found.password !== password) {
        throw new Error("Invalid email or password.");
      }
      const dummyToken = "local_token_" + Date.now();
      return {
        success: true,
        token: dummyToken,
        user: { name: found.name, email: found.email, phone: found.phone }
      };
    }
  },

  async getProfile() {
    try {
      const res = await fetch(`${BASE_URL}/auth/me`, {
        headers: authHeaders()
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      return await res.json();
    } catch (err) {
      const user = JSON.parse(localStorage.getItem("velvet_user") || "null");
      return { success: true, user };
    }
  },

  async updateProfile(updates) {
    try {
      const res = await fetch(`${BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(updates)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Update failed");
      return json;
    } catch (err) {
      const user = JSON.parse(localStorage.getItem("velvet_user") || "{}");
      const updated = { ...user, ...updates };
      localStorage.setItem("velvet_user", JSON.stringify(updated));
      return { success: true, user: updated, message: "Profile updated successfully." };
    }
  },

  // Menu
  async getMenu(category = "All", search = "") {
    try {
      const query = new URLSearchParams();
      if (category && category !== "All") query.append("category", category);
      if (search) query.append("search", search);

      const res = await fetch(`${BASE_URL}/menu?${query.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch menu");
      const json = await res.json();
      return json.items || defaultMenuItems;
    } catch (err) {
      let filtered = [...defaultMenuItems];
      if (category && category !== "All") {
        filtered = filtered.filter(i => i.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        filtered = filtered.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
      }
      return filtered;
    }
  },

  // Orders
  async createOrder(orderData) {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(orderData)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to place order");
      return json.order;
    } catch (err) {
      const order = {
        orderId: "VB-" + Math.floor(100000 + Math.random() * 900000),
        ...orderData,
        status: "Confirmed",
        estimatedMinutes: orderData.orderType === "Takeaway" ? 15 : 20,
        createdAt: new Date().toISOString()
      };
      const list = getLocalList("velvet_orders");
      list.unshift(order);
      saveLocalList("velvet_orders", list);
      return order;
    }
  },

  async getOrders() {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        headers: authHeaders()
      });
      if (!res.ok) throw new Error("Failed to get orders");
      const json = await res.json();
      return json.orders || [];
    } catch (err) {
      return getLocalList("velvet_orders");
    }
  },

  // Reservations
  async createReservation(resData) {
    try {
      const res = await fetch(`${BASE_URL}/reservations`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(resData)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to reserve table");
      return json.reservation;
    } catch (err) {
      const reservation = {
        bookingId: "RES-" + Math.floor(10000 + Math.random() * 90000),
        ...resData,
        status: "Confirmed",
        tableAssigned: "Table " + Math.floor(1 + Math.random() * 18),
        createdAt: new Date().toISOString()
      };
      const list = getLocalList("velvet_reservations");
      list.unshift(reservation);
      saveLocalList("velvet_reservations", list);
      return reservation;
    }
  },

  async getReservations() {
    try {
      const res = await fetch(`${BASE_URL}/reservations`, {
        headers: authHeaders()
      });
      if (!res.ok) throw new Error("Failed to get reservations");
      const json = await res.json();
      return json.reservations || [];
    } catch (err) {
      return getLocalList("velvet_reservations");
    }
  }
};
