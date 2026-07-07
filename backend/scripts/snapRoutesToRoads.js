// backend/scripts/snapRoutesToRoads.js
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // reuse existing key if Roads API is enabled on it
const INPUT_PATH = path.join(__dirname, "../routes/routePaths.json"); // was: geofence.json
const OUTPUT_PATH = path.join(__dirname, "../routes/geofence.snapped.json");

const rawData = require(INPUT_PATH);

// Roads API takes max 100 points per request
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

async function snapChunk(points) {
  // points: array of [lng, lat] -> Roads API wants "lat,lng|lat,lng..."
  const path = points.map(([lng, lat]) => `${lat},${lng}`).join("|");
  const url = `https://roads.googleapis.com/v1/snapToRoads?path=${encodeURIComponent(path)}&interpolate=true&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.error) {
    throw new Error(`Roads API error: ${data.error.message}`);
  }

  if (!data.snappedPoints) return [];

  return data.snappedPoints.map((p) => [
    p.location.longitude,
    p.location.latitude,
  ]);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function snapRoute(routeName, coordinates) {
  console.log(`Snapping ${routeName} (${coordinates.length} points)...`);

  const chunks = chunk(coordinates, 100);
  let snapped = [];

  for (const c of chunks) {
    const result = await snapChunk(c);
    snapped = snapped.concat(result);
    await sleep(200); // basic rate-limit buffer between chunks
  }

  console.log(`  -> ${routeName}: ${snapped.length} snapped points`);
  return snapped;
}

async function main() {
  if (!API_KEY) {
    console.error("Missing GOOGLE_MAPS_API_KEY in .env");
    process.exit(1);
  }

  const output = {};

  for (const [routeName, entry] of Object.entries(rawData)) {
    try {
      const snappedCoords = await snapRoute(routeName, entry.coordinates);
      output[routeName] = { coordinates: snappedCoords };
    } catch (err) {
      console.error(`Failed to snap ${routeName}:`, err.message);
      output[routeName] = entry; // fall back to raw data on failure
    }
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`\nDone. Written to ${OUTPUT_PATH}`);
}

main();
