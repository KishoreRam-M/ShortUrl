import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

function UrlAnalyticsChart({ shortUrl }) {
  const [analyticsData, setAnalyticsData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shortUrl?.trim()) return;

    setLoading(true);
    setError("");

    const startDate = new Date(2024, 0, 1, 0, 0, 0).toISOString().split(".")[0]; // "YYYY-MM-DDTHH:MM:SS"
    const endDate = new Date(2024, 11, 31, 23, 59, 59).toISOString().split(".")[0];

    fetch(`http://localhost:8080/api/Urls/analytics/${shortUrl}?startDate=${startDate}&endDate=${endDate}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          setError("No analytics data found.");
          return;
        }

        const devices = data.reduce((acc, click) => {
          acc[click.device] = (acc[click.device] || 0) + 1;
          return acc;
        }, {});

        setAnalyticsData({
          labels: Object.keys(devices),
          datasets: [
            {
              label: "Clicks",
              data: Object.values(devices),
              backgroundColor: ["red", "blue", "green", "yellow"],
            },
          ],
        });
      })
      .catch((err) => setError(`Error: ${err.message}`))
      .finally(() => setLoading(false));
  }, [shortUrl]);

  return (
    <div className="mt-3">
      <h5 className="text-danger">Click Distribution by Device</h5>
      {loading && <p className="text-warning">⏳ Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && analyticsData.labels.length > 0 ? <Pie data={analyticsData} /> : <p className="text-muted">No data available.</p>}
    </div>
  );
}

export default UrlAnalyticsChart;
