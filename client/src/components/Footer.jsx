import { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="na-footer" aria-label="Site footer">
      {/* ── Big NOCTURNE watermark ── */}
      <div className="na-footer__watermark" aria-hidden="true">
        <span className="t-display-hero">NOCTURNE</span>
      </div>

      <div className="na-footer__body na-container">
        <div className="na-footer__grid">

          {/* Newsletter col */}
          <div className="na-footer__col na-footer__col--wide">
            <span className="t-label-mono-sm na-footer__eyebrow">Dispatch &amp; Ephemera</span>
            <p className="t-headline-md na-footer__tagline">
              Late-night monographs, micro-lots, and nocturnal releases directly to your folio.
            </p>
            <form className="na-footer__form" onSubmit={handleSubscribe} noValidate>
              <div className="na-footer__form-field">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="collector@nocturne.atelier"
                  className="na-footer__input t-label-mono"
                  aria-label="Email address for newsletter"
                  required
                />
                <div className="na-footer__input-line" aria-hidden="true" />
              </div>
              <button type="submit" className="na-btn na-btn--primary na-btn--sm">
                {subscribed ? "Subscribed ✓" : "Subscribe"}
              </button>
            </form>
          </div>

          {/* Hours */}
          <div className="na-footer__col">
            <span className="t-label-mono-sm na-footer__eyebrow">Atelier Hours</span>
            <p className="t-label-mono na-footer__hours">
              Mon — Sun<br />
              <strong>07:00 PM – 04:00 AM</strong><br />
              Midnight extraction ritual at 00:00 AM
            </p>
          </div>

          {/* Coordinates */}
          <div className="na-footer__col">
            <span className="t-label-mono-sm na-footer__eyebrow">Sanctuary Coordinates</span>
            <p className="na-footer__address t-body-md">
              14 Rue de l'Étoile / Indiranagar 100ft Rd<br />
              Atmospheric Salon &amp; Espresso Laboratory<br />
              <a href="mailto:reservations@nocturne.coffee" className="na-footer__email t-label-mono">
                reservations@nocturne.coffee
              </a>
            </p>

            {/* Quick links */}
            <nav className="na-footer__links" aria-label="Footer navigation">
              <Link to="/">Home</Link>
              <Link to="/menu">Menu</Link>
              <Link to="/reservation">Reserve</Link>
              <Link to="/about">About</Link>
              <Link to="/cart">Cart</Link>
            </nav>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="na-footer__bottom">
          <div className="na-footer__copy t-label-mono-sm">
            <span>© MMXXIV Nocturne Atelier. All rights reserved.</span>
            <span>Roast Batch No. 0884</span>
          </div>
          <div className="na-footer__legal t-label-mono-sm">
            <a href="#">Colophon</a>
            <a href="#">Imprint</a>
            <a href="#">Privacy Protocol</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
