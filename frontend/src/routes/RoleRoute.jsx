import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wraps a route that should only be accessible to specific roles.
function RoleRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RoleRoute;
