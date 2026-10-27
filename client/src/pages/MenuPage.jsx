import { useState, useEffect } from "react";
import { CATEGORIES } from "../data/mockMenu";
import { api } from "../services/api";
import MenuCard from "../components/MenuCard";
import "./MenuPage.css";

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [dietaryFilter, setDietaryFilter] = useState("all"); // 'all' | 'veg' | 'non-veg'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchItems = async () => {
      setLoading(true);
      try {
        const data = await api.getMenu(selectedCategory, searchTerm);
        if (isMounted) setItems(data);
      } catch (e) {
        console.error("Failed to load menu", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchItems();
    return () => { isMounted = false; };
  }, [selectedCategory, searchTerm]);

  // Apply dietary filter locally
  const filteredItems = items.filter(item => {
    if (dietaryFilter === "veg") return item.isVeg === true;
    if (dietaryFilter === "non-veg") return item.isVeg === false;
    return true;
  });

  return (
    <div className="menu-page animate-fade-in">
      {/* Menu Header Banner */}
      <section className="menu-hero-banner">
        <div className="container">
          <span className="section-badge">Hand-Crafted Selections</span>
          <h1>Velvet Brew Artisanal Menu</h1>
          <p>
            From velvety micro-lot roasts to freshly laminated French butter pastries.
            Select your favorites and add them to your cart.
          </p>

          {/* Search & Dietary Controls */}
          <div className="menu-toolbar card-glass">
            <div className="menu-search-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search coffee, shake, breakfast, pastry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="menu-search-input"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchTerm("")}
                >
                  &times;
                </button>
              )}
            </div>

            <div className="dietary-toggle-group">
              <button
                type="button"
                className={`diet-btn ${dietaryFilter === "all" ? "active" : ""}`}
                onClick={() => setDietaryFilter("all")}
              >
                All
              </button>
              <button
                type="button"
                className={`diet-btn diet-veg ${dietaryFilter === "veg" ? "active" : ""}`}
                onClick={() => setDietaryFilter("veg")}
              >
                <span className="diet-dot veg-dot"></span>
                Veg Only
              </button>
              <button
                type="button"
                className={`diet-btn diet-nonveg ${dietaryFilter === "non-veg" ? "active" : ""}`}
                onClick={() => setDietaryFilter("non-veg")}
              >
                <span className="diet-dot nonveg-dot"></span>
                Non-Veg
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="category-tabs-container">
            {CATEGORIES.map(category => (
              <button
                key={category}
                type="button"
                className={`cat-tab-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "Coffee" && "☕ "}
                {category === "Tea" && "🍵 "}
                {category === "Shakes" && "🥤 "}
                {category === "Breakfast" && "🍳 "}
                {category === "Snacks" && "🥪 "}
                {category === "Desserts" && "🍰 "}
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Cards Grid */}
      <section className="section menu-items-section">
        <div className="container">
          <div className="results-meta">
            <span>
              Showing <strong>{filteredItems.length}</strong> items in{" "}
              <strong>{selectedCategory}</strong>
            </span>
            {dietaryFilter !== "all" && (
              <span className="diet-active-tag">
                Filtered: {dietaryFilter === "veg" ? "Vegetarian Only" : "Non-Vegetarian Only"}
              </span>
            )}
          </div>

          {loading ? (
            <div className="menu-loading-spinner">
              <div className="btn-spinner" style={{ width: 44, height: 44, borderColor: "var(--color-border)", borderTopColor: "var(--color-accent)" }}></div>
              <p>Brewing the freshest items...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="menu-empty-state card-glass">
              <div className="empty-icon">☕</div>
              <h3>No Delicacies Found</h3>
              <p>We couldn't find any items matching your search "{searchTerm}". Try another keyword or category.</p>
              <button
                type="button"
                className="btn-reset-filters"
                onClick={() => { setSelectedCategory("All"); setSearchTerm(""); setDietaryFilter("all"); }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="menu-grid">
              {filteredItems.map(item => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MenuPage;
