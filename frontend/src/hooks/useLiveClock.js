import { useEffect, useState } from "react";

/**
 * Live date/time, always displayed in Asia/Manila timezone regardless
 * of the device's local timezone. Ticks every second.
 *
 * Returns { time: "2:41 PM", date: "Mon, Jul 6, 2026" }
 */
export function useLiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const time = new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  const date = new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(now);

  return { time, date };
}
