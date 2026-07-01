# Jeepney Backend

Backend service for real-time jeepney tracking. It simulates GPS pings from jeepneys, streams them over MQTT, stores them in Firestore, and exposes a REST API (including ETA calculations, geofencing, and bunching detection) for the frontend to consume.

## Architecture / Data Flow

```
simulator.js / replaySimulator.js  --publish-->  HiveMQ Cloud (MQTT)  --subscribe-->  subscriber.js  -->  Firestore
                                                                                                                |
                                                                                                                v
                                                                                  bunching.js (every 30s)  <--  server.js (REST API)
                                                                                          |                         |
                                                                                          v                         v
                                                                                   bunching_alerts            Frontend team
                                                                                    (Firestore)
```

1. **`simulator.js`** acts as a single fake ESP32 device, publishing GPS pings for one vehicle to `jeepney/{vehicleId}/location` every 3 seconds.
2. **`replaySimulator.js`** replays real multi-vehicle GPS data (from the AI Lead's `simulated_trips_multiroute.csv`) over MQTT — publishing all 8 vehicles across 4 routes at their real recorded positions, compressed to a fast tick interval for testing. This is the preferred way to test bunching detection, since it uses actual two-vehicle-per-route traces instead of made-up coordinates.
3. **`subscriber.js`** listens to `jeepney/+/location` (all vehicles), and on each message:
   - Updates the vehicle's latest position in Firestore (single write, no read-before-write)
   - Maintains a rolling window of the last 4 speed readings (`recentSpeeds`) in local memory (not re-fetched from Firestore each time, to stay within Firestore free-tier quota)
   - Tracks how long a vehicle has been stationary (`stationarySince`)
   - Checks whether the vehicle is within its route's geofence (`onRoute`), using the correct route per vehicle via `routes/vehicleRoutes.json`
   - History subcollection writes are currently disabled by default to conserve Firestore write quota at high message volume
4. **`server.js`** exposes REST endpoints that read from Firestore, including computed ETAs, and starts the bunching detection monitor on a 30-second interval.
5. **`bunching.js`** implements the bunching detection spec (per `BUNCHING_RULE_md.docx` / `bunching_detection.py` reference from the AI Lead): every 30 seconds, it groups vehicles by route, filters out stale GPS / terminal stops / stopped vehicles, and flags any same-route pair under 200m apart (resolving the alert once they are over 500m apart again). Alerts are written to Firestore's `bunching_alerts` collection and exposed via `/alerts`.
6. **`seedHistory.js`** is a one-off script to backfill Firestore with real historical data (`demo_history.json`, sourced from `simulated_trips.csv`) for testing `/history` without waiting on a live feed.

---

## Files

| File | Purpose |
|---|---|
| `simulator.js` | Fakes a single ESP32 device, publishes GPS pings for one vehicle |
| `replaySimulator.js` | Replays real multi-vehicle GPS data over MQTT for realistic multi-vehicle testing including bunching scenarios |
| `subscriber.js` | Subscribes to MQTT, writes pings to Firestore, computes onRoute/speed history/stationary status (optimized: no read-before-write) |
| `firebase.js` | Initializes Firebase Admin SDK (modular API, compatible with firebase-admin v14) and exports the Firestore `db` instance |
| `eta.js` | ETA heuristic: haversine distance, 7-band traffic multiplier, effective speed smoothing, waiting/arrival detection — route-aware via `vehicleRoutes.json` |
| `geofence.js` | Point-in-polygon check via `@turf/turf` to determine if a vehicle is on its route |
| `bunching.js` | Bunching detection: pairwise distance checks per route, terminal/stationary/staleness filtering, alert hysteresis (200m detect / 500m resolve), writes to `bunching_alerts` |
| `server.js` | Express REST API; starts bunching monitor on startup |
| `seedHistory.js` | Seeds Firestore with real historical ping data from `demo_history.json` |
| `demo_history.json` | Real historical GPS data (11,914 records) converted from `simulated_trips.csv` |
| `routes/stops.json` | Real stop coordinates per route, derived from the AI Lead's CSV data (5 routes) |
| `routes/geofence.json` | Real route boundary polygons per route, computed as convex hull with buffer around each route's GPS points |
| `routes/vehicleRoutes.json` | Maps each vehicle ID to its route ID |
| `routes/multiroute_data.json` | Full real GPS dataset (56,966 records, 8 vehicles, 4 routes, 30s cadence) used by `replaySimulator.js` |
| `.env` | MQTT credentials (not committed) |
| `serviceAccountKey.json` | Firebase Admin service account key (not committed) |

---

## Vehicles and Routes

| Route ID | Vehicles | Stops |
|---|---|---|
| CUBAO-MAKATI | CUBAO-MAKATI-V1, CUBAO-MAKATI-V2 | 10 stops |
| CUBAO-MARIKINA | CUBAO-MARIKINA-V1, CUBAO-MARIKINA-V2 | 9 stops |
| CUBAO-PASIG | CUBAO-PASIG-V1, CUBAO-PASIG-V2 | 7 stops |
| CUBAO-SANJUAN | CUBAO-SANJUAN-V1, CUBAO-SANJUAN-V2 | 5 stops |
| CUBAO-DIVISORIA | JEEP-01, JEEP-02 | 15 stops |

All route/stop/geofence/vehicle-route mapping data was derived from `simulated_trips.csv` and `simulated_trips_multiroute.csv` provided by the AI Lead.

---

## Firestore Data Model

```
vehicles (collection)
  {vehicleId} (doc)
    lat, lng, speed, heading        -- latest known position
    lastUpdated                     -- timestamp of last ping
    recentSpeeds                    -- array of last 4 speed readings (maintained in memory, written per ping)
    stationarySince                 -- timestamp when vehicle first stopped moving, or null
    onRoute                         -- boolean, whether vehicle is inside its route's geofence
    history (subcollection)         -- currently disabled to conserve write quota
      {auto-id} -> { lat, lng, speed, heading, timestamp, onRoute }

etas (collection)
  {vehicleId} (doc)
    stops (subcollection)
      {stopId} (doc) -> { eta_minutes, status, display_text, confidence, distance_km, timestamp, last_updated }

bunching_alerts (collection)
  {alert_id} (doc) -> {
    route_id, vehicle_a, vehicle_b, distance_meters,
    vehicle_a_lat, vehicle_a_lon, vehicle_b_lat, vehicle_b_lon,
    nearest_stop, speed_a_kmh, speed_b_kmh,
    status ("ACTIVE" | "RESOLVED"), detected_at, resolved_at, message
  }
```

---

## MQTT Topic Structure

```
jeepney/{vehicleId}/location
```

Example payload:
```json
{
  "vehicleId": "CUBAO-MAKATI-V1",
  "lat": 14.5764,
  "lng": 121.0851,
  "speed": 18.5,
  "heading": 92,
  "timestamp": 1719600000000
}
```

Broker: HiveMQ Cloud (Serverless, free tier). Two separate credentials are used, following least-privilege:
- **Publish-only** credential (`MQTT_PUB_USER`/`MQTT_PUB_PASS`) — used by `simulator.js` and `replaySimulator.js`
- **Subscribe-only** credential (`MQTT_SUB_USER`/`MQTT_SUB_PASS`) — used by `subscriber.js`

---

## REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/vehicles` | List all vehicles with latest position and status |
| GET | `/vehicles/:id/history?from=&to=` | Historical pings, optionally filtered by timestamp range |
| GET | `/vehicles/:id/eta/:stopId` | ETA from a vehicle to a specific stop on its route |
| GET | `/vehicles/:id/etas` | ETA from a vehicle to all stops on its route |
| GET | `/alerts` | Currently active bunching alerts (in-memory, live) |

### Example ETA response

```json
{
  "eta_minutes": 12,
  "status": "approaching",
  "display_text": "~12 min to Ortigas Center",
  "confidence": "moderate",
  "distance_km": 2.5,
  "timestamp": "2026-06-29T08:15:30Z"
}
```

`status` values: `"approaching"`, `"arriving"` (within 100m), `"waiting"` (stationary >3 min).
`confidence`: `"high"` once 4+ speed readings are available, otherwise `"moderate"`.

### Example bunching alert

```json
{
  "alert_id": "ALERT-CUBAO-MAKATI-1782795743524",
  "route_id": "CUBAO-MAKATI",
  "vehicle_a": "CUBAO-MAKATI-V1",
  "vehicle_b": "CUBAO-MAKATI-V2",
  "distance_meters": 145.7,
  "nearest_stop": "Ortigas Center",
  "speed_a_kmh": 18.5,
  "speed_b_kmh": 16.2,
  "status": "ACTIVE",
  "detected_at": "2026-06-29T08:15:00.000Z",
  "resolved_at": null,
  "message": "CUBAO-MAKATI-V1 and CUBAO-MAKATI-V2 are bunched near Ortigas Center. Distance: 146m. Consider holding CUBAO-MAKATI-V2 at the next stop to restore spacing."
}
```

---

## ETA Logic (`eta.js`)

- **Distance**: haversine formula between vehicle's current position and stop coordinates
- **Effective speed**: uses current speed if moving (>1 km/h); otherwise averages the last 4 readings; 10 km/h fallback if no history
- **Traffic multiplier**: 7 time-of-day bands:
  - 12AM–5AM: 0.9x
  - 5AM–7AM: 1.2x
  - 7AM–9AM: 1.8x (peak)
  - 9AM–4PM: 1.0x
  - 4PM–7PM: 1.7x (peak)
  - 7PM–10PM: 1.1x
  - 10PM–12AM: 0.95x
- **Waiting detection**: status set to `"waiting"` if speed < 1 km/h for more than 3 minutes
- **Arrival detection**: status set to `"arriving"` if distance to stop is under 100m
- **Route-aware**: looks up the correct stop list for each vehicle via `routes/vehicleRoutes.json` + `routes/stops.json`
- Each calculated ETA is cached to Firestore under `etas/{vehicleId}/stops/{stopId}` for optional frontend push via Firestore listeners

---

## Bunching Detection Logic (`bunching.js`)

Ported from the AI Lead's Python reference (`bunching_detection.py`) per spec (`BUNCHING_RULE_md.docx`):

- Runs every 30 seconds automatically when `server.js` starts
- Vehicles are eligible for bunching checks only if:
  - GPS data is fresh (last updated within 60 seconds)
  - Speed is above 5 km/h (stopped vehicles excluded)
  - Nearest stop is not a terminal (first or last stop on the route)
- **Bunching threshold**: < 200m between two same-route vehicles → `ACTIVE` alert
- **Resolution threshold**: > 500m → `RESOLVED` (hysteresis to prevent flickering)
- Active alerts are kept in memory and served via `GET /alerts`
- All alerts (active and resolved) are persisted to Firestore `bunching_alerts` collection
- Validated against the real AI Lead dataset: the Python reference confirmed **1,102 bunching events** across the 4 routes in `simulated_trips_multiroute.csv`

---

## Setup

```bash
npm install
```

Create a `.env` file (not committed) with:
```
MQTT_HOST=your-cluster.hivemq.cloud
MQTT_PORT=8883
MQTT_PUB_USER=your_publish_username
MQTT_PUB_PASS=your_publish_password
MQTT_SUB_USER=your_subscribe_username
MQTT_SUB_PASS=your_subscribe_password
```

Place your Firebase service account key as `serviceAccountKey.json` in the project root (Firebase Console → Project Settings → Service Accounts → Generate new private key). Not committed.

---

## Running the System

Run each in its own terminal, in this order:

```bash
node subscriber.js       # MQTT -> Firestore
node server.js           # REST API on port 3000 + starts bunching monitor
node replaySimulator.js  # recommended: replays real 8-vehicle GPS data over MQTT
# OR for single-vehicle testing:
node simulator.js
```

Optional one-off:
```bash
node seedHistory.js      # backfill Firestore with real historical data
```

---

## Verifying It Works

```bash
curl http://localhost:3000/vehicles
curl http://localhost:3000/vehicles/CUBAO-MAKATI-V1/history
curl "http://localhost:3000/vehicles/CUBAO-MAKATI-V1/eta/stop1"
curl "http://localhost:3000/vehicles/CUBAO-MAKATI-V1/etas"
curl http://localhost:3000/alerts
```

To verify the broker is receiving messages independently of your Node code, use HiveMQ Cloud's built-in **Web Client** in the cluster console — log in with the subscribe credential and subscribe to `jeepney/#`.

---

## Known Limitations / Outstanding TODOs

**Firestore free-tier quota:** The Spark (free) plan caps at 50,000 reads / 20,000 writes per day. High-frequency testing with `replaySimulator.js` (especially at low `TICK_MS` values) combined with the 30-second bunching poll can exhaust this quota within a single session, returning `RESOURCE_EXHAUSTED` errors until the daily reset (~midnight Pacific Time). Upgrading to the Blaze (pay-as-you-go) plan keeps the same free daily allowance but removes the hard cap — recommended for active development.

**History writes disabled:** The `history` subcollection write in `subscriber.js` is commented out to conserve write quota during testing. Re-enable (and consider batching every Nth message) once quota headroom allows.

**In-memory speed state resets on restart:** `subscriber.js` tracks `recentSpeeds`/`stationarySince` in a local `localState` object instead of reading from Firestore (to avoid per-message reads that rapidly exhaust quota). This means a subscriber restart clears that state and the speed window starts fresh — acceptable for now.

**`replaySimulator.js` tick rate:** Adjust `TICK_MS` based on testing needs vs. quota. `150` = full dataset in ~16 min but write-heavy. `1000` = gentler on quota. `3000` = matches original simulator speed.

**Firestore security rules:** Currently in test mode (open read/write). Lock down before any public/production deployment.

---

## Security Notes

- `.env`, `serviceAccountKey.json`, and `node_modules/` are git-ignored and must never be committed
- MQTT credentials are split into publish-only and subscribe-only accounts so no single credential has more access than it needs
- The HiveMQ Serverless free plan allows up to 100 concurrent connections and 10 GB/month of traffic
