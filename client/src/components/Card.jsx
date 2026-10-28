import "./Card.css";

/**
 * Nocturne Atelier Card Component
 * variant: "default" | "interactive" | "flat" | "paper"
 */
const Card = ({
  children,
  variant = "default",
  className = "",
  onClick,
  ...props
}) => {
  return (
    <div
      className={`na-card na-card--${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
