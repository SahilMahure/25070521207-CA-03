import { useState } from "react";
import "./Input.css";

/**
 * Nocturne Atelier Input
 * Supports: label, error, helperText, icon (left), password toggle
 */
const Input = ({
  label,
  id,
  type = "text",
  error,
  value,
  onChange,
  placeholder,
  required = false,
  helperText,
  icon,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`na-input-group ${error ? "na-input-group--error" : ""} ${className}`}>
      {label && (
        <label htmlFor={id} className="na-input-label">
          {label}{required && <span className="na-input-required" aria-hidden="true"> *</span>}
        </label>
      )}

      <div className="na-input-wrap">
        {icon && <span className="na-input-icon" aria-hidden="true">{icon}</span>}
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`na-input-field ${icon ? "na-input-field--icon" : ""} ${isPassword ? "na-input-field--pwd" : ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="na-input-pwd-toggle"
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error ? (
        <span id={`${id}-error`} className="na-input-error" role="alert">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </span>
      ) : helperText ? (
        <span className="na-input-helper">{helperText}</span>
      ) : null}
    </div>
  );
};

export default Input;
