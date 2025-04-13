import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios"; // Importing axios
import "chart.js/auto";

function TotalClicksChart() {
  const [clickData, setClickData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    const startDate = "2024-01-01";
    const endDate = "2024-12-31";

    // Using axios for API request
    axios
      .get("http://localhost:8080/api/Urls/totalclicks", {
        params: { startDate, endDate },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const data = response.data;

        if (!data || typeof data !== "object") {
          throw new Error("Invalid API response");
        }

        setClickData({
          labels: Object.keys(data),
          datasets: [
            {
              label: "Clicks",
              data: Object.values(data),
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            },
          ],
        });
      })
      .catch((err) => setError(`Error: ${err.message}`))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-dark p-3 rounded">
      <h3 className="text-danger">Total Clicks Over Time</h3>
      {loading && <p className="text-warning">⏳ Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && clickData.labels.length > 0 ? (
        <Line data={clickData} options={{ responsive: true }} />
      ) : (
        <p className="text-muted">No data available.</p>
      )}
    </div>
  );
}

export default TotalClicksChart;
