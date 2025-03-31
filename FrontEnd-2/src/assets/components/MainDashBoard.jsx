import React, { useState, useEffect } from "react";
import MyUrlsList from "./MyUrls";
import TotalClicksChart from "./TotalClicks";
import UrlAnalyticsChart from "./UrlAnalytics";
import Navbar from "./Nav";

function Dashboard() {
  const [tab, setTab] = useState("urls");
  const [selectedShortUrl, setSelectedShortUrl] = useState("");
  const [ws, setWs] = useState(null);
  const [liveClicks, setLiveClicks] = useState(0);

  // WebSocket Connection
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/?token=kPEgSFv0JX3H");

    socket.onopen = () => console.log("✅ WebSocket Connected");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("🔴 WebSocket Message:", data);

      // Handle different types of real-time data
      if (data.type === "CLICK_UPDATE") {
        setLiveClicks((prev) => prev + 1); // Update live click count
      }
      if (data.type === "ANALYTICS_UPDATE" && data.shortUrl === selectedShortUrl) {
        // Trigger Analytics Chart Update
        console.log("🔍 Updating analytics for:", selectedShortUrl);
      }
    };

    socket.onerror = (error) => console.error("❌ WebSocket Error:", error);
    socket.onclose = () => console.log("⚠️ WebSocket Disconnected");

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [selectedShortUrl]); // Reconnect if selected URL changes

  return (
    <>
      <Navbar /> {/* Navbar Included */}

      <div className="container mt-5 text-light">
        <h2 className="text-danger text-center flicker-text">
          The Dark Dashboard <span className="bat-logo">🦇</span>
        </h2>

        {/* Tab Navigation Buttons */}
        <div className="d-flex justify-content-center my-3">
          <button className={`btn mx-2 ${tab === "urls" ? "btn-danger" : "btn-outline-danger"}`} onClick={() => setTab("urls")}>
            My URLs
          </button>
          <button className={`btn mx-2 ${tab === "clicks" ? "btn-danger" : "btn-outline-danger"}`} onClick={() => setTab("clicks")}>
            Total Clicks <span className="badge bg-warning">{liveClicks}</span> {/* Live Updates */}
          </button>
          <button className={`btn mx-2 ${tab === "analytics" ? "btn-danger" : "btn-outline-danger"}`} onClick={() => setTab("analytics")}>
            Analytics
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="card bg-dark text-light p-4 rounded shadow-lg card-hover">
          {tab === "urls" && <MyUrlsList />}
          {tab === "clicks" && <TotalClicksChart liveClicks={liveClicks} />} {/* Pass Live Clicks */}
          
          {tab === "analytics" && (
            <div>
              {/* Input Field for URL (Now Persisted) */}
              <input
                type="text"
                placeholder="Enter short URL"
                className="form-control bg-secondary text-light my-2"
                value={selectedShortUrl}
                onChange={(e) => setSelectedShortUrl(e.target.value)}
                onPaste={(e) => {
                  setTimeout(() => {
                    setSelectedShortUrl(e.clipboardData.getData("text"));
                  }, 0);
                }}
                onFocus={(e) => e.target.select()} // Keep text selected
              />

              {/* Display Analytics Chart only when URL is entered */}
              {selectedShortUrl.trim() && <UrlAnalyticsChart shortUrl={selectedShortUrl} />}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
