/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary: clinical blue — used for CTAs, links, active states
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb", // main brand blue
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        // Neutral: cool slate grays — for text, borders, backgrounds
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        // Status colors — used for scan status badges, alerts
        success: { 50: "#f0fdf4", 600: "#16a34a", 700: "#15803d" },
        warning: { 50: "#fffbeb", 600: "#d97706", 700: "#b45309" },
        danger: { 50: "#fef2f2", 600: "#dc2626", 700: "#b91c1c" },
        info: { 50: "#f0f9ff", 600: "#0284c7", 700: "#0369a1" },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.06)",
        "card-hover": "0 4px 12px -2px rgba(15, 23, 42, 0.10)",
      },
      borderRadius: {
        card: "0.75rem",
      },
    },
  },
  plugins: [],
};
