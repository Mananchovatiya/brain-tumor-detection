import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/brain-tumors", label: "Brain Tumors" },
  { to: "/contact", label: "Contact" },
  { to: "/login", label: "Login" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-20 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-bold text-neutral-900" onClick={() => setIsOpen(false)}>
          BrainScan <span className="text-primary-600">AI</span>
        </Link>

        {/* Desktop links — hidden below md breakpoint */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-neutral-600 hover:text-primary-600"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/register" className="btn-primary !px-4 !py-2">
            Register
          </Link>
        </div>

        {/* Hamburger button — visible only below md breakpoint */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown — absolutely positioned so it floats OVER the page
          content instead of pushing it down. Always rendered (not
          conditionally), with max-height + opacity animated via Tailwind's
          transition utilities for a smooth open/close instead of an
          instant show/hide. overflow-hidden clips it to 0 height when closed. */}
      <div
        className={`absolute left-0 right-0 top-full overflow-hidden border-b border-neutral-200 bg-white shadow-lg transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4 px-6 py-6 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-neutral-600 hover:text-primary-600"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="btn-primary mt-1 w-full max-w-xs text-center"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
