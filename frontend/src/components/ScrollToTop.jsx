import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Renders nothing — just a side-effect component that scrolls the window
// back to the top every time the route changes. Without this, React Router
// keeps whatever scroll position you were at on the previous page, which
// feels broken when navigating via Navbar/Footer links.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
