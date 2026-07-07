// backend/scripts/cleanRouteData.js
const fs = require("fs");
const path = require("path");

const INPUT_PATH = path.join(__dirname, "../routes/geofence.json");
const OUTPUT_PATH = path.join(__dirname, "../routes/geofence.cleaned.json");

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

// Only drop a point if it's an isolated spike: far from both neighbors,
// while those neighbors are close to each other (i.e. removing it
// makes the path noticeably smoother, rather than just being a real gap).
const SPIKE_RATIO = 3; // point must be at least 3x farther than its neighbors' own distance

function cleanRoute(coordinates) {
  if (coordinates.length < 3) return coordinates;

  const cleaned = [coordinates[0]];

  for (let i = 1; i < coordinates.length - 1; i++) {
    const prev = coordinates[i - 1];
    const curr = coordinates[i];
    const next = coordinates[i + 1];

    const distPrevCurr = distanceMeters(prev, curr);
    const distCurrNext = distanceMeters(curr, next);
    const distPrevNext = distanceMeters(prev, next);

    const isSpike =
      distPrevCurr > SPIKE_RATIO * distPrevNext &&
      distCurrNext > SPIKE_RATIO * distPrevNext;
    // removed: && distPrevNext < 500

    if (isSpike) {
      console.log(
        `  dropped spike point: [${curr}] (${distPrevCurr.toFixed(0)}m / ${distCurrNext.toFixed(0)}m vs ${distPrevNext.toFixed(0)}m direct)`,
      );
    } else {
      cleaned.push(curr);
    }
  }

  cleaned.push(coordinates[coordinates.length - 1]);
  return cleaned;
}

const output = {};
for (const [routeName, entry] of Object.entries(rawData)) {
  console.log(`Cleaning ${routeName} (${entry.coordinates.length} points)...`);
  const cleaned = cleanRoute(entry.coordinates);
  console.log(`  -> ${cleaned.length} points kept`);
  output[routeName] = { coordinates: cleaned };
}

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
console.log(`\nDone. Written to ${OUTPUT_PATH}`);
