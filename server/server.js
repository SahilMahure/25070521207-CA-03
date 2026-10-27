const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const initialMenuItems = require("./data/menuData");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || "VELVET_BREW_CAFE_SECRET_KEY_2026";
const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);
const port = process.env.PORT || 5000;

let db;
let usersCol;
let menuCol;
let ordersCol;
let reservationsCol;

async function initServer() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    db = client.db("velvetBrewCafe");
    usersCol = db.collection("users");
    menuCol = db.collection("menu");
    ordersCol = db.collection("orders");
    reservationsCol = db.collection("reservations");

    // Seed menu if empty
    const menuCount = await menuCol.countDocuments();
    if (menuCount === 0) {
      await menuCol.insertMany(initialMenuItems);
      console.log(`Seeded ${initialMenuItems.length} menu items to MongoDB`);
    }

    app.listen(port, () => {
      console.log(`Velvet Brew Cafe API server listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("MongoDB Connection error:", err.message);
    console.log("Starting server with memory fallback for development...");
    app.listen(port, () => {
      console.log(`Velvet Brew Cafe API server listening on fallback port ${port}`);
    });
  }
}

initServer();

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. Token missing." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid or expired token." });
    }
    req.user = decoded;
    next();
  });
}

// ==================== AUTH ROUTES ====================

// Sign Up
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Please provide a valid email address." });
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      return res.status(400).json({ success: false, message: "Phone number must be exactly 10 digits." });
    }

    if (password.length < 8 || !/\d/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters and include at least one number."
      });
    }

    if (usersCol) {
      const existingUser = await usersCol.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "An account with this email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name,
        email: email.toLowerCase(),
        phone: phoneDigits,
        password: hashedPassword,
        createdAt: new Date()
      };

      const result = await usersCol.insertOne(newUser);
      return res.status(201).json({
        success: true,
        message: "Account created successfully! Please log in.",
        userId: result.insertedId
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "Account created successfully! Please log in."
      });
    }
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Internal server error during registration." });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    if (usersCol) {
      const user = await usersCol.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid email or password." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid email or password." });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      });
    } else {
      const token = jwt.sign({ email, name: email.split("@")[0] }, JWT_SECRET, { expiresIn: "7d" });
      return res.json({
        success: true,
        token,
        user: { name: email.split("@")[0], email, phone: "1234567890" }
      });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Internal server error during login." });
  }
});

// Get Current User Profile
app.get("/api/auth/me", authenticateToken, async (req, res) => {
  try {
    if (usersCol && req.user.id) {
      const user = await usersCol.findOne({ _id: new ObjectId(req.user.id) }, { projection: { password: 0 } });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
      return res.json({ success: true, user });
    }
    res.json({ success: true, user: req.user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch user profile." });
  }
});

// Update Profile
app.put("/api/auth/profile", authenticateToken, async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (usersCol && req.user.id) {
      await usersCol.updateOne(
        { _id: new ObjectId(req.user.id) },
        { $set: { name, phone, updatedAt: new Date() } }
      );
    }
    res.json({ success: true, message: "Profile updated successfully.", user: { ...req.user, name, phone } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update profile." });
  }
});

// ==================== MENU ROUTES ====================

app.get("/api/menu", async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== "All") {
      query.category = category;
    }
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (menuCol) {
      const items = await menuCol.find(query).toArray();
      if (items && items.length > 0) {
        return res.json({ success: true, count: items.length, items });
      }
    }
    // Fallback if collection was empty or db disconnected
    let filtered = initialMenuItems;
    if (category && category !== "All") {
      filtered = filtered.filter(i => i.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      filtered = filtered.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
    }
    res.json({ success: true, count: filtered.length, items: filtered });
  } catch (err) {
    res.json({ success: true, items: initialMenuItems });
  }
});

// ==================== ORDER ROUTES ====================

app.post("/api/orders", authenticateToken, async (req, res) => {
  try {
    const { items, orderType, subtotal, tax, total, customerNotes } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: "No items in order." });
    }

    const orderId = "VB-" + Math.floor(100000 + Math.random() * 900000);
    const orderDoc = {
      orderId,
      userId: req.user.id || req.user.email,
      userEmail: req.user.email,
      userName: req.user.name,
      items,
      orderType: orderType || "Dine-in",
      subtotal: Number(subtotal),
      tax: Number(tax),
      total: Number(total),
      customerNotes: customerNotes || "",
      status: "Confirmed",
      estimatedMinutes: orderType === "Takeaway" ? 15 : 20,
      createdAt: new Date()
    };

    if (ordersCol) {
      await ordersCol.insertOne(orderDoc);
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: orderDoc
    });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ success: false, message: "Failed to place order." });
  }
});

app.get("/api/orders", authenticateToken, async (req, res) => {
  try {
    const query = { $or: [{ userId: req.user.id }, { userEmail: req.user.email }] };
    if (ordersCol) {
      const orders = await ordersCol.find(query).sort({ createdAt: -1 }).toArray();
      return res.json({ success: true, orders });
    }
    res.json({ success: true, orders: [] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch orders." });
  }
});

// ==================== RESERVATION ROUTES ====================

app.post("/api/reservations", authenticateToken, async (req, res) => {
  try {
    const { name, phone, date, timeSlot, guests, specialRequest } = req.body;

    if (!name || !phone || !date || !timeSlot || !guests) {
      return res.status(400).json({ success: false, message: "Please fill all required booking fields." });
    }

    const bookingId = "RES-" + Math.floor(10000 + Math.random() * 90000);
    const reservationDoc = {
      bookingId,
      userId: req.user.id || req.user.email,
      name,
      phone,
      date,
      timeSlot,
      guests: Number(guests),
      specialRequest: specialRequest || "",
      status: "Confirmed",
      tableAssigned: "Table " + Math.floor(1 + Math.random() * 18),
      createdAt: new Date()
    };

    if (reservationsCol) {
      await reservationsCol.insertOne(reservationDoc);
    }

    res.status(201).json({
      success: true,
      message: "Table reserved successfully!",
      reservation: reservationDoc
    });
  } catch (err) {
    console.error("Reservation error:", err);
    res.status(500).json({ success: false, message: "Failed to create reservation." });
  }
});

app.get("/api/reservations", authenticateToken, async (req, res) => {
  try {
    const query = { $or: [{ userId: req.user.id }, { phone: req.user.phone }] };
    if (reservationsCol) {
      const reservations = await reservationsCol.find(query).sort({ createdAt: -1 }).toArray();
      return res.json({ success: true, reservations });
    }
    res.json({ success: true, reservations: [] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch reservations." });
  }
});

// Health / Status
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", cafe: "Velvet Brew Café", time: new Date() });
});