import { useEffect, useRef, useState } from "react";

// Wraps any content and fades + slides it up into view the first time it
// scrolls into the viewport. Uses IntersectionObserver (built into every
// modern browser) — no animation library needed.
//
// Usage: <Reveal><section>...</section></Reveal>
// Optional: <Reveal delay={150}>...</Reveal> to stagger multiple items.
function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node); // only animate once, not every scroll pass
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
