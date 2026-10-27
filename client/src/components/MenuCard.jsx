import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./MenuCard.css";

const MenuCard = ({ item }) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(item, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="menu-card card-glass">
      <div className="menu-card-image-box">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="menu-card-image"
        />
        {item.isBestseller && (
          <span className="badge-bestseller">★ Bestseller</span>
        )}
        <span className={`badge-dietary ${item.isVeg ? "is-veg" : "is-nonveg"}`}>
          <span className="dietary-dot"></span>
          {item.isVeg ? "Veg" : "Non-Veg"}
        </span>
      </div>

      <div className="menu-card-body">
        <div className="menu-card-header">
          <span className="menu-card-category">{item.category}</span>
          <div className="menu-card-rating">
            <span className="star-icon">★</span>
            <span className="rating-score">{item.rating}</span>
            <span className="reviews-count">({item.reviewsCount})</span>
          </div>
        </div>

        <h3 className="menu-card-title">{item.name}</h3>
        <p className="menu-card-desc">{item.description}</p>

        <div className="menu-card-footer">
          <div className="menu-card-price">
            <span className="currency">$</span>
            <span className="amount">{item.price.toFixed(2)}</span>
          </div>

          <div className="menu-card-actions">
            <div className="qty-controls">
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQty(prev => Math.max(1, prev - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="qty-num">{qty}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQty(prev => prev + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className={`btn-add-cart ${added ? "is-added" : ""}`}
              onClick={handleAdd}
            >
              {added ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Added!
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
