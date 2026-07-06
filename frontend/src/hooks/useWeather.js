import { useEffect, useState } from "react";

// Metro Manila coords — swap these if you later geolocate the user
const DEFAULT_LAT = 14.5995;
const DEFAULT_LON = 120.9842;

// Open-Meteo weather codes → label/tone
// https://open-meteo.com/en/docs (WMO weather codes)
function mapWeatherCode(code) {
  if (code === 0) return { label: "Clear Sky", tone: "good" };
  if ([1, 2, 3].includes(code)) return { label: "Partly Cloudy", tone: "good" };
  if ([45, 48].includes(code)) return { label: "Foggy", tone: "warn" };
  if ([51, 53, 55, 56, 57].includes(code))
    return { label: "Drizzle", tone: "warn" };
  if ([61, 63, 66].includes(code)) return { label: "Light Rain", tone: "warn" };
  if ([65, 67].includes(code)) return { label: "Heavy Rain", tone: "bad" };
  if ([80, 81].includes(code)) return { label: "Rain Showers", tone: "warn" };
  if (code === 82) return { label: "Violent Showers", tone: "bad" };
  if ([95, 96, 99].includes(code))
    return { label: "Thunderstorm", tone: "bad" };
  return { label: "Unknown", tone: "warn" };
}

/**
 * Live weather for a given lat/lon (defaults to Metro Manila).
 * Refetches every `refreshMs` (default 10 min — weather doesn't need
 * live-vehicle-speed polling).
 *
 * Returns { temperatureC, label, tone, loading, error }
 */
export function useWeather({
  lat = DEFAULT_LAT,
  lon = DEFAULT_LON,
  refreshMs = 10 * 60 * 1000,
} = {}) {
  const [state, setState] = useState({
    temperatureC: null,
    label: null,
    tone: "warn",
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchWeather() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
        const data = await res.json();

        const code = data?.current?.weather_code;
        const temp = data?.current?.temperature_2m;
        const { label, tone } = mapWeatherCode(code);

        if (!cancelled) {
          setState({
            temperatureC: temp ?? null,
            label,
            tone,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setState((prev) => ({ ...prev, loading: false, error: err.message }));
        }
      }
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, refreshMs);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [lat, lon, refreshMs]);

  return state;
}
