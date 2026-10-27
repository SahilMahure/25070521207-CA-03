import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import Button from "../components/Button";
import "./CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cartItems,
    orderType,
    setOrderType,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    tax,
    total
  } = useCart();

  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const orderPayload = {
        items: cartItems.map(i => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          isVeg: i.isVeg
        })),
        orderType,
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
        customerNotes: notes
      };

      const placedOrder = await api.createOrder(orderPayload);
      clearCart();
      setOrderConfirmation(placedOrder);
    } catch (err) {
      setErrorMsg(err.message || "Failed to place your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderConfirmation) {
    return (
      <div className="cart-page-root animate-fade-in">
        <div className="container confirmation-container">
          <div className="confirmation-card card-glass">
            <div className="confirmation-badge">✓</div>
            <span className="section-badge">Order Placed</span>
            <h2>Thank You, {user?.name?.split(" ")[0] || "Friend"}!</h2>
            <p className="confirm-subtitle">
              Your order has been sent to our baristas and pastry chefs.
            </p>

            <div className="order-details-box">
              <div className="order-id-banner">
                <span>Order Reference:</span>
                <strong>{orderConfirmation.orderId}</strong>
              </div>

              <div className="confirm-row">
                <span>Dining Preference:</span>
                <strong>{orderConfirmation.orderType}</strong>
              </div>
              <div className="confirm-row">
                <span>Estimated Prep Time:</span>
                <strong>{orderConfirmation.estimatedMinutes || 20} Minutes</strong>
              </div>
              <div className="confirm-row">
                <span>Total Amount:</span>
                <strong>${Number(orderConfirmation.total).toFixed(2)}</strong>
              </div>
              <div className="confirm-row">
                <span>Status:</span>
                <span className="status-badge status-confirmed">Confirmed</span>
              </div>
            </div>

            <div className="confirmation-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/profile")}
              >
                View in My Orders
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/menu")}
              >
                Browse Menu Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-root animate-fade-in">
        <div className="container">
          <div className="empty-cart-card card-glass">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your Cart is Feeling Lonely</h2>
            <p>You haven't added any roasted brews or buttery delicacies yet.</p>
            <Link to="/menu">
              <Button variant="primary" size="lg">
                Browse Menu Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-root animate-fade-in">
      <div className="container">
        <div className="cart-header-title">
          <span className="section-badge">Review & Checkout</span>
          <h1>Your Velvet Brew Tray</h1>
          <p>Freshly prepared, packaged with care, and served with a smile.</p>
        </div>

        {errorMsg && (
          <div className="cart-error-alert">
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="cart-checkout-grid">
          {/* Items List */}
          <div className="cart-items-section">
            <div className="cart-items-card card-glass">
              <div className="card-header-row">
                <h3>Items in Tray ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</h3>
                <button
                  type="button"
                  className="btn-clear-tray"
                  onClick={clearCart}
                >
                  Clear All
                </button>
              </div>

              <div className="cart-items-list">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item-row">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    
                    <div className="cart-item-info">
                      <div className="item-diet-and-name">
                        <span className={`diet-dot ${item.isVeg ? "veg-dot" : "nonveg-dot"}`}></span>
                        <h4 className="cart-item-name">{item.name}</h4>
                      </div>
                      <span className="cart-item-unit-price">${item.price.toFixed(2)} each</span>
                    </div>

                    <div className="cart-item-qty">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="qty-num">{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="cart-item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    <button
                      type="button"
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove from tray"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            <div className="cart-notes-card card-glass">
              <h4>Special Instructions</h4>
              <p>Extra oat milk, sugar cubes on the side, or allergy precautions?</p>
              <textarea
                rows="3"
                placeholder="Write any customization or notes for the barista..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="cart-notes-input"
              ></textarea>
            </div>
          </div>

          {/* Order Summary & Checkout Card */}
          <div className="cart-summary-section">
            <div className="cart-summary-card card-glass">
              <h3>Order Summary</h3>

              {/* Dine-in vs Takeaway Selection */}
              <div className="order-type-selector">
                <label className="order-type-label">Service Type:</label>
                <div className="order-type-tabs">
                  <button
                    type="button"
                    className={`order-type-btn ${orderType === "Dine-in" ? "active" : ""}`}
                    onClick={() => setOrderType("Dine-in")}
                  >
                    🍽️ Dine-in
                  </button>
                  <button
                    type="button"
                    className={`order-type-btn ${orderType === "Takeaway" ? "active" : ""}`}
                    onClick={() => setOrderType("Takeaway")}
                  >
                    🛍️ Takeaway
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="summary-breakdown">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>State Cafe Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Service & Packaging</span>
                  <span className="free-badge">Complimentary</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row summary-total">
                  <span>Total Amount</span>
                  <span className="total-value">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Customer summary */}
              <div className="checkout-customer-box">
                <div>
                  <span className="cust-label">Ordering as:</span>
                  <strong>{user?.name}</strong>
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                  {user?.email} • {user?.phone}
                </div>
              </div>

              <Button
                type="button"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                onClick={handlePlaceOrder}
                className="btn-place-order"
              >
                Place Order (${total.toFixed(2)})
              </Button>

              <div className="checkout-guarantee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                Freshly prepped on order & 100% satisfaction guaranteed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
