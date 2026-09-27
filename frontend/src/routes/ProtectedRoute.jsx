import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wraps any route that requires the user to be logged in.
// If there's no user in context, redirect to /login.
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
