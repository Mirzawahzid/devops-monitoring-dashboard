import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard({ logout }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/metrics"
      );

      setData(res.data);
    } catch (error) {
      console.log("Metrics load failed");
    }
  };

  if (!data) {
    return <h1 style={{ padding: "40px" }}>Loading Dashboard...</h1>;
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <div className="topbar">
          <h1>Cloud Control Center</h1>
          <button onClick={logout}>Logout</button>
        </div>

        <p className="welcome">
          Welcome back, Engineer 👋
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>{data.stats.activeServers}</h3>
            <span>Active Servers</span>
          </div>

          <div className="stat-card">
            <h3>{data.stats.deployments}</h3>
            <span>Deployments Today</span>
          </div>

          <div className="stat-card">
            <h3>{data.stats.cpuUsage}%</h3>
            <span>CPU Usage</span>
          </div>

          <div className="stat-card">
            <h3>{data.stats.alerts}</h3>
            <span>Critical Alerts</span>
          </div>
        </div>

        <div className="charts-grid">
          <div className="panel">
            <h2>CPU Usage Trend</h2>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.cpuTrend}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#60a5fa"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="panel">
            <h2>Deployments</h2>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.deploymentsChart}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <h2>Recent Activity</h2>
          <p>✅ Metrics connected to backend</p>
          <p>✅ CI/CD pipeline passed</p>
          <p>⚠️ High memory alert on node-2</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;