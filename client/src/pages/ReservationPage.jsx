import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import Input from "../components/Input";
import Button from "../components/Button";
import "./ReservationPage.css";

const ReservationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const todayStr = new Date().toISOString().split("T")[0];

  const timeSlots = [
    "08:30 AM - Morning Breakfast",
    "10:00 AM - Mid-Morning Coffee",
    "11:30 AM - Early Lunch",
    "01:00 PM - Afternoon Dining",
    "03:00 PM - Tea & Pastries",
    "05:00 PM - Sunset Roasts",
    "06:30 PM - Evening Dinner",
    "08:00 PM - Late Night Chill"
  ];

  const seatingOptions = [
    "Cozy Window Corner",
    "Garden Terrace (Outdoor)",
    "Main Lounge Bar",
    "Quiet Books & Work Booth",
    "Private Alcove (Groups)"
  ];

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    date: todayStr,
    timeSlot: timeSlots[1],
    guests: "2",
    seatingPreference: seatingOptions[0],
    specialRequest: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: "" }));
    if (serverError) setServerError("");
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Guest name is required.";
    const digits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      errs.phone = "Contact phone is required.";
    } else if (digits.length !== 10) {
      errs.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!formData.date) errs.date = "Reservation date is required.";
    if (formData.date < todayStr) errs.date = "Reservation date cannot be in the past.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError("");

    try {
      const res = await api.createReservation({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        date: formData.date,
        timeSlot: formData.timeSlot,
        guests: formData.guests,
        specialRequest: `${formData.seatingPreference}. ${formData.specialRequest}`.trim()
      });

      setConfirmation(res);
    } catch (err) {
      setServerError(err.message || "Failed to confirm table booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reservation-page-root animate-fade-in">
      <div className="container">
        {confirmation ? (
          <div className="reservation-confirmed-card card-glass">
            <div className="res-confirm-icon">🎉</div>
            <span className="section-badge">Booking Confirmed</span>
            <h2>We Can't Wait to Welcome You!</h2>
            <p className="res-confirm-subtitle">
              Your table at <strong>Velvet Brew Café</strong> has been reserved.
              A confirmation text has been dispatched to {confirmation.phone}.
            </p>

            <div className="res-details-box">
              <div className="res-id-banner">
                <span>Confirmation Code:</span>
                <strong>{confirmation.bookingId}</strong>
              </div>

              <div className="res-info-grid">
                <div className="res-info-item">
                  <span className="res-item-label">Reserved For:</span>
                  <span className="res-item-val">{confirmation.name}</span>
                </div>
                <div className="res-info-item">
                  <span className="res-item-label">Guests:</span>
                  <span className="res-item-val">{confirmation.guests} Guests</span>
                </div>
                <div className="res-info-item">
                  <span className="res-item-label">Date:</span>
                  <span className="res-item-val">{confirmation.date}</span>
                </div>
                <div className="res-info-item">
                  <span className="res-item-label">Time Slot:</span>
                  <span className="res-item-val">{confirmation.timeSlot}</span>
                </div>
                <div className="res-info-item">
                  <span className="res-item-label">Table:</span>
                  <span className="res-item-val res-highlight">{confirmation.tableAssigned || "Table 7 (Window)"}</span>
                </div>
                <div className="res-info-item">
                  <span className="res-item-label">Status:</span>
                  <span className="status-badge status-confirmed">Confirmed</span>
                </div>
              </div>

              {confirmation.specialRequest && (
                <div className="res-special-note">
                  <strong>Notes:</strong> {confirmation.specialRequest}
                </div>
              )}
            </div>

            <div className="res-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/profile")}
              >
                View in My Profile
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setConfirmation(null)}
              >
                Book Another Table
              </Button>
            </div>
          </div>
        ) : (
          <div className="reservation-layout-grid">
            {/* Left side: Form */}
            <div className="reservation-form-card card-glass">
              <span className="section-badge">Reserve Your Table</span>
              <h2>Book an Artisanal Experience</h2>
              <p className="res-form-desc">
                Guarantee your favorite seating for intimate conversations, business coffees, or relaxed reading.
              </p>

              {serverError && (
                <div className="auth-alert alert-error">
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="reservation-form">
                <div className="res-two-col">
                  <Input
                    id="name"
                    label="Full Name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                  />

                  <Input
                    id="phone"
                    type="tel"
                    label="Phone Number"
                    placeholder="10-digit phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    required
                  />
                </div>

                <div className="res-two-col">
                  <Input
                    id="date"
                    type="date"
                    label="Reservation Date"
                    min={todayStr}
                    value={formData.date}
                    onChange={handleChange}
                    error={errors.date}
                    required
                  />

                  <div className="input-group-container">
                    <label htmlFor="guests" className="input-label">
                      Number of Guests <span className="input-required">*</span>
                    </label>
                    <select
                      id="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="input-field select-field"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Guest (Solo)" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="input-group-container">
                  <label htmlFor="timeSlot" className="input-label">
                    Select Time Slot <span className="input-required">*</span>
                  </label>
                  <select
                    id="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="input-field select-field"
                  >
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group-container">
                  <label htmlFor="seatingPreference" className="input-label">
                    Seating Preference
                  </label>
                  <select
                    id="seatingPreference"
                    value={formData.seatingPreference}
                    onChange={handleChange}
                    className="input-field select-field"
                  >
                    {seatingOptions.map(opt => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group-container">
                  <label htmlFor="specialRequest" className="input-label">
                    Special Occasion or Custom Requests
                  </label>
                  <textarea
                    id="specialRequest"
                    rows="3"
                    placeholder="E.g. anniversary celebration, high chair needed, dietary restrictions..."
                    value={formData.specialRequest}
                    onChange={handleChange}
                    className="input-field"
                    style={{ resize: "vertical" }}
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="res-submit-btn"
                >
                  Confirm Table Reservation
                </Button>
              </form>
            </div>

            {/* Right side: Visual Cafe ambiance */}
            <div className="reservation-ambiance-card">
              <div className="ambiance-image-box">
                <img
                  src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80"
                  alt="Cozy Velvet Brew Cafe seating area"
                  className="ambiance-image"
                />
              </div>

              <div className="ambiance-perks card-glass">
                <h3>The Velvet Experience</h3>
                <ul className="perks-list">
                  <li>
                    <span className="perk-bullet">✓</span>
                    <span>Complimentary tasting shot of our single-origin bean of the week.</span>
                  </li>
                  <li>
                    <span className="perk-bullet">✓</span>
                    <span>Reserved spot held for up to 20 minutes past your scheduled time.</span>
                  </li>
                  <li>
                    <span className="perk-bullet">✓</span>
                    <span>Personalized table greeting for birthdays and anniversary reservations.</span>
                  </li>
                  <li>
                    <span className="perk-bullet">✓</span>
                    <span>Dedicated power outlets and ergonomic oak chairs at every booth.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationPage;
