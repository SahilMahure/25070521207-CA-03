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
    password: ""
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotModal, setForgotModal] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: "" }));
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
        rememberMe
      });

      if (res.success) {
        // Send user to original requested page or /menu
        navigate(destination, { replace: true });
      } else {
        setErrorMessage(res.message || "Invalid email or password.");
      }
    } catch (err) {
      setErrorMessage(err.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-root animate-fade-in">
      <div className="auth-card-wrapper card-glass">
        <div className="auth-header">
          <div className="auth-badge-icon">☕</div>
          <h2>Welcome Back</h2>
          <p>Sign in to customize your brew, manage orders, and reserve your favorite spot.</p>
        </div>

        {successNotice && (
          <div className="auth-alert alert-success">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            {successNotice}
          </div>
        )}

        {errorMessage && (
          <div className="auth-alert alert-error">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="auth-form">
          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            }
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
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            }
          />

          <div className="auth-remember-row">
            <label className="auth-remember-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>

            <button
              type="button"
              className="auth-forgot-link"
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
            className="auth-submit-btn"
          >
            Sign In to Café
          </Button>
        </form>

        <div className="auth-footer">
          Don't have an account yet?{" "}
          <Link to="/signup" className="auth-link">
            Create an account
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal Dialog */}
      {forgotModal && (
        <div className="modal-backdrop" onClick={() => setForgotModal(false)}>
          <div className="modal-card card-glass" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reset Password</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setForgotModal(false)}
              >
                &times;
              </button>
            </div>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.92rem", margin: "14px 0 20px" }}>
              Please enter your registered email address. We will send you an OTP and recovery link to reset your account password.
            </p>
            <Input
              id="resetEmail"
              type="email"
              label="Registered Email"
              placeholder="name@example.com"
              defaultValue={formData.email}
            />
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "10px" }}>
              <Button variant="outline" size="sm" onClick={() => setForgotModal(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  alert("Password reset instructions have been dispatched to your email address!");
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
