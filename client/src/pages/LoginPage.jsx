import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import "./AuthPages.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const successNotice = location.state?.successMessage || "";
  const prefillEmail = location.state?.prefillEmail || "";
  const destination = location.state?.from?.pathname || "/menu";

  const [formData, setFormData] = useState({
    email: prefillEmail,
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotModal, setForgotModal] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
    if (errorMessage) setErrorMessage("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await login({
        email: formData.email.trim(),
        password: formData.password,
        rememberMe,
      });

      if (res.success) {
        navigate(destination, { replace: true });
      } else {
        setErrorMessage(res.message || "Invalid email or password.");
      }
    } catch (err) {
      setErrorMessage(
        err.message || "Invalid credentials. Please verify your email and password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="na-auth-page animate-fade-in">
      {/* Ambient warm glow */}
      <div className="na-auth-glow" aria-hidden="true" />

      <div className="na-auth-card">
        {/* Header */}
        <div className="na-auth-header">
          <div className="na-auth-icon" aria-hidden="true">
            <span className="material-symbols-outlined">local_cafe</span>
          </div>
          <h1 className="t-headline-md na-auth-title">Welcome back</h1>
          <p className="t-body-md na-auth-subtitle">
            Sign in to access your folio, order ahead, and reserve your table.
          </p>
        </div>

        {successNotice && (
          <div className="na-auth-alert na-auth-alert--success" role="status">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {successNotice}
          </div>
        )}

        {errorMessage && (
          <div className="na-auth-alert na-auth-alert--error" role="alert">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="na-auth-form">
          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="collector@nocturne.atelier"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            autoComplete="email"
          />

          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            autoComplete="current-password"
          />

          <div className="na-auth-remember-row">
            <label className="na-auth-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="na-checkbox"
              />
              <span className="t-label-sm">Remember me</span>
            </label>

            <button
              type="button"
              className="na-auth-forgot-btn t-label-sm"
              onClick={() => setForgotModal(true)}
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="na-auth-submit"
          >
            Sign In to Atelier
          </Button>
        </form>

        <p className="na-auth-footer-text t-body-sm">
          Don't have a folio yet?{" "}
          <Link to="/signup" className="na-auth-link">
            Create an account
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal Dialog */}
      {forgotModal && (
        <div className="na-modal-backdrop" onClick={() => setForgotModal(false)}>
          <div
            className="na-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
          >
            <div className="na-modal-header">
              <h3 id="reset-title" className="t-headline-sm">
                Reset Password
              </h3>
              <button
                type="button"
                className="na-modal-close"
                onClick={() => setForgotModal(false)}
                aria-label="Close dialog"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="t-body-md na-modal-description">
              Please enter your registered email address. We will dispatch an OTP and recovery link to restore your account access.
            </p>
            <Input
              id="resetEmail"
              type="email"
              label="Registered Email"
              placeholder="collector@nocturne.atelier"
              defaultValue={formData.email}
            />
            <div className="na-modal-actions">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setForgotModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  alert(
                    "Password reset instructions have been dispatched to your email address!"
                  );
                  setForgotModal(false);
                }}
              >
                Send Instructions
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
