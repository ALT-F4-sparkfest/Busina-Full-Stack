# Jeepney Backend

Backend service for real-time jeepney tracking. It simulates GPS pings from jeepneys, streams them over MQTT, stores them in Supabase PostgreSQL, and exposes a REST API (including ETA calculations, geofencing, and bunching detection) for the frontend to consume.

## Architecture / Data Flow

```
simulator.js / replaySimulator.js  --publish-->  HiveMQ Cloud (MQTT)  --subscribe-->  subscriber.js  -->  Supabase PostgreSQL
                                                                                                                |
                                                                                                                v
                                                                                  bunching.js (every 30s)  <--  server.js (REST API)
                                                                                          |                         |
                                                                                          v                         v
                                                                                   bunching_alerts            Frontend team
                                                                                    (Supabase)
```

1. **`simulator.js`** acts as a single fake ESP32 device, publishing GPS pings for one vehicle to `jeepney/{vehicleId}/location` every 3 seconds.
2. **`replaySimulator.js`** replays real multi-vehicle GPS data (from the AI Lead's `simulated_trips_multiroute.csv`) over MQTT — publishing all 8 vehicles across 4 routes at their real recorded positions, compressed to a fast tick interval for testing. This is the preferred way to test bunching detection, since it uses actual two-vehicle-per-route traces instead of made-up coordinates.
3. **`subscriber.js`** listens to `jeepney/+/location` (all vehicles), and on each message:
   - Updates the vehicle's latest position in Supabase (`vehicles` table, upsert)
   - Maintains a rolling window of the last 4 speed readings (`recent_speeds`) in local memory to avoid per-message database reads
   - Tracks how long a vehicle has been stationary (`stationary_since`)
   - Checks whether the vehicle is within its route's geofence (`on_route`), using the correct route per vehicle via `routes/vehicleRoutes.json`
4. **`server.js`** exposes REST endpoints that read from Supabase, including computed ETAs, and starts the bunching detection monitor on a 30-second interval. Also requires `subscriber.js` directly so both run in a single process.
5. **`bunching.js`** implements the bunching detection spec (per `BUNCHING_RULE_md.docx` / `bunching_detection.py` reference from the AI Lead): every 30 seconds, it groups vehicles by route, filters out stale GPS / terminal stops / stopped vehicles, and flags any same-route pair under 200m apart (resolving the alert once they are over 500m apart again). Alerts are written to Supabase's `bunching_alerts` table and exposed via `/alerts`.
6. **`seedHistory.js`** is a one-off script to backfill Supabase with real historical data (`demo_history.json`, sourced from `simulated_trips.csv`) for testing `/history` without waiting on a live feed.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Database | Supabase (PostgreSQL) |
| MQTT Broker | HiveMQ Cloud (Serverless free tier) |
| Geofencing | @turf/turf |

---

## Files

| File | Purpose |
|---|---|
| `simulator.js` | Fakes a single ESP32 device, publishes GPS pings for one vehicle |
| `replaySimulator.js` | Replays real multi-vehicle GPS data over MQTT for realistic multi-vehicle testing including bunching scenarios |
| `subscriber.js` | Subscribes to MQTT, writes pings to Supabase, computes onRoute/speed history/stationary status |
| `supabase.js` | Initializes the Supabase client and exports it |
| `eta.js` | ETA heuristic: haversine distance, 7-band traffic multiplier, effective speed smoothing, waiting/arrival detection — route-aware via `vehicleRoutes.json` |
| `geofence.js` | Point-in-polygon check via `@turf/turf` to determine if a vehicle is on its route |
| `bunching.js` | Bunching detection: pairwise distance checks per route, terminal/stationary/staleness filtering, alert hysteresis (200m detect / 500m resolve), writes to Supabase `bunching_alerts` table |
| `server.js` | Express REST API; starts bunching monitor and subscriber on startup |
| `seedHistory.js` | Seeds Supabase with real historical ping data from `demo_history.json` |
| `demo_history.json` | Real historical GPS data (11,914 records) converted from `simulated_trips.csv` |
| `routes/stops.json` | Real stop coordinates per route, derived from the AI Lead's CSV data (5 routes) |
| `routes/geofence.json` | Real route boundary polygons per route, computed as convex hull with buffer around each route's GPS points |
| `routes/vehicleRoutes.json` | Maps each vehicle ID to its route ID |
| `routes/multiroute_data.json` | Full real GPS dataset (56,966 records, 8 vehicles, 4 routes, 30s cadence) used by `replaySimulator.js` |
| `.env` | MQTT and Supabase credentials (not committed) |

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

## Database Schema (Supabase PostgreSQL)

```sql
-- Latest position per vehicle
CREATE TABLE vehicles (
  id TEXT PRIMARY KEY,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  speed DOUBLE PRECISION,
  heading INTEGER,
  last_updated BIGINT,
  recent_speeds DOUBLE PRECISION[],
  stationary_since BIGINT,
  on_route BOOLEAN,
  route_id TEXT
);

-- All GPS pings per vehicle (history)
CREATE TABLE history (
  id BIGSERIAL PRIMARY KEY,
  vehicle_id TEXT REFERENCES vehicles(id),
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  speed DOUBLE PRECISION,
  heading INTEGER,
  timestamp BIGINT,
  on_route BOOLEAN
);

-- Cached ETA per vehicle+stop
CREATE TABLE etas (
  vehicle_id TEXT,
  stop_id TEXT,
  eta_minutes INTEGER,
  status TEXT,
  display_text TEXT,
  confidence TEXT,
  distance_km DOUBLE PRECISION,
  timestamp TEXT,
  last_updated BIGINT,
  PRIMARY KEY (vehicle_id, stop_id)
);

-- Bunching alerts
CREATE TABLE bunching_alerts (
  alert_id TEXT PRIMARY KEY,
  route_id TEXT,
  vehicle_a TEXT,
  vehicle_b TEXT,
  distance_meters DOUBLE PRECISION,
  vehicle_a_lat DOUBLE PRECISION,
  vehicle_a_lon DOUBLE PRECISION,
  vehicle_b_lat DOUBLE PRECISION,
  vehicle_b_lon DOUBLE PRECISION,
  nearest_stop TEXT,
  speed_a_kmh DOUBLE PRECISION,
  speed_b_kmh DOUBLE PRECISION,
  status TEXT,
  detected_at TEXT,
  resolved_at TEXT,
  message TEXT
);
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
- Each calculated ETA is cached to Supabase `etas` table for optional frontend push via Supabase Realtime

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
- All alerts (active and resolved) are persisted to Supabase `bunching_alerts` table
- Validated against the real AI Lead dataset: the Python reference confirmed **1,102 bunching events** across the 4 routes in `simulated_trips_multiroute.csv`

---

## Frontend Integration

The frontend can sync with the backend in two ways:

**REST API polling** — call any endpoint on a timer:
```javascript
const res = await fetch('https://your-api-url/vehicles');
const vehicles = await res.json();
```

**Supabase Realtime** — subscribe directly to the `vehicles` table for live push updates without polling:
```javascript
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

supabase
  .channel('vehicles')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'vehicles' }, (payload) => {
    console.log('Vehicle updated:', payload.new);
    // update map marker here
  })
  .subscribe();
```

Give the frontend team the API base URL and the Supabase `anon` public key (safe to expose in frontend code — different from the `service_role` key used in the backend).

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
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_service_role_key
```

---

## Running the System

```bash
npm start         # starts server.js (which also starts subscriber + bunching monitor)
```

Or run each separately for development:
```bash
node subscriber.js       # MQTT -> Supabase
node server.js           # REST API on port 3000 + bunching monitor
node replaySimulator.js  # replays real 8-vehicle GPS data over MQTT
```

Optional one-off:
```bash
node seedHistory.js      # backfill Supabase with real historical data
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

## Security Notes

- `.env` and `node_modules/` are git-ignored and must never be committed
- MQTT credentials are split into publish-only and subscribe-only accounts
- Use the Supabase `service_role` key only in the backend — never expose it to the frontend
- Give the frontend only the Supabase `anon` public key
