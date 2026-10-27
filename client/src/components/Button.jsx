import "./Button.css";

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
      className={`btn btn-${variant} btn-${size} ${isLoading ? "btn-loading" : ""} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="btn-spinner-wrapper">
          <span className="btn-spinner"></span>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
