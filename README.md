# 🚌 BUSINA

> **Real-Time Smart Public Transportation Monitoring and Fleet Intelligence Platform**

![BUSINA Logo](./frontend/public/busina-logo-full-transparent.png)

---

# 📌 Overview

BUSINA (Bus Intelligent Navigation Assistant) is a full-stack smart transportation platform designed to modernize public utility vehicle operations through **real-time GPS monitoring, ETA prediction, fleet analytics, and commuter intelligence**.

The system connects commuters and transport operators through a unified platform:

- 🧍 **Commuters** receive live vehicle locations, estimated arrival times, and route information.
- 🏢 **Transport Operators** gain real-time fleet visibility, operational analytics, bunching detection, and AI-assisted recommendations.

BUSINA combines:

- IoT-style GPS simulation
- MQTT communication
- Real-time event streaming
- Cloud database storage
- Geospatial processing
- Predictive transportation analytics
- Responsive Progressive Web Application design

---

# 🚀 Key Features

## 🧍 Commuter Platform

BUSINA helps passengers make better transportation decisions.

### Features

✅ Live jeepney/bus tracking
✅ Google Maps visualization
✅ Route filtering
✅ Automatic location detection
✅ Vehicle distance calculation
✅ ETA prediction
✅ Vehicle status monitoring
✅ Destination search
✅ Connection monitoring
✅ Waiting request system

Vehicle information includes:

- Route assignment
- Current location
- Vehicle speed
- Passenger capacity
- Distance from commuter
- Estimated arrival time

---

# 🏢 Operator Dashboard

BUSINA provides transport operators with fleet intelligence.

### Features

✅ Live fleet monitoring
✅ Vehicle status overview
✅ KPI dashboard
✅ Route analytics
✅ Travel time visualization
✅ Demand hotspot monitoring
✅ Fleet health monitoring
✅ AI-assisted recommendations
✅ Bunching alerts

Operators can monitor:

- Vehicle ID
- Route assignment
- GPS position
- Speed
- Passenger occupancy
- Last synchronization timestamp
- Operational condition

---

# 🏗 System Architecture

BUSINA follows an event-driven IoT architecture.

```
                  GPS Devices / Simulator
                           │
                           │ MQTT
                           ▼
                 HiveMQ Cloud Broker
                           │
                           ▼
                    MQTT Subscriber
                           │
                           ▼
                  Supabase PostgreSQL
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
        ▼                                     ▼
 Express Backend                     Socket.IO Server
 REST API                            Real-time Events
        │                                     │
        └──────────────────┬──────────────────┘
                           │
                           ▼
                  React Frontend
                           │
        ┌──────────────────┴──────────────────┐
        ▼                                     ▼
 Commuter Interface                 Operator Dashboard
```

---

# 🔄 Data Flow

## Vehicle Tracking Pipeline

```
GPS Ping
   |
MQTT Publish
   |
HiveMQ Cloud
   |
Subscriber Service
   |
Supabase Database
   |
Express + Socket.IO
   |
React Dashboard
```

---

# 📡 IoT Communication Layer

BUSINA uses MQTT for lightweight vehicle communication.

## MQTT Topic

```
jeepney/{vehicleId}/location
```

Example:

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

---

# 🧠 Intelligent Transportation Features

## ETA Prediction Engine

BUSINA estimates vehicle arrival times using:

- Vehicle GPS position
- Route geometry
- Stop coordinates
- Current speed
- Historical movement patterns
- Traffic time multipliers

ETA statuses:

| Status      | Meaning                              |
| ----------- | ------------------------------------ |
| Approaching | Vehicle is moving toward stop        |
| Arriving    | Vehicle within 100 meters            |
| Waiting     | Vehicle stationary for extended time |

---

# 🚦 Bunching Detection

BUSINA detects vehicle bunching where multiple vehicles on the same route become too close.

Detection rules:

- Same route vehicles only
- GPS freshness validation
- Moving vehicles only
- Distance threshold:

```
< 200m  → ACTIVE ALERT

> 500m → RESOLVED
```

Alerts are stored in:

```
bunching_alerts
```

---

# 🛠 Technology Stack

## Frontend

| Technology                 | Purpose                 |
| -------------------------- | ----------------------- |
| React 18                   | UI Framework            |
| Vite                       | Build System            |
| Google Maps JavaScript API | Mapping                 |
| Socket.IO Client           | Real-time updates       |
| Recharts                   | Analytics visualization |
| Lucide React               | Icons                   |
| CSS3                       | Styling                 |
| PWA APIs                   | Installable experience  |

---

## Backend

| Technology          | Purpose               |
| ------------------- | --------------------- |
| Node.js             | Runtime               |
| Express             | REST API              |
| Socket.IO           | Live synchronization  |
| MQTT.js             | IoT communication     |
| Supabase PostgreSQL | Database              |
| Turf.js             | Geospatial processing |
| HiveMQ Cloud        | MQTT broker           |

---

# 📂 Repository Structure

```
BUSINA-Full-Stack
│
├── backend
│
│   ├── server.js
│   ├── subscriber.js
│   ├── simulator.js
│   ├── replaySimulator.js
│   ├── eta.js
│   ├── bunching.js
│   ├── geofence.js
│   ├── supabase.js
│   │
│   ├── routes
│   │   ├── stops.json
│   │   ├── geofence.json
│   │   ├── vehicleRoutes.json
│   │   └── multiroute_data.json
│   │
│   └── seedHistory.js
│
│
└── frontend
    │
    ├── src
    │
    ├── components
    │   ├── commuter
    │   ├── operator
    │   ├── landing
    │   ├── map
    │   └── ui
    │
    ├── hooks
    ├── pages
    ├── services
    ├── styles
    └── utils
```

---

# 🖥 Frontend Architecture

BUSINA frontend follows a component-driven React architecture.

```
App.jsx

 |
 ├── LandingPage
 |
 ├── CommuterView
 |
 ├── OperatorView
 |
 └── SyncDemoView
```

Reusable systems:

- LiveMap
- VehicleMarker
- RoutePolylines
- KPI Cards
- Vehicle Details Panel
- AI Recommendation Panel
- Skeleton Loading States
- Responsive UI Components

---

# 🌐 Backend Services

| File               | Responsibility           |
| ------------------ | ------------------------ |
| server.js          | Express API + Socket.IO  |
| subscriber.js      | MQTT ingestion           |
| simulator.js       | Single vehicle simulator |
| replaySimulator.js | Multi-vehicle replay     |
| eta.js             | ETA computation          |
| bunching.js        | Fleet spacing detection  |
| geofence.js        | Route validation         |
| seedHistory.js     | Historical data import   |

---

# 🔌 REST API

| Method | Endpoint                    | Description   |
| ------ | --------------------------- | ------------- |
| GET    | `/`                         | Server health |
| GET    | `/vehicles`                 | Current fleet |
| GET    | `/vehicles/:id/history`     | GPS history   |
| GET    | `/vehicles/:id/eta/:stopId` | Vehicle ETA   |
| GET    | `/vehicles/:id/etas`        | Route ETA     |
| GET    | `/alerts`                   | Active alerts |
| GET    | `/routes`                   | Route data    |

---

# ⚡ Real-Time Events

Socket.IO events:

## Server → Client

```
connection
vehicle-update
fleet-update
```

## Client → Server

```
commuter-waiting
```

---

# 🎨 Design System

BUSINA evolved into a smart mobility brand.

## Brand Colors

| Purpose       | Color     |
| ------------- | --------- |
| Primary Navy  | `#052675` |
| Deep Navy     | `#03164A` |
| Action Orange | `#FCA307` |
| Alert Coral   | `#FD4847` |
| Warm Cream    | `#FBF4C6` |

---

## Typography

| Font          | Usage               |
| ------------- | ------------------- |
| Bebas Neue    | Brand / Hero        |
| Inter         | Interface           |
| Space Grotesk | Supporting headings |

---

# 📱 Progressive Web Application

BUSINA includes PWA-ready features.

Included:

```
public/

├── icon-192.png
├── icon-512.png
├── icon-maskable-512.png
├── favicon.svg
└── manifest assets
```

Capabilities:

✅ Installable experience
✅ Mobile optimized UI
✅ Application icons
✅ Offline preparation

---

# 🚀 Deployment Architecture

```
              Users

                │

                ▼

          Vercel Frontend

                │

        REST + Socket.IO

                │

                ▼

          Render Backend

                │

        MQTT + Supabase

                │

                ▼

          Cloud Services
```

Deployment:

| Service     | Platform     |
| ----------- | ------------ |
| Frontend    | Vercel       |
| Backend     | Render       |
| Database    | Supabase     |
| MQTT Broker | HiveMQ Cloud |

---

# ⚙ Local Development

## Backend

```bash
cd backend

npm install

node server.js
```

Optional:

```bash
node replaySimulator.js
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔐 Environment Variables

## Backend

```env
SUPABASE_URL=
SUPABASE_KEY=

MQTT_HOST=
MQTT_PORT=

MQTT_SUB_USER=
MQTT_SUB_PASS=

MQTT_PUB_USER=
MQTT_PUB_PASS=

FRONTEND_URL=

ENABLE_REPLAY_SIM=true
```

---

## Frontend

```env
VITE_GOOGLE_MAPS_API_KEY=

VITE_BACKEND_URL=
```

---

# 📊 Current MVP Status

| Module                  | Status       |
| ----------------------- | ------------ |
| Landing Page            | ✅ Complete  |
| Branding System         | ✅ Complete  |
| Responsive UI           | ✅ Complete  |
| PWA Assets              | ✅ Complete  |
| Commuter Portal         | ✅ Complete  |
| Operator Dashboard      | ✅ Complete  |
| Google Maps             | ✅ Complete  |
| MQTT Pipeline           | ✅ Complete  |
| Socket.IO               | ✅ Complete  |
| ETA Engine              | ✅ Complete  |
| Fleet Analytics         | ✅ Complete  |
| Replay Simulator        | ✅ Complete  |
| AI Recommendations      | 🟡 Prototype |
| Operator Authentication | 🟡 Prototype |
| Historical Playback     | 🚧 Planned   |
| Demand Forecasting      | 🚧 Planned   |

---

# 🏆 Engineering Highlights

BUSINA demonstrates:

✅ Full-stack system architecture
✅ Real-time IoT communication
✅ MQTT-based GPS streaming
✅ Cloud database integration
✅ Geospatial computation
✅ Predictive transportation logic
✅ Responsive PWA development
✅ Production deployment workflow

---

# 🔮 Future Roadmap

## Platform

- Role-based authentication
- Offline-first operation
- Push notifications
- Mobile application

## Transportation Intelligence

- Machine-learning ETA prediction
- Demand forecasting
- Automated fleet optimization
- Historical route replay

## User Experience

- Personalized commuting
- Smart route recommendations
- Accessibility improvements

---

# 👥 Project Vision

BUSINA aims to transform public transportation from uncertainty into informed mobility.

By connecting vehicles, operators, and commuters through real-time intelligence, BUSINA creates a foundation for smarter, more reliable, and more efficient transportation systems.

---

# 🚌 Built for Smarter Mobility

**BUSINA — Know where your ride is. Know when it arrives.**
