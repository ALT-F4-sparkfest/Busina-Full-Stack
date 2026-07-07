// src/hooks/useCountUp.js
//
// Animates a number counting up from 0 to `target` once the element
// enters the viewport. Handles non-numeric suffixes/prefixes gracefully
// by extracting the leading number and re-attaching whatever surrounds it.
//
//   const { ref, display } = useCountUp("245");       -> "0" -> "245"
//   const { ref, display } = useCountUp("5 min");     -> "0 min" -> "5 min"
//   const { ref, display } = useCountUp("97%");       -> "0%" -> "97%"
//   const { ref, display } = useCountUp("18");         -> "0" -> "18"

import { useEffect, useRef, useState } from "react";

export default function useCountUp(rawValue, { duration = 1200 } = {}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(() => formatWithZero(rawValue));
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(String(rawValue));
      return;
    }

    const match = String(rawValue).match(/^(-?\d+(\.\d+)?)/);
    if (!match) {
      // Not a number we can animate (e.g. "LIVE") — just show as-is
      setDisplay(String(rawValue));
      return;
    }

    const target = parseFloat(match[1]);
    const prefix = "";
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
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawValue, duration]);

  return { ref, display };
}

function formatWithZero(rawValue) {
  const match = String(rawValue).match(/^(-?\d+(\.\d+)?)/);
  if (!match) return String(rawValue);
  const suffix = String(rawValue).slice(match[0].length);
  const decimals = match[2] ? match[2].length - 1 : 0;
  return `${(0).toFixed(decimals)}${suffix}`;
}
