const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    stats: {
      activeServers: 12,
      deployments: 8,
      cpuUsage: 42,
      alerts: 1
    },
    cpuTrend: [
      { day: "Mon", value: 30 },
      { day: "Tue", value: 45 },
      { day: "Wed", value: 38 },
      { day: "Thu", value: 55 },
      { day: "Fri", value: 42 }
    ],
    deploymentsChart: [
      { name: "API", value: 5 },
      { name: "UI", value: 3 },
      { name: "DB", value: 2 }
    ]
  });
});

module.exports = router;