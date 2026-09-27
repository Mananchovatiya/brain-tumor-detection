import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Wrap the whole app with this so any component can read/update
// the logged-in user via useAuth().
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook so components just do: const { user, login, logout } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
