import { useEffect } from "react";
import "./Modal.css";

/**
 * Nocturne Atelier Shared Modal Component
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = "480px",
  className = "",
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose?.();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="na-modal-overlay" onClick={onClose} role="presentation">
      <div
        className={`na-modal-container ${className}`}
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "na-modal-title" : undefined}
      >
        {title && (
          <div className="na-modal-head">
            <h3 id="na-modal-title" className="na-modal-title">
              {title}
            </h3>
            <button
              type="button"
              className="na-modal-close-icon"
              onClick={onClose}
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        )}

        <div className="na-modal-body">{children}</div>

        {footer && <div className="na-modal-foot">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
