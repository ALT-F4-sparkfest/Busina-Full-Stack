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

// Allow both local dev and deployed Vercel frontend
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173", "https://busina-one.vercel.app"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use("/routes", geofenceRoutes);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
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

// --- MQTT & SIMULATOR SETUP ---

// Start the MQTT subscriber in this same process, wired to io
require("./subscriber")(io);

// Optionally start the replay simulator (for demo/testing)
if (process.env.ENABLE_REPLAY_SIM === "true") {
  require("./replaySImulator");
  console.log("🔁 Replay simulator enabled");
}

// --- SERVER INITIALIZATION ---

const PORT = process.env.PORT || 3000;
startBunchingMonitor(30000);

server.listen(PORT, () => {
  console.log(`✅ API running on port ${PORT}`);
  console.log(`✅ Socket.IO attached, allowed origins: ${allowedOrigins.join(", ")}`);
});