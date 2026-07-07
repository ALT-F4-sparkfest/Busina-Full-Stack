// backend/routes/geofenceRoutes.js
const express = require("express");
const router = express.Router();
const routeGeometry = require("./geofence.snapped.json"); // was: ./geofence.json

const ROUTE_ALIASES = {
  "CUBAO-DIVISORIA-V1": "CUBAO-DIVISORIA",
  "CUBAO-DIVISORIA-V2": "CUBAO-DIVISORIA",
  "CUBAO-MAKATI-V1": "CUBAO-MAKATI",
  "CUBAO-MAKATI-V2": "CUBAO-MAKATI",
  "CUBAO-MARIKINA-V1": "CUBAO-MARIKINA",
  "CUBAO-MARIKINA-V2": "CUBAO-MARIKINA",
  "CUBAO-PASIG-V1": "CUBAO-PASIG",
  "CUBAO-PASIG-V2": "CUBAO-PASIG",
  "CUBAO-SANJUAN-V1": "CUBAO-SANJUAN",
  "CUBAO-SANJUAN-V2": "CUBAO-SANJUAN",
};

router.get("/:routeId/geofence", (req, res) => {
  const { routeId } = req.params;
  const baseRoute = ROUTE_ALIASES[routeId] || routeId;
  const entry = routeGeometry[baseRoute];

  if (!entry) {
    return res
      .status(404)
      .json({ error: `No geofence found for route: ${routeId}` });
  }

  // GeoJSON is [lng, lat] — convert to {lat, lng} for the frontend/Google Maps
  const coordinates = entry.coordinates.map(([lng, lat]) => ({ lat, lng }));

  res.json({ coordinates });
});

module.exports = router;
