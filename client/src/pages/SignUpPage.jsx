import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import "./AuthPages.css";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error on change
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }
    if (serverError) setServerError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (digitsOnly.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirming your password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setServerError("");

    try {
      const res = await signup({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/\D/g, ""),
        password: formData.password
      });

      if (res.success) {
        // Send user to Login page with success message
        navigate("/login", {
          state: {
            successMessage: "Account created successfully! Please log in to continue.",
            prefillEmail: formData.email.trim()
          }
        });
      } else {
        setServerError(res.message || "Could not register account. Please try again.");
      }
    } catch (err) {
      setServerError(err.message || "Registration failed. Please check your network and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-root animate-fade-in">
      <div className="auth-card-wrapper card-glass">
        <div className="auth-header">
          <div className="auth-badge-icon">☕</div>
          <h2>Join Velvet Brew</h2>
          <p>Create an account to explore our artisanal menu, order online, and reserve cozy tables.</p>
        </div>

        {serverError && (
          <div className="auth-alert alert-error">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="auth-form">
          <Input
            id="name"
            label="Full Name"
            placeholder="e.g. Arthur Pendelton"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            }
          />

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
            id="phone"
            type="tel"
            label="Phone Number"
            placeholder="10-digit mobile number"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
            helperText="10 digits without country code"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            }
          />

          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="At least 8 chars with a number"
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

          <Input
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            }
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="auth-submit-btn"
          >
            Create My Account
          </Button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
