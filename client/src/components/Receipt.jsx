import "./Receipt.css";

/**
 * Nocturne Atelier Thermal Receipt Component
 * Renders an editorial thermal slip with inverted paper tone,
 * monospaced typography, dashed dividers, items table, and sawtooth serrated bottom.
 */
const Receipt = ({
  orderId = "NOC-8821",
  timestamp = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
  tableNo,
  items = [],
  subtotal = 0,
  tax = 0,
  discount = 0,
  total = 0,
  customerName,
  notes,
  className = "",
}) => {
  return (
    <div className={`na-receipt-card ${className}`}>
      {/* Header */}
      <div className="na-receipt-header">
        <div className="na-receipt-brand">NOCTURNE ATELIER</div>
        <div className="na-receipt-sub">EDITORIAL ESPRESSO BAR · ROASTERY</div>
        <div className="na-receipt-meta">
          <span>ORD #{orderId}</span>
          <span>{timestamp}</span>
        </div>
        {tableNo && <div className="na-receipt-table">TABLE / SEAT: {tableNo}</div>}
        {customerName && <div className="na-receipt-guest">PATRON: {customerName}</div>}
      </div>

      <div className="na-receipt-divider" />

      {/* Items list */}
      <div className="na-receipt-items">
        {items.map((item, idx) => (
          <div key={idx} className="na-receipt-item-row">
            <span className="na-receipt-qty">{item.quantity || 1}×</span>
            <span className="na-receipt-name">{item.name}</span>
            <span className="na-receipt-price">
              ${Number((item.price || 0) * (item.quantity || 1)).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="na-receipt-divider" />

      {/* Totals */}
      <div className="na-receipt-summary">
        <div className="na-receipt-calc-row">
          <span>SUBTOTAL</span>
          <span>${Number(subtotal).toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="na-receipt-calc-row na-receipt-discount">
            <span>SAVINGS</span>
            <span>-${Number(discount).toFixed(2)}</span>
          </div>
        )}
        <div className="na-receipt-calc-row">
          <span>VAT / TAX (8%)</span>
          <span>${Number(tax).toFixed(2)}</span>
        </div>
        <div className="na-receipt-total-row">
          <span>TOTAL DUE</span>
          <span>${Number(total).toFixed(2)}</span>
        </div>
      </div>

      {notes && (
        <div className="na-receipt-notes">
          <span>MEMO:</span> {notes}
        </div>
      )}

      {/* Mock Barcode */}
      <div className="na-receipt-barcode-wrap">
        <div className="na-receipt-barcode" aria-hidden="true">
          <div className="barcode-bars" />
        </div>
        <div className="na-receipt-barcode-num">*{orderId}*</div>
      </div>

      <div className="na-receipt-footer">
        THANK YOU FOR YOUR PATRONAGE<br />
        SLOANE SQ. &amp; NOCTURNE LANE · EST. 2024
      </div>

      {/* Sawtooth jagged tear effect at the bottom */}
      <div className="na-receipt-sawtooth" aria-hidden="true" />
    </div>
  );
};

export default Receipt;
