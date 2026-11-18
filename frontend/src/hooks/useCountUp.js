// src/hooks/useCountUp.js
import { useEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function formatInitial(rawValue) {
  if (prefersReducedMotion()) return String(rawValue);
  const match = String(rawValue).match(/^(-?\d+(\.\d+)?)/);
  if (!match) return String(rawValue);
  const suffix = String(rawValue).slice(match[0].length);
  const decimals = match[2] ? match[2].length - 1 : 0;
  return `${(0).toFixed(decimals)}${suffix}`;
}

export default function useCountUp(rawValue, { duration = 1200 } = {}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(() => formatInitial(rawValue));
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const match = String(rawValue).match(/^(-?\d+(\.\d+)?)/);
    if (!match) return;

    const target = parseFloat(match[1]);
    const suffix = String(rawValue).slice(match[0].length);
    const decimals = match[2] ? match[2].length - 1 : 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          observer.unobserve(el);

          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            setDisplay(`${current.toFixed(decimals)}${suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
            else setDisplay(String(rawValue));
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rawValue, duration]);

  return { ref, display };
}
