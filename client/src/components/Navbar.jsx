import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  const close = () => setMobileOpen(false);

  const handleLogout = () => {
    logout();
    close();
    navigate("/");
  };

  const initials = user?.name ? user.name[0].toUpperCase() : "U";
  const firstName = user?.name?.split(" ")[0] || "Profile";

  return (
    <header className={`na-navbar ${scrolled ? "na-navbar--scrolled" : "na-navbar--top"}`} id="site-nav">
      <div className="na-navbar__inner na-container">

        {/* ── Brand ── */}
        <Link to="/" className="na-navbar__brand" onClick={close} aria-label="Nocturne Atelier home">
          {/* Coffee cup SVG logo mark */}
          <svg className="na-navbar__logo-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="14" cy="14" r="13" fill="var(--na-primary-cnt)" opacity="0.15"/>
            <path d="M8 10h12v7a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5V10Z" stroke="var(--na-primary)" strokeWidth="1.5" fill="none"/>
            <path d="M20 12h1.5a2.5 2.5 0 0 1 0 5H20" stroke="var(--na-primary)" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 6c0-1.5 2-2 2-3.5" stroke="var(--na-secondary)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <div className="na-navbar__brand-text">
            <span className="na-navbar__brand-name t-headline-md">Nocturne Atelier</span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="na-navbar__links" aria-label="Main navigation">
          <NavLink to="/"           className={({ isActive }) => `na-nav-link ${isActive ? "na-nav-link--active" : ""}`} end onClick={close}>Home</NavLink>
          <NavLink to="/menu"       className={({ isActive }) => `na-nav-link ${isActive ? "na-nav-link--active" : ""}`} onClick={close}>Menu</NavLink>
          <NavLink to="/reservation" className={({ isActive }) => `na-nav-link ${isActive ? "na-nav-link--active" : ""}`} onClick={close}>Reserve</NavLink>
          <NavLink to="/about"      className={({ isActive }) => `na-nav-link ${isActive ? "na-nav-link--active" : ""}`} onClick={close}>About</NavLink>
        </nav>

        {/* ── Actions ── */}
        <div className="na-navbar__actions">
          {/* Cart */}
          <Link to="/cart" className="na-navbar__cart" aria-label={`Cart, ${cartCount} items`}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>local_cafe</span>
            {cartCount > 0 && (
              <span className="na-navbar__cart-badge" aria-live="polite">{cartCount}</span>
            )}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <div className="na-navbar__user">
              <Link to="/profile" className="na-navbar__avatar" title="My Profile" onClick={close}>
                <span>{initials}</span>
              </Link>
              <span className="na-navbar__firstname t-body-sm">{firstName}</span>
              <button type="button" onClick={handleLogout} className="na-navbar__logout t-label-mono-sm">
                Logout
              </button>
            </div>
          ) : (
            <div className="na-navbar__auth">
              <Link to="/login" className="na-navbar__login t-body-sm">Sign In</Link>
              <Link to="/signup" className="na-navbar__signup na-btn na-btn--primary na-btn--sm">Join</Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            type="button"
            className={`na-navbar__ham ${mobileOpen ? "na-navbar__ham--open" : ""}`}
            onClick={() => setMobileOpen((p) => !p)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        id="mobile-menu"
        className={`na-navbar__mobile ${mobileOpen ? "na-navbar__mobile--open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <nav className="na-navbar__mobile-links" aria-label="Mobile navigation">
          <NavLink to="/"            className="na-mobile-link" end onClick={close}>Home</NavLink>
          <NavLink to="/menu"        className="na-mobile-link" onClick={close}>Menu</NavLink>
          <NavLink to="/reservation" className="na-mobile-link" onClick={close}>Reserve a Table</NavLink>
          <NavLink to="/about"       className="na-mobile-link" onClick={close}>About &amp; Contact</NavLink>
          <NavLink to="/cart"        className="na-mobile-link" onClick={close}>Cart {cartCount > 0 && `(${cartCount})`}</NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/profile" className="na-mobile-link" onClick={close}>Profile</NavLink>
              <button type="button" className="na-mobile-link na-mobile-link--logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login"  className="na-mobile-link" onClick={close}>Sign In</NavLink>
              <NavLink to="/signup" className="na-mobile-link na-mobile-link--cta" onClick={close}>Create Account</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
