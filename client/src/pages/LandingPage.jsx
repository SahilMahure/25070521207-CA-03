import { Link } from "react-router-dom";
import { menuItems } from "../data/mockMenu";
import MenuCard from "../components/MenuCard";
import Button from "../components/Button";
import "./LandingPage.css";

const LandingPage = () => {
  // Get 4-6 bestseller items
  const bestsellers = menuItems.filter(item => item.isBestseller).slice(0, 6);

  const testimonials = [
    {
      id: 1,
      name: "Sophia Martinez",
      role: "Architect & Daily Regular",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      quote: "The Velvet Signature Latte is pure poetry. The ambient warm lighting and calm playlist make it my absolute favourite workspace.",
      rating: 5
    },
    {
      id: 2,
      name: "David Chen",
      role: "Food & Lifestyle Writer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      quote: "The avocado sourdough toast and dark chocolate molten cake are sublime. Hands down the highest quality coffee roastery in the neighborhood.",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Watson",
      role: "Creative Producer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      quote: "Booking our anniversary brunch here was the best decision. Warm hospitality, artisanal craftsmanship, and a breathtaking aesthetic.",
      rating: 5
    }
  ];

  return (
    <div className="landing-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-pill">✨ Artisanal Roastery & Gourmet Bakery</span>
            <h1 className="hero-title">
              Every Sip Tells a <span className="highlight-text">Warm Story.</span>
            </h1>
            <p className="hero-subtitle">
              Welcome to Velvet Brew Café. We hand-roast ethical micro-lot beans and bake golden,
              flaky pastries every dawn to bring you the coziest moments in town.
            </p>
            <div className="hero-cta-group">
              <Link to="/menu">
                <Button variant="primary" size="lg">
                  Order Now
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Button>
              </Link>
              <Link to="/reservation">
                <Button variant="outline" size="lg">
                  Book a Table
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </Button>
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num">100%</span>
                <span className="stat-label">Organic Arabica</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-num">4.9 ★</span>
                <span className="stat-label">Over 2,500+ Reviews</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-num">Fresh</span>
                <span className="stat-label">Baked Daily at 6 AM</span>
              </div>
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80"
                alt="Cozy Velvet Brew Cafe interior"
                className="hero-image-main"
              />
              <div className="hero-floating-card card-glass">
                <div className="floating-badge-icon">☕</div>
                <div>
                  <div className="floating-title">Signature Blend</div>
                  <div className="floating-sub">Dark Honey & Cocoa Roast</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Bestsellers */}
      <section className="section bestsellers-section">
        <div className="container">
          <div className="section-title">
            <span className="section-badge">House Favorites</span>
            <h2>Our Signature Bestsellers</h2>
            <p>Discovered, loved, and celebrated every day by coffee lovers and pastry connoisseurs.</p>
          </div>

          <div className="bestsellers-grid">
            {bestsellers.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>

          <div className="explore-menu-cta">
            <Link to="/menu">
              <Button variant="secondary" size="lg">
                Explore Full 24-Item Menu
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-choose-section">
        <div className="container">
          <div className="section-title">
            <span className="section-badge">The Velvet Standard</span>
            <h2>Why People Fall In Love With Us</h2>
            <p>Every small detail — from grind size to steam temperature — is dialed to perfection.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card card-glass">
              <div className="feature-icon-box">🌱</div>
              <h3>Ethical Single-Origin Beans</h3>
              <p>Directly sourced from sustainable family estates in Ethiopia, Colombia, and Costa Rica.</p>
            </div>
            <div className="feature-card card-glass">
              <div className="feature-icon-box">🥐</div>
              <h3>Pure French Butter Bakery</h3>
              <p>Hand-laminated sourdough croissants and molten treats, baked fresh every morning.</p>
            </div>
            <div className="feature-card card-glass">
              <div className="feature-icon-box">🕯️</div>
              <h3>Cozy Warm Sanctuary</h3>
              <p>Gentle acoustic notes, soothing oakwood textures, and fast complimentary Wi-Fi.</p>
            </div>
            <div className="feature-card card-glass">
              <div className="feature-icon-box">🏆</div>
              <h3>Champion Baristas</h3>
              <p>Specialty coffee certified brewers dedicated to delivering your dream cup of espresso.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-title">
            <span className="section-badge">Community Love</span>
            <h2>Words from Our Regulars</h2>
            <p>Read what our neighborhood coffee enthusiasts have to say about their visits.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map(t => (
              <div key={t.id} className="testimonial-card card-glass">
                <div className="testimonial-rating">
                  {"★".repeat(t.rating)}
                </div>
                <p className="testimonial-quote">“{t.quote}”</p>
                <div className="testimonial-author">
                  <img src={t.avatar} alt={t.name} className="author-avatar" />
                  <div>
                    <h4 className="author-name">{t.name}</h4>
                    <span className="author-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opening Hours & Location Banner */}
      <section className="section location-hours-section">
        <div className="container">
          <div className="location-hours-card">
            <div className="location-content">
              <span className="section-badge">Visit Today</span>
              <h2>Step Into Our Sanctuary</h2>
              <p className="location-desc">
                Whether you need a quick morning cold brew or a relaxed corner for your evening reading,
                our doors are always open with fresh roasts.
              </p>

              <div className="info-boxes-grid">
                <div className="info-box">
                  <div className="info-icon">📍</div>
                  <div>
                    <h4>Location</h4>
                    <p>124 Artisan Alley, Coffee District, NY 10012</p>
                  </div>
                </div>

                <div className="info-box">
                  <div className="info-icon">⏰</div>
                  <div>
                    <h4>Operating Hours</h4>
                    <p>Mon – Fri: 7:00 AM – 9:00 PM</p>
                    <p>Sat – Sun: 8:00 AM – 10:00 PM</p>
                  </div>
                </div>

                <div className="info-box">
                  <div className="info-icon">📞</div>
                  <div>
                    <h4>Direct Contact</h4>
                    <p>(555) 349-2831</p>
                    <p>hello@velvetbrewcafe.com</p>
                  </div>
                </div>
              </div>

              <div className="location-cta">
                <Link to="/reservation">
                  <Button variant="primary" size="md">Reserve a Cozy Table</Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="md">Learn Our Story</Button>
                </Link>
              </div>
            </div>

            <div className="location-image-side">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=700&q=80"
                alt="Velvet Brew Cafe storefront"
                className="storefront-img"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
