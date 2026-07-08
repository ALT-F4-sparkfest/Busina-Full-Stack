# 🚌 BUSINA Frontend

> **Bus Intelligent Navigation Assistant**  
> Real-Time Public Transportation Monitoring and Commuter Intelligence Platform

![BUSINA Logo](./public/busina-logo-full-transparent.png)

---

## 📌 Overview

BUSINA (Bus Intelligent Navigation Assistant) is a smart public transportation platform designed to improve commuter mobility through real-time vehicle monitoring, estimated arrival times, and intelligent transport insights.

This repository contains the frontend application built using **React + Vite**, powering two major experiences:

- 🧍 **Commuter Interface** — helps passengers locate vehicles, monitor arrivals, and make better travel decisions.
- 🏢 **Operator Dashboard** — enables transport operators to monitor fleet conditions, analyze performance, and receive operational insights.

The frontend communicates with backend services through REST APIs and Socket.IO real-time events to provide a live transportation experience.

---

# ✨ Core Features

## 🧍 Commuter Experience

BUSINA provides commuters with real-time transportation awareness.

### Features

- Live vehicle tracking
- Interactive Google Maps visualization
- Automatic user location detection
- Route visualization
- Vehicle information display
- ETA estimation
- Route filtering
- Connection status monitoring
- Responsive mobile-first interface

Vehicle information includes:

- Vehicle route
- Current location
- Current speed
- Passenger capacity
- Distance from commuter
- Estimated arrival time

---

# 🏢 Operator Dashboard

The operator dashboard provides fleet intelligence for transport administrators.

### Features

- Real-time fleet monitoring
- Vehicle status overview
- Fleet KPI monitoring
- Route performance analytics
- Travel time visualization
- AI-assisted recommendations
- Vehicle information inspection
- Demand hotspot visualization

Operational information includes:

- Vehicle ID
- Route assignment
- GPS coordinates
- Speed
- Occupancy information
- Synchronization timestamp

---

# 🌐 System Architecture

BUSINA uses a real-time event-driven frontend architecture.

```

```

              Vehicle GPS Data

                     │

                     ▼

          Backend Transportation Server

          Express + Socket.IO + Supabase

                     │

      ┌──────────────┴──────────────┐

      ▼                             ▼

REST API Socket.IO Events

      │                             │

      └──────────────┬──────────────┘

                     ▼

             React Frontend

      ┌──────────────┴──────────────┐

      ▼                             ▼

```

Commuter Interface          Operator Dashboard

```

      │                             │

      ▼                             ▼

```

Passenger Decisions       Fleet Optimization

```

---

# 🛠 Technology Stack

| Category                | Technology                          |
| ----------------------- | ----------------------------------- |
| Framework               | React 18                            |
| Build Tool              | Vite                                |
| Styling                 | CSS3                                |
| Mapping                 | Google Maps JavaScript API          |
| Real-Time Communication | Socket.IO Client                    |
| Data Visualization      | Recharts                            |
| Icons                   | Lucide React                        |
| State Management        | React Hooks                         |
| Backend Communication   | Fetch API                           |
| Deployment              | Vercel                              |
| PWA Support             | Web Manifest + Service Worker Ready |

---

# 📂 Project Structure

```

src
│
├── api
│   ├── alertApi.js
│   ├── vehicleApi.js
│   └── api.js
│
├── assets
│   ├── busina-logo-full-transparent.png
│   └── hero.png
│
├── components
│
│   ├── auth
│   │   └── OperatorLoginGate.jsx
│   │
│   ├── commuter
│   │   ├── BottomSheet.jsx
│   │   └── SearchOverlay.jsx
│   │
│   ├── landing
│   │   ├── Hero
│   │   ├── Navbar
│   │   ├── Impact
│   │   ├── BusinessModel
│   │   ├── Validation
│   │   ├── ExperienceTeaser
│   │   └── WhyNow
│   │
│   ├── map
│   │   ├── LiveMap.jsx
│   │   ├── VehicleMarker.jsx
│   │   ├── UserMarker.jsx
│   │   └── RoutePolylines.jsx
│   │
│   ├── operator
│   │   ├── FleetMap.jsx
│   │   ├── VehicleDetailsPanel.jsx
│   │   └── AIRecommendationPanel.jsx
│   │
│   └── ui
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Skeleton.jsx
│       └── Reveal.jsx
│
├── data
│   ├── demoData.js
│   ├── fleetStats.json
│   ├── demandHotspots.json
│   └── hourlyTravelTime.json
│
├── hooks
│   ├── useLiveVehicles.js
│   ├── useBackendETA.js
│   ├── useRouteGeometry.js
│   ├── useConnectionStatus.js
│   └── usePwaUpdate.js
│
├── pages
│   ├── LandingPage.jsx
│   ├── CommuterView.jsx
│   ├── OperatorView.jsx
│   ├── DeviceSetup.jsx
│   └── SyncDemoView.jsx
│
├── services
│   ├── backend.js
│   └── socket.js
│
├── styles
│   ├── variables.css
│   ├── landing.css
│   ├── commuter.css
│   ├── layout.css
│   └── motion-and-a11y.css
│
├── utils
│   └── geolocation.js
│
├── App.jsx
└── main.jsx

```

---

# 🔄 Real-Time Data Flow

BUSINA uses a hybrid REST + Socket.IO communication model.

## Initial Data Loading

The application retrieves initial vehicle information:

```

Frontend

|

GET Vehicle Data

|

React State Initialization

```

---

## Live Updates

After connection:

```

Backend

|

Socket.IO Event

|

useLiveVehicles Hook

|

React State Update

|

Map + Dashboard Refresh

```

This approach minimizes unnecessary polling while maintaining real-time synchronization.

---

# 🗺 Mapping Architecture

The map system is isolated into reusable components.

```

LiveMap

├── VehicleMarker

├── UserMarker

├── RoutePolylines

├── VehiclePopup

└── MapControls

```

Responsibilities:

- Display live vehicles
- Render route paths
- Show commuter location
- Handle selected vehicles
- Update map state dynamically

---

# 🧠 Intelligent Features

## ETA Estimation

BUSINA estimates vehicle arrival time using transportation data.

Inputs:

- Vehicle GPS position
- Route geometry
- Current vehicle movement
- Distance calculations

Output:

- Estimated arrival time

---

## AI Recommendation System

The operator dashboard includes an AI-assisted recommendation module.

Current implementation:

- rule-based operational insights
- fleet utilization analysis
- demand hotspot evaluation
- route condition assessment

Future expansion:

- machine learning prediction
- demand forecasting
- automated fleet optimization

---

# 🎨 BUSINA Design System

BUSINA evolved into a modern smart mobility identity.

## Brand Colors

| Purpose       | Hex       |
| ------------- | --------- |
| Primary Navy  | `#052675` |
| Deep Navy     | `#03164A` |
| Action Orange | `#FCA307` |
| Alert Coral   | `#FD4847` |
| Warm Cream    | `#FBF4C6` |

---

## Typography

| Font          | Usage                  |
| ------------- | ---------------------- |
| Bebas Neue    | Branding / Hero Titles |
| Inter         | Interface Text         |
| Space Grotesk | Supporting Headings    |

---

# 📱 Progressive Web Application

BUSINA includes PWA-ready assets:

```

public

├── icon-192.png

├── icon-512.png

├── icon-maskable-512.png

├── favicon.svg

└── manifest assets

```

Supported capabilities:

- Installable application experience
- Mobile optimized interface
- Application icons
- Offline preparation

---

# 🚀 Installation

## Requirements

- Node.js 18+
- npm

---

## Clone Repository

```bash
git clone https://github.com/your-org/busina-frontend.git

cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

# ⚙ Environment Configuration

Create a `.env` file:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

VITE_BACKEND_URL=your_backend_url

```

---

# ▶ Running the Application

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Preview:

```bash
npm run preview
```

---

# 📊 Current Development Status

| Feature                        | Status       |
| ------------------------------ | ------------ |
| Landing Page                   | ✅ Complete  |
| BUSINA Branding                | ✅ Complete  |
| Responsive Design              | ✅ Complete  |
| PWA Assets                     | ✅ Complete  |
| Commuter Dashboard             | ✅ Complete  |
| Operator Dashboard             | ✅ Complete  |
| Google Maps Integration        | ✅ Complete  |
| Live Vehicle Tracking          | ✅ Complete  |
| Socket.IO Synchronization      | ✅ Complete  |
| ETA Display                    | ✅ Complete  |
| Fleet Analytics                | ✅ Complete  |
| AI Recommendation Panel        | ✅ Prototype |
| Operator Authentication        | 🟡 Prototype |
| Historical Playback            | 🔵 Planned   |
| Demand Forecasting             | 🔵 Planned   |
| Full Role-Based Authentication | 🔵 Planned   |

---

# 🐛 Engineering Improvements

During development, several frontend issues were identified and resolved:

- Mobile navigation overflow
- Responsive typography scaling
- Fixed horizontal overflow layouts
- Animation conflicts affecting fixed components
- Incorrect theme variable mapping
- UI alignment issues
- Improved loading skeleton states
- Improved synchronization indicators
- Recovered stale-file inconsistencies

---

# 🔮 Future Roadmap

## Platform

- Full authentication
- Role-based access control
- Offline-first capabilities
- Push notifications

## Transportation Intelligence

- Predictive ETA modeling
- Passenger demand forecasting
- Historical route playback
- Fleet optimization algorithms

## User Experience

- Personalized commuter routes
- Smart travel recommendations
- Improved accessibility features

---

# 👥 Development

BUSINA combines:

- Frontend engineering
- Real-time systems
- Transportation analytics
- Embedded GPS technology
- Smart mobility solutions

---

# 📜 License

This project is developed for educational, research, and innovation purposes.

---

# 🚌 Built for Smarter Mobility

> BUSINA transforms public transportation from uncertainty into informed decision-making.
