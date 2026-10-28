import "./Button.css";

/**
 * Nocturne Atelier Button
 * variant: "primary" | "secondary" | "ghost" | "text"
 * size:    "sm" | "md" | "lg"
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`na-btn na-btn--${variant} na-btn--${size} ${isLoading ? "na-btn--loading" : ""} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="na-btn__spinner-wrap">
          <span className="na-btn__spinner" aria-hidden="true" />
          <span>Loading…</span>
        </span>
      ) : children}
    </button>
  );
};

export default Button;
