import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Maps a path to a readable title. Checked as exact matches first;
// dynamic routes (with an :id) are matched by prefix further down.
const exactTitles = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
  "/login": "Login",
  "/register": "Register",
  "/privacy-policy": "Privacy Policy",
  "/terms": "Terms of Use",
  "/brain-tumors": "Understanding Brain Tumors",
  "/patient/dashboard": "Dashboard",
  "/patient/upload": "Upload MRI",
  "/patient/history": "Scan History",
  "/patient/reports": "Reports",
  "/patient/profile": "Profile",
  "/doctor/dashboard": "Doctor Dashboard",
  "/doctor/patients": "Patients",
  "/admin/dashboard": "Admin Dashboard",
  "/admin/users": "Users",
  "/admin/doctors": "Doctors",
  "/admin/patients": "Patients",
};

const prefixTitles = [
  { prefix: "/patient/analysis/", title: "Analysis" },
  { prefix: "/doctor/patients/", title: "Patient Detail" },
  { prefix: "/doctor/scans/", title: "Scan Review" },
];

// Renders nothing — just a side-effect component that keeps the browser
// tab title in sync with whichever route is currently active. Placed once
// inside the Router so every page gets a correct title with no per-page code.
function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    const exact = exactTitles[location.pathname];
    const prefixMatch = prefixTitles.find((p) => location.pathname.startsWith(p.prefix));
    const pageName = exact || prefixMatch?.title || "Page Not Found";

    document.title = location.pathname === "/" ? "BrainScan AI" : `${pageName} — BrainScan AI`;
  }, [location.pathname]);

  return null;
}

export default PageTitle;
