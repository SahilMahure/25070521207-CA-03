import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="btn-spinner" style={{ width: 40, height: 40, borderColor: "var(--color-border)", borderTopColor: "var(--color-accent)" }}></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Send unauthenticated user to /login and preserve destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
