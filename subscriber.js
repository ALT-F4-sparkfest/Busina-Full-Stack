// subscriber.js
require('dotenv').config();
const mqtt = require('mqtt');
const supabase = require('./supabase');
const { isOnRoute } = require('./geofence');
const geofenceByRoute = require('./routes/geofence.json');
const vehicleRoutes = require('./routes/vehicleRoutes.json');

const localState = {}; // per-vehicle in-memory cache: avoids reading Supabase before every write

const client = mqtt.connect(`mqtts://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`, {
  username: process.env.MQTT_SUB_USER,
  password: process.env.MQTT_SUB_PASS,
});

client.on('connect', () => {
  console.log('Subscriber connected to MQTT');
  client.subscribe('jeepney/+/location');
});

client.on('message', async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    const { vehicleId, lat, lng, speed, heading, timestamp } = data;

    const routeId = vehicleRoutes[vehicleId];
    const geofenceData = geofenceByRoute[routeId];
    const onRoute = geofenceData ? isOnRoute(lat, lng, geofenceData.coordinates) : null;

    if (!localState[vehicleId]) localState[vehicleId] = { recentSpeeds: [], stationarySince: null };
    const state = localState[vehicleId];

    state.recentSpeeds = [...state.recentSpeeds, speed].slice(-4);

    if (speed < 1) {
      if (!state.stationarySince) state.stationarySince = timestamp;
    } else {
      state.stationarySince = null;
    }

    const { error } = await supabase.from('vehicles').upsert({
      id: vehicleId,
      lat,
      lng,
      speed,
      heading,
      last_updated: timestamp,
      recent_speeds: state.recentSpeeds,
      stationary_since: state.stationarySince,
      on_route: onRoute,
      route_id: routeId,
    });

    if (error) console.error('Supabase write error:', error.message);
    else console.log(`Saved ping for ${vehicleId} (onRoute: ${onRoute})`);

  } catch (err) {
    console.error('Error processing message:', err.message || err);
  }
});

client.on('error', (err) => {
  console.error('MQTT connection error:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
});