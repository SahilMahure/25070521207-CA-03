import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import "./AboutPage.css";

const AboutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);

  const team = [
    {
      name: "Marcus Vance",
      role: "Head Roaster & Co-Founder",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=500&q=80",
      bio: "14 years of specialty coffee cupping experience across Ethiopia and Guatemala. Passionate about light floral roasts."
    },
    {
      name: "Claire Dubois",
      role: "Executive Pastry Chef",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=500&q=80",
      bio: "Trained at Le Cordon Bleu Paris. Believes that a morning croissant should crackle softly before melting in butter."
    },
    {
      name: "Julian Rivera",
      role: "Lead Barista & Sensory Trainer",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
      bio: "National Latte Art Finalist. Specializes in balancing espresso extraction pressure with delicate microfoam textures."
    }
  ];

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80",
      caption: "Espresso Extraction"
    },
    {
      url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80",
      caption: "Morning Sunlit Seating"
    },
    {
      url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
      caption: "Fresh French Croissants"
    },
    {
      url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80",
      caption: "Artisan Pour-Over Bar"
    },
    {
      url: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
      caption: "Cozy Fireside Booths"
    },
    {
      url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
      caption: "Handcrafted Latte Art"
    }
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Your name is required.";
    if (!formData.email.trim()) {
      errs.email = "Your email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) errs.subject = "Subject is required.";
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = "Message must be at least 10 characters long.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSentMessage(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="about-page-root animate-fade-in">
      {/* Story Hero */}
      <section className="about-hero-section">
        <div className="container about-hero-container">
          <div className="about-hero-text">
            <span className="section-badge">Our Heritage</span>
            <h1>A Warm Roastery Born from Pure Craftsmanship</h1>
            <p className="hero-p">
              Founded in 2018, Velvet Brew Café began with a modest 5-kilo vintage roaster and a dream:
              to slow down the morning rush and replace it with mindfulness, aroma, and meaningful human connection.
            </p>
            <p className="hero-p">
              We travel directly to micro-lot farms across South America and East Africa, paying ethical premium prices
              to producers who cultivate coffee with respect for soil and water. Every bag of beans is roast-profiled
              to highlight delicate notes of cacao, wild honey, and citrus blossoms.
            </p>
          </div>

          <div className="about-hero-media">
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80"
              alt="Raw coffee beans roasting"
              className="about-hero-img"
            />
          </div>
        </div>
      </section>

      {/* Team / Chefs */}
      <section className="section team-section">
        <div className="container">
          <div className="section-title">
            <span className="section-badge">The Artisans</span>
            <h2>Meet the Craftsmen Behind Your Cup</h2>
            <p>Our dedicated team blends culinary precision with unconditional hospitality.</p>
          </div>

          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className="team-card card-glass">
                <div className="team-img-wrapper">
                  <img src={member.image} alt={member.name} className="team-img" />
                </div>
                <div className="team-card-info">
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section gallery-section">
        <div className="container">
          <div className="section-title">
            <span className="section-badge">A Visual Tour</span>
            <h2>Life at Velvet Brew</h2>
            <p>A glimpse into our sunlit corners, crackling baked crusts, and morning rituals.</p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="gallery-item">
                <img src={img.url} alt={img.caption} loading="lazy" />
                <div className="gallery-overlay">
                  <span>{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section className="section contact-section">
        <div className="container">
          <div className="section-title">
            <span className="section-badge">Get in Touch</span>
            <h2>Visit or Drop Us a Letter</h2>
            <p>Have an inquiry about private events, catering, or wholesale bean orders?</p>
          </div>

          <div className="contact-grid">
            {/* Form */}
            <div className="contact-form-card card-glass">
              <h3>Send Us a Message</h3>
              <p className="contact-sub">We usually reply within 24 business hours.</p>

              {sentMessage ? (
                <div className="contact-success-box">
                  <div className="contact-success-icon">✓</div>
                  <h4>Message Dispatched!</h4>
                  <p>Thank you for reaching out. A Velvet Brew team member will write back shortly.</p>
                  <Button variant="outline" size="sm" onClick={() => setSentMessage(false)}>
                    Send Another Note
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="contact-form">
                  <Input
                    id="name"
                    label="Your Name"
                    placeholder="e.g. Eleanor Rigby"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                  />

                  <Input
                    id="email"
                    type="email"
                    label="Email Address"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />

                  <Input
                    id="subject"
                    label="Subject"
                    placeholder="Catering inquiry / feedback / wholesale"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    required
                  />

                  <div className="input-group-container">
                    <label htmlFor="message" className="input-label">
                      Message <span className="input-required">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      placeholder="Share your thoughts with us..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`input-field ${errors.message ? "has-error" : ""}`}
                      style={{ resize: "vertical" }}
                    ></textarea>
                    {errors.message && (
                      <span className="input-error-msg">{errors.message}</span>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Map & Physical Details Card */}
            <div className="contact-info-card card-glass">
              <h3>Find Our Roastery</h3>
              
              <div className="contact-details-list">
                <div className="detail-row">
                  <div className="detail-icon">📍</div>
                  <div>
                    <strong>Location</strong>
                    <p>124 Artisan Alley, Coffee District, NY 10012</p>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-icon">⏰</div>
                  <div>
                    <strong>Opening Hours</strong>
                    <p>Monday – Friday: 7:00 AM – 9:00 PM</p>
                    <p>Saturday – Sunday: 8:00 AM – 10:00 PM</p>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-icon">📞</div>
                  <div>
                    <strong>Phone</strong>
                    <p>(555) 349-2831</p>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-icon">✉️</div>
                  <div>
                    <strong>Email</strong>
                    <p>hello@velvetbrewcafe.com</p>
                  </div>
                </div>
              </div>

              {/* Embedded Interactive Map Card */}
              <div className="map-embed-wrapper">
                <iframe
                  title="Velvet Brew Cafe Map Location"
                  src="https://maps.google.com/maps?q=SoHo,New%20York&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: "var(--radius-md)" }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
