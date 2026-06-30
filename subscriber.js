// subscriber.js
const { isOnRoute } = require('./geofence');
const geofenceByRoute = require('./routes/geofence.json');
const vehicleRoutes = require('./routes/vehicleRoutes.json');
require('dotenv').config();
const mqtt = require('mqtt');
const db = require('./firebase');

const localState = {}; // per-vehicle in-memory cache: avoids reading Firestore before every write

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

    const vehicleRef = db.collection('vehicles').doc(vehicleId);

    if (!localState[vehicleId]) localState[vehicleId] = { recentSpeeds: [], stationarySince: null };
    const state = localState[vehicleId];

    state.recentSpeeds = [...state.recentSpeeds, speed].slice(-4);

    if (speed < 1) {
      if (!state.stationarySince) state.stationarySince = timestamp;
    } else {
      state.stationarySince = null;
    }

    await vehicleRef.set({
      lat, lng, speed, heading,
      lastUpdated: timestamp,
      recentSpeeds: state.recentSpeeds,
      stationarySince: state.stationarySince,
      onRoute,
    }, { merge: true });

    // History writes disabled for now to stay under Firestore free-tier quota at this message volume
    // await vehicleRef.collection('history').add({ lat, lng, speed, heading, timestamp, onRoute });

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