// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase = require('./supabase');
const { calculateEtaToStop, calculateEtasForAllStops } = require('./eta');
const { startBunchingMonitor, activeAlerts } = require('./bunching');

const app = express();
app.use(cors());
app.use(express.json());

// GET /alerts — currently active bunching alerts
app.get('/alerts', (req, res) => {
  res.json(Object.values(activeAlerts));
});

// GET /vehicles — list active vehicles with latest position
app.get('/vehicles', async (req, res) => {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET /vehicles/:id/history?from=&to= — historical pings
app.get('/vehicles/:id/history', async (req, res) => {
  const { id } = req.params;
  const { from, to } = req.query;

  let query = supabase
    .from('history')
    .select('*')
    .eq('vehicle_id', id)
    .order('timestamp', { ascending: true });

  if (from) query = query.gte('timestamp', Number(from));
  if (to) query = query.lte('timestamp', Number(to));

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET /vehicles/:id/eta/:stopId — ETA to a specific stop
app.get('/vehicles/:id/eta/:stopId', async (req, res) => {
  try {
    const result = await calculateEtaToStop(req.params.id, req.params.stopId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /vehicles/:id/etas — ETA to all stops on the route
app.get('/vehicles/:id/etas', async (req, res) => {
  try {
    const result = await calculateEtasForAllStops(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
startBunchingMonitor(30000);
app.listen(PORT, () => console.log(`API running on port ${PORT}`));