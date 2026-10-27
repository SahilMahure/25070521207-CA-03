import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
              <line x1="6" y1="1" x2="6" y2="4"></line>
              <line x1="10" y1="1" x2="10" y2="4"></line>
              <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
          </div>
          <div className="logo-text">
            <span className="brand-name">Velvet Brew</span>
            <span className="brand-sub">Café & Roastery</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="nav-links-desktop">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} end>
            Home
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Menu
          </NavLink>
          <NavLink to="/reservation" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Book a Table
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            About & Contact
          </NavLink>
        </nav>

        {/* Actions (Cart + Auth) */}
        <div className="navbar-actions">
          {/* Cart Icon */}
          <Link to="/cart" className="cart-btn" aria-label="Shopping Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {/* User Auth Section */}
          {isAuthenticated ? (
            <div className="user-menu-desktop">
              <Link to="/profile" className="user-badge" title="My Profile & Orders">
                <span className="user-avatar">{user?.name ? user.name[0].toUpperCase() : "U"}</span>
                <span className="user-name">{user?.name?.split(" ")[0]}</span>
              </Link>
              <button type="button" onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons-desktop">
              <Link to="/login" className="btn-nav-login">
                Login
              </Link>
              <Link to="/signup" className="btn-nav-signup">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-hamburger"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-content">
          <NavLink to="/" className="mobile-nav-link" onClick={closeMenu} end>
            Home
          </NavLink>
          <NavLink to="/menu" className="mobile-nav-link" onClick={closeMenu}>
            Menu & Order
          </NavLink>
          <NavLink to="/reservation" className="mobile-nav-link" onClick={closeMenu}>
            Table Reservation
          </NavLink>
          <NavLink to="/about" className="mobile-nav-link" onClick={closeMenu}>
            About & Contact
          </NavLink>
          <NavLink to="/cart" className="mobile-nav-link" onClick={closeMenu}>
            Cart ({cartCount})
          </NavLink>

          <div className="mobile-auth-section">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="mobile-profile-link" onClick={closeMenu}>
                  <span className="user-avatar">{user?.name ? user.name[0].toUpperCase() : "U"}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{user?.name}</div>
                    <div style={{ fontSize: "0.82rem", color: "var(--color-text-light)" }}>View Profile & Orders</div>
                  </div>
                </Link>
                <button type="button" onClick={handleLogout} className="mobile-logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <div className="mobile-auth-grid">
                <Link to="/login" className="mobile-btn-login" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/signup" className="mobile-btn-signup" onClick={closeMenu}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
