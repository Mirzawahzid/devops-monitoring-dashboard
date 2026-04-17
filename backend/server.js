require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const metricsRoutes = require("./routes/metricsRoutes");

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Routes */
app.get("/", (req, res) => {
  res.json({
    message: "DevOpsHub Backend Running 🚀",
    status: "success"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/metrics", metricsRoutes);

/* 404 Handler */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

/* Start Server */
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});