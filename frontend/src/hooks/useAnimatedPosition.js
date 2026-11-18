// src/hooks/useAnimatedPosition.js
import { useEffect, useRef, useState } from "react";

export default function useAnimatedPosition(target) {
  const [position, setPosition] = useState(target);
  const frameRef = useRef(null);
  const currentPosRef = useRef(target);
  const prevTarget = useRef(target);

  useEffect(() => {
    if (!target) return;

    if (
      prevTarget.current &&
      prevTarget.current.lat === target.lat &&
      prevTarget.current.lng === target.lng
    ) {
      return;
    }

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    const startTime = performance.now();
    const duration = 400;
    const from = currentPosRef.current || target;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const nextPos =
        progress < 1
          ? {
              lat: from.lat + (target.lat - from.lat) * eased,
              lng: from.lng + (target.lng - from.lng) * eased,
            }
          : target;

      currentPosRef.current = nextPos;
      setPosition(nextPos);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    prevTarget.current = target;

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [target]);

  if (!target) return null;
  return position || target;
}
