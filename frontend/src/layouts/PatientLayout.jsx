import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItemClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-primary-600 text-white"
      : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
  }`;

function PatientLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 flex-shrink-0 flex-col bg-neutral-900 px-4 py-6">
        <div className="mb-8 px-2 text-lg font-bold text-white">BrainScan AI</div>
        <nav className="flex flex-1 flex-col gap-1">
          <NavLink to="/patient/dashboard" className={navItemClass}>Dashboard</NavLink>
          <NavLink to="/patient/upload" className={navItemClass}>Upload MRI</NavLink>
          <NavLink to="/patient/history" className={navItemClass}>Scan History</NavLink>
          <NavLink to="/patient/reports" className={navItemClass}>Reports</NavLink>
          <NavLink to="/patient/profile" className={navItemClass}>Profile</NavLink>
        </nav>
        <div className="border-t border-neutral-700 pt-4">
          <p className="mb-2 truncate px-2 text-sm text-neutral-300">{user?.name}</p>
          <button
            onClick={handleLogout}
            className="w-full rounded-lg bg-danger-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-danger-700">
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 bg-neutral-50 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default PatientLayout;
