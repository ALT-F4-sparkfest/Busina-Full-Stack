// server.js
require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const supabase = require("./supabase");
const { calculateEtaToStop, calculateEtasForAllStops } = require("./eta");
const { startBunchingMonitor, activeAlerts } = require("./bunching");
const geofenceRoutes = require("./routes/geofenceRoutes");

const app = express();
const server = http.createServer(app);

// Use FRONTEND_URL env var in production, fallback to local dev URL
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());
app.use("/routes", geofenceRoutes);

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("✅ Client connected to Socket.IO:", socket.id);
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Start the MQTT subscriber in this same process, wired to io
require("./subscriber")(io);

// --- YOUR EXISTING ROUTES (unchanged) ---

// Friendly root route (health check / sanity check)
app.get("/", (req, res) => {
  res.send("Busina backend is running 🚍");
});

app.get("/alerts", (req, res) => {
  res.json(Object.values(activeAlerts));
});

app.get("/vehicles", async (req, res) => {
  const { data, error } = await supabase.from("vehicles").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get("/vehicles/:id/history", async (req, res) => {
  const { id } = req.params;
  const { from, to } = req.query;

  let query = supabase
    .from("history")
    .select("*")
    .eq("vehicle_id", id)
    .order("timestamp", { ascending: true });

  if (from) query = query.gte("timestamp", Number(from));
  if (to) query = query.lte("timestamp", Number(to));

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get("/vehicles/:id/eta/:stopId", async (req, res) => {
  try {
    const result = await calculateEtaToStop(req.params.id, req.params.stopId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/vehicles/:id/etas", async (req, res) => {
  try {
    const result = await calculateEtasForAllStops(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Use Render's dynamic port in production, fallback to 3000 locally
const PORT = process.env.PORT || 3000;
startBunchingMonitor(30000);

server.listen(PORT, () => {
  console.log(`✅ API running on port ${PORT}`);
  console.log(`✅ Socket.IO attached, allowed origin: ${allowedOrigin}`);
});