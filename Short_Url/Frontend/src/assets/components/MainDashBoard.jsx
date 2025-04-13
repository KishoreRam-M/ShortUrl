import React, { useState, useEffect } from "react";
import axios from "axios";
import MyUrlsList from "./MyUrls";
import TotalClicksChart from "./TotalClicks";
import UrlAnalyticsChart from "./UrlAnalytics";
import Navbar from "./Nav";

function Dashboard() {
  const [tab, setTab] = useState("urls");
  const [selectedShortUrl, setSelectedShortUrl] = useState("");
  const [liveClicks, setLiveClicks] = useState({});
  const [startDate, setStartDate] = useState(""); // Start Date for Analytics
  const [endDate, setEndDate] = useState(""); // End Date for Analytics

  // Helper function to format date as YYYY-MM-DD
  const getFormattedDate = (daysOffset = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  };

  useEffect(() => {
    // Set default start and end dates (Last 7 days)
    setStartDate(getFormattedDate(-7));
    setEndDate(getFormattedDate(0));
  }, []);

  // Fetch total clicks
  useEffect(() => {
    const fetchTotalClicks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/Urls/totalclicks`, {
          params: {
            startDate,
            endDate,
          },
          withCredentials: true, // To include authentication cookies/tokens
        });

        console.log("📊 Total Clicks Response:", response.data);
        setLiveClicks(response.data); // Store total clicks by date
      } catch (error) {
        console.error("❌ Error fetching total clicks:", error);
      }
    };

    if (startDate && endDate) {
      fetchTotalClicks();
      const interval = setInterval(fetchTotalClicks, 5000); // Auto-refresh every 5 sec
      return () => clearInterval(interval);
    }
  }, [startDate, endDate]); // Refetch when dates change

  // Fetch analytics data when short URL is entered
  useEffect(() => {
    if (!selectedShortUrl) return;

    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/Urls/analytics/${selectedShortUrl}`, {
          params: {
            startDate,
            endDate,
          },
          withCredentials: true,
        });

        console.log("📊 Analytics Data:", response.data);
      } catch (error) {
        console.error("❌ Error fetching analytics:", error);
      }
    };

    fetchAnalytics();
  }, [selectedShortUrl, startDate, endDate]); // Refetch when URL or date range changes

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
            Total Clicks <span className="badge bg-warning">{Object.values(liveClicks).reduce((sum, val) => sum + val, 0)}</span>
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
              {/* Date Picker */}
              <div className="d-flex justify-content-between mb-3">
                <input
                  type="date"
                  className="form-control bg-secondary text-light"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  className="form-control bg-secondary text-light"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              {/* Input Field for Short URL */}
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
