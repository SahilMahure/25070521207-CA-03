import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import Input from "../components/Input";
import Button from "../components/Button";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("orders"); // 'orders' | 'reservations' | 'details'
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Edit details state
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");
  const [updateErr, setUpdateErr] = useState("");

  useEffect(() => {
    let isMounted = true;
    const loadUserData = async () => {
      setLoadingData(true);
      try {
        const [userOrders, userReservations] = await Promise.all([
          api.getOrders(),
          api.getReservations()
        ]);
        if (isMounted) {
          setOrders(userOrders);
          setReservations(userReservations);
        }
      } catch (err) {
        console.error("Failed to fetch user data", err);
      } finally {
        if (isMounted) setLoadingData(false);
      }
    };

    loadUserData();
    return () => { isMounted = false; };
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setUpdateErr("Name cannot be empty.");
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setUpdateErr("Phone number must be 10 digits.");
      return;
    }

    setIsUpdating(true);
    setUpdateMsg("");
    setUpdateErr("");

    try {
      await updateProfile({ name: name.trim(), phone: digits });
      setUpdateMsg("Your profile details have been saved successfully!");
      setTimeout(() => setUpdateMsg(""), 4000);
    } catch (err) {
      setUpdateErr(err.message || "Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profile-page-root animate-fade-in">
      <div className="container">
        {/* Profile Header Card */}
        <div className="profile-header-card card-glass">
          <div className="profile-header-main">
            <div className="profile-avatar-large">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div className="profile-user-info">
              <h2>{user?.name || "Coffee Lover"}</h2>
              <p className="profile-email-badge">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                {user?.email}
              </p>
              <p className="profile-phone-badge">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                {user?.phone || "No phone added"}
              </p>
            </div>
          </div>

          <button type="button" onClick={handleLogout} className="btn-profile-logout">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="profile-tabs-bar">
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            ☕ Order History ({orders.length})
          </button>
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === "reservations" ? "active" : ""}`}
            onClick={() => setActiveTab("reservations")}
          >
            📅 Table Bookings ({reservations.length})
          </button>
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            ⚙️ Edit Details
          </button>
        </div>

        {/* Content View */}
        <div className="profile-tab-content">
          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="orders-tab-view">
              {loadingData ? (
                <div className="profile-loading">
                  <div className="btn-spinner" style={{ width: 36, height: 36, borderColor: "var(--color-border)", borderTopColor: "var(--color-accent)" }}></div>
                  <p>Loading your past orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="profile-empty-card card-glass">
                  <div className="empty-ico">🛍️</div>
                  <h3>No Orders Yet</h3>
                  <p>You haven't placed any orders yet. Discover our barista specialty roasts!</p>
                  <Link to="/menu">
                    <Button variant="primary" size="md">Explore Menu</Button>
                  </Link>
                </div>
              ) : (
                <div className="orders-cards-list">
                  {orders.map(order => (
                    <div key={order.orderId || order._id} className="order-history-card card-glass">
                      <div className="order-card-header">
                        <div>
                          <span className="order-num">{order.orderId}</span>
                          <span className="order-date">
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </span>
                        </div>
                        <div className="order-header-right">
                          <span className="order-type-tag">{order.orderType}</span>
                          <span className="status-badge status-confirmed">{order.status || "Confirmed"}</span>
                        </div>
                      </div>

                      <div className="order-card-items">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="order-item-snippet">
                            <span className="item-snippet-name">{it.name} × {it.quantity}</span>
                            <span className="item-snippet-price">${(it.price * it.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="order-card-footer">
                        <span>Total Paid (Tax Incl.):</span>
                        <strong className="order-footer-price">${Number(order.total).toFixed(2)}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* RESERVATIONS TAB */}
          {activeTab === "reservations" && (
            <div className="reservations-tab-view">
              {loadingData ? (
                <div className="profile-loading">
                  <div className="btn-spinner" style={{ width: 36, height: 36, borderColor: "var(--color-border)", borderTopColor: "var(--color-accent)" }}></div>
                  <p>Retrieving your table bookings...</p>
                </div>
              ) : reservations.length === 0 ? (
                <div className="profile-empty-card card-glass">
                  <div className="empty-ico">🕯️</div>
                  <h3>No Upcoming Table Reservations</h3>
                  <p>Reserve a cozy window seat or terrace table for your next coffee date.</p>
                  <Link to="/reservation">
                    <Button variant="primary" size="md">Book a Table</Button>
                  </Link>
                </div>
              ) : (
                <div className="reservations-cards-list">
                  {reservations.map(res => (
                    <div key={res.bookingId || res._id} className="res-history-card card-glass">
                      <div className="res-card-header">
                        <div>
                          <span className="res-code">{res.bookingId}</span>
                          <span className="res-date-tag">Date: {res.date}</span>
                        </div>
                        <span className="status-badge status-confirmed">{res.status || "Confirmed"}</span>
                      </div>

                      <div className="res-card-body-info">
                        <div className="res-prop">
                          <span className="prop-label">Time Slot:</span>
                          <strong>{res.timeSlot}</strong>
                        </div>
                        <div className="res-prop">
                          <span className="prop-label">Party Size:</span>
                          <strong>{res.guests} Guests</strong>
                        </div>
                        <div className="res-prop">
                          <span className="prop-label">Seating:</span>
                          <strong className="res-highlight">{res.tableAssigned || "Table 5"}</strong>
                        </div>
                      </div>

                      {res.specialRequest && (
                        <div className="res-request-note">
                          <strong>Preferences:</strong> {res.specialRequest}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* EDIT DETAILS TAB */}
          {activeTab === "details" && (
            <div className="details-tab-view">
              <div className="edit-profile-card card-glass">
                <h3>Personal Information</h3>
                <p className="edit-sub">Keep your contact information updated for smooth orders and reservations.</p>

                {updateMsg && (
                  <div className="auth-alert alert-success">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {updateMsg}
                  </div>
                )}

                {updateErr && (
                  <div className="auth-alert alert-error">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {updateErr}
                  </div>
                )}

                <form onSubmit={handleUpdateProfile} className="edit-profile-form">
                  <Input
                    id="editName"
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <Input
                    id="editEmail"
                    type="email"
                    label="Email Address"
                    value={user?.email || ""}
                    disabled
                    helperText="Email address cannot be changed."
                  />

                  <Input
                    id="editPhone"
                    type="tel"
                    label="10-Digit Mobile Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isUpdating}
                  >
                    Save Changes
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
