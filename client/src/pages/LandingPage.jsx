import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { menuItems } from "../data/mockMenu";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/Toast";
import RotatingBadge from "../components/RotatingBadge";
import { useState } from "react";
import "./LandingPage.css";

/* ── Scroll-reveal hook (GSAP when available, CSS fallback) ── */
function useScrollReveal(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll("[data-reveal]");
    if (!els.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      els.forEach((el) => el.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

const LandingPage = () => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const [toast, setToast] = useState({ message: "", type: "success" });
  useScrollReveal(pageRef);

  // 4 bestseller items for the bento grid
  const bestsellers = menuItems.filter((i) => i.isBestseller).slice(0, 4);

  const testimonials = [
    {
      id: 1,
      quote: "The Hazelnut Latte is poetry in ceramics. There is no other space in Bengaluru that treats midnight coffee with this reverence.",
      author: "Vogue Living",
      role: "Design & Atmosphere Column, 2024",
      rating: "★★★★★",
    },
    {
      id: 2,
      quote: "An intoxicating sanctuary of rich crema, jazz vinyl, and quiet genius. My blueprints find their soul here between midnight and four.",
      author: "Devina R.",
      role: "Architect & Urbanist",
      tag: "TABLE 04 REGULAR",
    },
  ];

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    addToCart(item);
    setToast({ message: `${item.name} added to your folio`, type: "success" });
  };

  const marqueeItems = [
    { label: "Ethiopia Yirgacheffe", italic: true },
    { label: "Cortado" },
    { label: "Night Owl Cold Brew", italic: true },
    { label: "Cardamom Croissant" },
    { label: "Aged Tiramisu", italic: true },
    { label: "Pour-Over V60" },
    { label: "Sumatra Gayo Natural", italic: true },
  ];

  return (
    <div className="na-landing" ref={pageRef}>

      {/* ════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════ */}
      <section className="na-hero">
        {/* Atmospheric glows */}
        <div className="na-hero__glow na-hero__glow--1" aria-hidden="true" />
        <div className="na-hero__glow na-hero__glow--2" aria-hidden="true" />

        <div className="na-container na-hero__inner">
          {/* Pre-header metadata strip */}
          <div className="na-hero__meta" data-reveal>
            <span className="na-hero__meta-dot" aria-hidden="true" />
            <span className="t-label-mono na-hero__meta-edition">
              Midnight Extraction Salon · Edition N°09
            </span>
            <div className="na-hero__meta-right t-label-mono-sm">
              <span>LAT 12.9716° N</span>
              <span aria-hidden="true">·</span>
              <span>SERVICE ACTIVE UNTIL 04:00 AM</span>
            </div>
          </div>

          {/* Main grid */}
          <div className="na-hero__grid">
            {/* Left — text column */}
            <div className="na-hero__text-col">
              {/* Monumental headline */}
              <h1 className="na-hero__headline t-display-hero" data-reveal style={{ transitionDelay: "0.05s" }}>
                <em className="na-hero__headline-italic">Slow coffee.</em>
                <strong className="na-hero__headline-bold">Fast mornings.</strong>
              </h1>

              <p className="t-body-lg na-hero__sub" data-reveal style={{ transitionDelay: "0.12s" }}>
                An artisanal nocturnal hideaway where single-origin micro-lots meet the hushed rhythm
                of late hours. Handcrafted extraction rituals for writers, architects, and midnight cartographers.
              </p>

              <div className="na-hero__ctas" data-reveal style={{ transitionDelay: "0.18s" }}>
                <Link
                  to={isAuthenticated ? "/menu" : "/login"}
                  className="na-btn na-btn--primary na-btn--lg"
                >
                  Order now · ₹220+
                </Link>
                <Link to="/reservation" className="na-btn na-btn--secondary na-btn--lg">
                  Book a table
                </Link>
                <span className="na-hero__next-brew t-label-mono">
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>schedule</span>
                  Next V60: 02:30 AM
                </span>
              </div>

              {/* Spec strip */}
              <div className="na-hero__spec-strip" data-reveal style={{ transitionDelay: "0.24s" }}>
                <div className="na-hero__spec">
                  <span className="t-label-mono-sm na-hero__spec-key">ROAST TEMP</span>
                  <span className="t-label-mono na-hero__spec-val">204.4°C</span>
                </div>
                <div className="na-hero__spec">
                  <span className="t-label-mono-sm na-hero__spec-key">EXTRACTION</span>
                  <span className="t-label-mono na-hero__spec-val">1:2.1 / 28s</span>
                </div>
                <div className="na-hero__spec">
                  <span className="t-label-mono-sm na-hero__spec-key">AMBIENCE</span>
                  <span className="t-label-mono na-hero__spec-val na-hero__spec-val--accent">33 RPM Vinyl</span>
                </div>
              </div>
            </div>

            {/* Right — image */}
            <div className="na-hero__image-col" data-reveal style={{ transitionDelay: "0.1s" }}>
              {/* Rotating badge */}
              <RotatingBadge
                className="na-hero__badge"
                size={112}
                text="FRESHLY ROASTED · BREWED WITH LOVE · 02:00 AM ·"
              />

              <div className="na-hero__img-wrap group">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
                  alt="Cinematic low-key espresso pour — Nocturne Atelier"
                  className="na-hero__img"
                  loading="eager"
                />
                <div className="na-hero__img-scrim" aria-hidden="true" />

                {/* Floating label */}
                <div className="na-hero__img-label">
                  <div className="na-hero__img-label-main">
                    <span className="t-label-mono-sm na-hero__img-microlot">Micro-Lot N°84</span>
                    <span className="t-headline-md na-hero__img-name">Guji Highland Reserve</span>
                  </div>
                  <div className="na-hero__img-batch t-label-mono-sm">BATCH FRESH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          MARQUEE STRIP
          ════════════════════════════════════════ */}
      <section className="na-marquee-strip" aria-hidden="true">
        <div className="na-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="na-marquee__item">
              <span className={`t-headline-md ${item.italic ? "na-marquee__italic" : ""}`}>
                {item.label}
              </span>
              <span className="t-label-mono na-marquee__dot">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          BESTSELLERS BENTO
          ════════════════════════════════════════ */}
      <section className="na-bento" id="bestsellers">
        <div className="na-container">
          <div className="na-bento__header" data-reveal>
            <div>
              <span className="t-label-mono-sm na-bento__eyebrow">Folio Selections · Autumn Menu</span>
              <h2 className="t-headline-lg na-bento__title">Midnight Provisions</h2>
            </div>
            <p className="t-body-md na-bento__sub">
              Extracted on bespoke Slayer espresso groups and gravity drip towers.
              Pastries baked twice daily in our subterranean bakehouse.
            </p>
          </div>

          <div className="na-bento__grid">
            {bestsellers.map((item, idx) => (
              <article
                key={item.id}
                className={`na-bento__card ${idx === 0 ? "na-bento__card--wide" : idx === 3 ? "na-bento__card--wide na-bento__card--wide-last" : ""}`}
                data-reveal
                style={{ transitionDelay: `${idx * 0.07}s` }}
              >
                <div className="na-bento__card-img-wrap group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="na-bento__card-img"
                    loading="lazy"
                  />
                  {/* Tags */}
                  {idx === 0 && (
                    <div className="na-bento__card-tags">
                      <span className="na-chip">Single Origin</span>
                      <span className="na-chip">Chilled 18H</span>
                    </div>
                  )}
                  <div className="na-bento__card-price t-label-mono">₹{item.price}</div>
                </div>

                <div className="na-bento__card-body">
                  <div>
                    <div className="na-bento__card-title-row">
                      <h3 className={`t-headline-md ${idx === 0 ? "na-bento__card-name--italic" : ""}`}>
                        {item.name}
                      </h3>
                      {item.isBestseller && (
                        <span className="t-label-mono-sm na-bento__card-sig">SIGNATURE RECIPE</span>
                      )}
                    </div>
                    <p className="t-body-md na-bento__card-desc">{item.description}</p>
                  </div>

                  <div className="na-bento__card-footer">
                    <span className="t-label-mono-sm na-bento__card-notes">
                      {item.tags?.join(" · ") || item.category}
                    </span>
                    <button
                      type="button"
                      className="na-bento__add-btn"
                      onClick={() => handleAddToCart(item)}
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="na-bento__cta" data-reveal>
            <Link to={isAuthenticated ? "/menu" : "/login"} className="na-btn na-btn--ghost na-btn--md">
              Browse full menu
              <span className="na-btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          OUR STORY — SPLIT EDITORIAL
          ════════════════════════════════════════ */}
      <section className="na-story">
        <div className="na-container na-story__grid">
          {/* Left — portrait */}
          <div className="na-story__media" data-reveal>
            <div className="na-story__img-wrap">
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
                alt="Barista executing precise pour-over — Nocturne Atelier"
                className="na-story__img"
                loading="lazy"
              />
              <div className="na-story__img-scrim" aria-hidden="true" />
            </div>
            {/* Floating archive quote */}
            <blockquote className="na-story__quote-card">
              <span className="t-label-mono-sm na-story__quote-meta">Archive Entry #001</span>
              <p className="t-body-sm na-story__quote-text">
                "We reject the idea that coffee belongs only to the sunrise rush.
                Midnight clarity demands deliberate patience."
              </p>
            </blockquote>
          </div>

          {/* Right — text */}
          <div className="na-story__text" data-reveal style={{ transitionDelay: "0.1s" }}>
            <span className="t-label-mono-sm na-story__eyebrow">Colophon &amp; Origins</span>
            <h2 className="t-headline-lg na-story__headline">
              Born at <em className="na-story__headline-accent">2:00 AM</em>
            </h2>

            <p className="t-body-lg na-story__body">
              Nocturne Atelier was founded inside a quiet basement laboratory in Indiranagar by three
              nocturnal thinkers: a typographer, an acoustic engineer, and a Q-grader. Frustrated by coffee
              houses that closed their heavy shutters just as our focus sharpened, we built a nocturnal sanctuary.
            </p>
            <p className="t-body-md na-story__body-sm">
              Every extraction here honours the night dweller. We roast on a restored 1978 San Franciscan drum
              roaster, profiling each bean to preserve origin acidity and complex florals without the astringent
              punch of commercial caffeine. We pair this with curated vinyl pressings played through hand-wound
              vacuum tube amplifiers.
            </p>

            {/* Stats */}
            <div className="na-story__stats">
              <div className="na-story__stat">
                <span className="t-display-xl na-story__stat-num">18<span className="na-story__stat-unit t-headline-md">h</span></span>
                <span className="t-label-mono-sm na-story__stat-label">Slow Extraction Cycle</span>
              </div>
              <div className="na-story__stat">
                <span className="t-display-xl na-story__stat-num">100<span className="na-story__stat-unit t-headline-md">%</span></span>
                <span className="t-label-mono-sm na-story__stat-label">Direct Trade Micro-Lots</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          REVIEWS — Pull Quotes
          ════════════════════════════════════════ */}
      <section className="na-reviews">
        <div className="na-container">
          <div className="na-reviews__header" data-reveal>
            <span className="t-label-mono-sm na-reviews__eyebrow">Critical Folio · Dispatches</span>
            <h2 className="t-headline-lg na-reviews__title">Echoes from the Salon</h2>
          </div>

          <div className="na-reviews__grid">
            {testimonials.map((t, i) => (
              <blockquote
                key={t.id}
                className="na-review-card"
                data-reveal
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div>
                  <span className="material-symbols-outlined na-review-card__icon">format_quote</span>
                  <p className="t-headline-md na-review-card__quote">{t.quote}</p>
                </div>
                <footer className="na-review-card__footer">
                  <div>
                    <cite className="t-title-sm na-review-card__author">{t.author}</cite>
                    <span className="t-label-mono-sm na-review-card__role">{t.role}</span>
                  </div>
                  <span className="t-label-mono na-review-card__rating">
                    {t.rating || t.tag}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HOURS & LOCATION — Light paper section
          ════════════════════════════════════════ */}
      <section className="na-location" id="reservations">
        <div className="na-container">
          <div className="na-location__paper">
            {/* Header */}
            <div className="na-location__paper-head">
              <div>
                <span className="t-label-mono na-location__eyebrow">Physical Sanctuary · Bengaluru</span>
                <h2 className="t-headline-lg na-location__title">Coordinates &amp; Nocturnal Hours</h2>
              </div>
              <div className="na-location__valet t-label-mono-sm">
                <span className="na-location__valet-dot" aria-hidden="true" />
                VALET AVAILABLE AFTER 08:00 PM
              </div>
            </div>

            <div className="na-location__grid" data-reveal>
              {/* Hours + address */}
              <div className="na-location__details">
                <div className="na-location__hours-block">
                  <span className="t-label-mono-sm na-location__hours-label">Operating Rhythm</span>
                  <div className="na-location__hours-rows t-label-mono">
                    <div className="na-location__hours-row">
                      <strong>MON — THU</strong>
                      <span>06:00 PM – 02:00 AM</span>
                    </div>
                    <div className="na-location__hours-row">
                      <strong>FRI — SUN</strong>
                      <span>06:00 PM – 04:00 AM</span>
                    </div>
                    <div className="na-location__hours-row na-location__hours-row--muted t-body-sm">
                      <span>MIDNIGHT TASTING FLIGHT</span>
                      <span>DAILY AT 00:00 AM</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="t-label-mono-sm na-location__addr-label">Salon Address</span>
                  <p className="t-body-lg na-location__addr">
                    14 Rue de l'Étoile, 100ft Road,<br />
                    Indiranagar, Bengaluru — 560038
                  </p>
                  <div className="t-label-mono na-location__contact">
                    <div>Tel: +91 80 4920 1844</div>
                    <div>Desk: concierge@nocturne.atelier</div>
                  </div>
                </div>

                <div className="na-location__actions">
                  <Link to="/reservation" className="na-btn na-btn--primary na-btn--md">
                    Reserve a Table
                  </Link>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="na-location__map">
                <img
                  src="https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=800&q=80"
                  alt="Nocturne Atelier neighborhood — Indiranagar, Bengaluru"
                  className="na-location__map-img"
                  loading="lazy"
                />
                <div className="na-location__map-overlay" aria-hidden="true" />
                <div className="na-location__map-pin">
                  <div className="na-location__map-pin-icon">
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>location_on</span>
                  </div>
                  <div>
                    <span className="t-title-sm na-location__map-name">Nocturne Salon</span>
                    <span className="t-label-mono-sm na-location__map-sub">Indiranagar 100ft Rd Corner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "success" })}
        />
      )}
    </div>
  );
};

export default LandingPage;
