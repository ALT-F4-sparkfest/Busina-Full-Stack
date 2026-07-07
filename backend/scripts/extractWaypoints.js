// backend/scripts/extractWaypoints.js
const fs = require("fs");
const path = require("path");

const INPUT_PATH = path.join(__dirname, "../routes/geofence.json");
const OUTPUT_PATH = path.join(__dirname, "../routes/routeWaypoints.json");

const rawData = require(INPUT_PATH);

function distanceMeters([lng1, lat1], [lng2, lat2]) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Merge points that are basically duplicates (within a few meters) —
// these are the dense micro-clusters we saw in the raw data
const DEDUPE_RADIUS_METERS = 50;

function extractDistinctPoints(coordinates) {
  const distinct = [];
  for (const point of coordinates) {
    const last = distinct[distinct.length - 1];
    if (!last || distanceMeters(last, point) > DEDUPE_RADIUS_METERS) {
      distinct.push(point);
    }
  }
  return distinct;
}

const output = {};

for (const [routeName, entry] of Object.entries(rawData)) {
  const distinct = extractDistinctPoints(entry.coordinates);
  console.log(
    `${routeName}: ${entry.coordinates.length} raw points -> ${distinct.length} distinct waypoints`,
  );
  output[routeName] = { coordinates: distinct };
}

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
console.log(`\nDone. Written to ${OUTPUT_PATH}`);
