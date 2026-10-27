import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token and user exist in storage
    const storedToken = localStorage.getItem("velvet_token") || sessionStorage.getItem("velvet_token");
    const storedUser = localStorage.getItem("velvet_user") || sessionStorage.getItem("velvet_user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setLoading(false);
  }, []);

  const signup = async (formData) => {
    const res = await api.signup(formData);
    return res;
  };

  const login = async ({ email, password, rememberMe }) => {
    const res = await api.login({ email, password });
    if (res.success && res.token) {
      setToken(res.token);
      setUser(res.user);

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("velvet_token", res.token);
      storage.setItem("velvet_user", JSON.stringify(res.user));

      // Clear the other storage to prevent state clashes
      const otherStorage = rememberMe ? sessionStorage : localStorage;
      otherStorage.removeItem("velvet_token");
      otherStorage.removeItem("velvet_user");
    }
    return res;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("velvet_token");
    localStorage.removeItem("velvet_user");
    sessionStorage.removeItem("velvet_token");
    sessionStorage.removeItem("velvet_user");
  };

  const updateProfile = async (updates) => {
    const res = await api.updateProfile(updates);
    if (res.success && res.user) {
      const merged = { ...user, ...res.user };
      setUser(merged);
      if (localStorage.getItem("velvet_token")) {
        localStorage.setItem("velvet_user", JSON.stringify(merged));
      } else {
        sessionStorage.setItem("velvet_user", JSON.stringify(merged));
      }
    }
    return res;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated: !!user, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
