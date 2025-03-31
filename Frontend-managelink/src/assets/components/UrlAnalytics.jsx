import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

function UrlAnalyticsChart({ shortUrl }) {
  const [analyticsData, setAnalyticsData] = useState({ labels: [], data: [] });

  useEffect(() => {
    const startDate = "2024-01-01";
    const endDate = "2024-12-31";

    fetch(`http://localhost:8080/api/analytics/${shortUrl}?startDate=${startDate}&endDate=${endDate}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const devices = data.reduce((acc, click) => {
          acc[click.device] = (acc[click.device] || 0) + 1;
          return acc;
        }, {});

        setAnalyticsData({
          labels: Object.keys(devices),
          data: Object.values(devices),
        });
      })
      .catch((err) => console.error("Error fetching analytics", err));
  }, [shortUrl]);

  return (
    <div className="bg-dark p-3 rounded">
      <h3 className="text-danger">Click Distribution by Device</h3>
      <Pie
        data={{
          labels: analyticsData.labels,
          datasets: [
            {
              label: "Clicks",
              data: analyticsData.data,
              backgroundColor: ["red", "blue", "green", "yellow"],
            },
          ],
        }}
      />
    </div>
  );
}

export default UrlAnalyticsChart;
