// backend/scripts/extractRoutePaths.js
const fs = require("fs");
const path = require("path");

const INPUT_PATH = path.join(__dirname, "../routes/multiroute_data.json");
const OUTPUT_PATH = path.join(__dirname, "../routes/routePaths.json");

const data = require(INPUT_PATH);

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

const MIN_POINT_SPACING_METERS = 15; // skip pings that barely moved
const LOOP_CLOSE_RADIUS_METERS = 80;
const MIN_TRIP_POINTS_BEFORE_CLOSE_CHECK = 80; // was 10 — force it further before checking loop closure

// Group raw pings by vehicleId (not routeId) — we need ONE vehicle's single lap
const byVehicle = {};
for (const record of data) {
  const vehicleId = record.vehicleId;
  if (!vehicleId) continue;
  if (!byVehicle[vehicleId]) byVehicle[vehicleId] = [];
  byVehicle[vehicleId].push(record);
}

// Pick one vehicle per base route, preferring the "-V1" variant
const routeToVehicle = {};
for (const vehicleId of Object.keys(byVehicle)) {
  const baseRoute = vehicleId.replace(/-V\d+$/, "");
  const isV1 = /-V1$/.test(vehicleId);
  if (!routeToVehicle[baseRoute] || isV1) {
    routeToVehicle[baseRoute] = vehicleId;
  }
}

const output = {};

for (const [baseRoute, vehicleId] of Object.entries(routeToVehicle)) {
  const records = byVehicle[vehicleId]
    .slice()
    .sort((a, b) => a.timestamp - b.timestamp);

  const pathPoints = [];
  const start = [records[0].lng, records[0].lat];

  for (const r of records) {
    const point = [r.lng, r.lat];

    if (pathPoints.length === 0) {
      pathPoints.push(point);
      continue;
    }

    const last = pathPoints[pathPoints.length - 1];
    if (distanceMeters(last, point) < MIN_POINT_SPACING_METERS) continue;

    pathPoints.push(point);

    if (
      pathPoints.length > MIN_TRIP_POINTS_BEFORE_CLOSE_CHECK &&
      distanceMeters(start, point) < LOOP_CLOSE_RADIUS_METERS
    ) {
      break; // one full lap complete
    }
  }

  console.log(
    `${baseRoute} (from ${vehicleId}): ${records.length} raw pings -> ${pathPoints.length} single-lap points`,
  );
  output[baseRoute] = { coordinates: pathPoints };
}

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
console.log(`\nDone. Written to ${OUTPUT_PATH}`);
