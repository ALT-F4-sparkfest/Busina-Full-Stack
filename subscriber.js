// subscriber.js
require('dotenv').config();
const mqtt = require('mqtt');
const db = require('./firebase');

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

    const vehicleRef = db.collection('vehicles').doc(vehicleId);
    const vehicleDoc = await vehicleRef.get();
    const existing = vehicleDoc.exists ? vehicleDoc.data() : {};

    const recentSpeeds = [...(existing.recentSpeeds || []), speed].slice(-4);

    let stationarySince = existing.stationarySince || null;
    if (speed < 1) {
      if (!stationarySince) stationarySince = timestamp;
    } else {
      stationarySince = null;
    }

    await vehicleRef.set({
      lat, lng, speed, heading,
      lastUpdated: timestamp,
      recentSpeeds,
      stationarySince,
    }, { merge: true });

    await vehicleRef.collection('history').add({ lat, lng, speed, heading, timestamp });

    console.log(`Saved ping for ${vehicleId}`);
  } catch (err) {
    console.error('Error processing message:', err);
  }
});

client.on('error', (err) => {
  console.error('MQTT connection error:', err);
});