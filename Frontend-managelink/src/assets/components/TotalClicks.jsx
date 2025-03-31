import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function TotalClicksChart() {
  const [clickData, setClickData] = useState({ labels: [], data: [] });

  useEffect(() => {
    const startDate = "2024-01-01";
    const endDate = "2024-12-31";

    fetch(`http://localhost:8080/api/totalclicks?startDate=${startDate}&endDate=${endDate}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data || typeof data !== "object") {
          throw new Error("Invalid API response");
        }
        setClickData({
          labels: Object.keys(data),
          data: Object.values(data),
        });
      })
      .catch((err) => console.error("Error fetching clicks:", err));
  }, []);

  return (
    <div className="bg-dark p-3 rounded">
      <h3 className="text-danger">Total Clicks Over Time</h3>
      <Line
        data={{
          labels: clickData.labels || [],
          datasets: [
            {
              label: "Clicks",
              data: clickData.data || [],
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,0.2)",
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}

export default TotalClicksChart;
