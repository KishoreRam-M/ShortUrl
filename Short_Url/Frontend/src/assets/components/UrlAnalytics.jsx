import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios"; // Importing axios
import "chart.js/auto";

function UrlAnalyticsChart({ shortUrl, startDate, endDate }) {
  const [analyticsData, setAnalyticsData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shortUrl?.trim()) return;

    setLoading(true);
    setError("");

    // Make the axios request
    axios
      .get(`http://localhost:8080/api/Urls/analytics/${shortUrl}`, {
        params: { startDate, endDate },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const data = response.data;

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
              backgroundColor: ["red", "blue", "green", "yellow"], // Customize colors
            },
          ],
        });
      })
      .catch((err) => setError(`Error: ${err.message}`))
      .finally(() => setLoading(false));
  }, [shortUrl, startDate, endDate]); // Depend on shortUrl, startDate, endDate for updates

  return (
    <div className="mt-3">
      <h5 className="text-danger">Click Distribution by Device</h5>
      {loading && <p className="text-warning">⏳ Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && analyticsData.labels.length > 0 ? (
        <Pie data={analyticsData} />
      ) : (
        <p className="text-muted">No data available.</p>
      )}
    </div>
  );
}

export default UrlAnalyticsChart;
