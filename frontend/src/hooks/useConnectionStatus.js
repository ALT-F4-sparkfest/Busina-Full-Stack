// src/hooks/useConnectionStatus.js
import { useEffect, useState, useRef, useCallback } from "react";

const STALE_AFTER_MS = 15000;

export function useConnectionStatus(socketConnected) {
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );
  const [timedOut, setTimedOut] = useState(false);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    lastUpdateRef.current = Date.now();
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const age = Date.now() - lastUpdateRef.current;
      setTimedOut(age > STALE_AFTER_MS);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const markUpdated = useCallback(() => {
    lastUpdateRef.current = Date.now();
    setTimedOut(false);
  }, []);

  const isStale = !socketConnected || timedOut;
  const status = !isOnline ? "offline" : isStale ? "stale" : "live";

  return { status, isOnline, isStale, markUpdated };
}
