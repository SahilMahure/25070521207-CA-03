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
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
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
    const digits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (digits.length !== 10) {
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
    <div className="na-auth-page animate-fade-in">
      {/* Ambient glow */}
      <div className="na-auth-glow" aria-hidden="true" />

      <div className="na-auth-card">
        {/* Header */}
        <div className="na-auth-header">
          <div className="na-auth-icon" aria-hidden="true">
            <span className="material-symbols-outlined">local_cafe</span>
          </div>
          <h1 className="t-headline-md na-auth-title">Create your folio</h1>
          <p className="t-body-md na-auth-subtitle">
            Join the Nocturne circle. Unlock the menu, reserve tables, and track your orders.
          </p>
        </div>

        {serverError && (
          <div className="na-auth-alert na-auth-alert--error" role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {serverError}
          </div>
        )}

        <form className="na-auth-form" onSubmit={handleSubmit} noValidate>
          <Input
            id="name"
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Devina Rao"
            error={errors.name}
            required
            autoComplete="name"
          />
          <Input
            id="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="collector@nocturne.atelier"
            error={errors.email}
            required
            autoComplete="email"
          />
          <Input
            id="phone"
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            error={errors.phone}
            required
            autoComplete="tel"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min. 8 characters with a number"
            error={errors.password}
            required
            autoComplete="new-password"
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat your password"
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="na-auth-submit"
          >
            Create Account
          </Button>
        </form>

        <p className="na-auth-footer-text t-body-sm">
          Already have a folio?{" "}
          <Link to="/login" className="na-auth-link">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
