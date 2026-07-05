// src/components/ui/Reveal.jsx
//
// Wrap any section in <Reveal> to fade+slide it in the first time it enters
// the viewport. No animation library — just IntersectionObserver + CSS.
//
//   <Reveal><Stats /></Reveal>
//   <Reveal delay={150}><Features /></Reveal>
//
// Fires once (unobserves after first reveal) so scrolling back up/down
// doesn't repeatedly re-trigger it — that gets distracting fast.

import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = 0, threshold = 0.15 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion: show immediately, no observer needed
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
