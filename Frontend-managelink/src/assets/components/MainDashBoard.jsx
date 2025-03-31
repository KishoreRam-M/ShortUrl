import React, { useState } from "react";
import MyUrlsList from "./MyUrls";
import TotalClicksChart from "./TotalClicks";
import UrlAnalyticsChart from "./UrlAnalytics";
function Dashboard() {
  const [tab, setTab] = useState("urls");
  const [selectedShortUrl, setSelectedShortUrl] = useState("");

  return (
    <div className="container mt-5 text-light">
      <h2 className="text-danger text-center">The Dark Dashboard 🦇</h2>
      
      <div className="d-flex justify-content-center my-3">
        <button className="btn btn-danger mx-2" onClick={() => setTab("urls")}>My URLs</button>
        <button className="btn btn-danger mx-2" onClick={() => setTab("clicks")}>Total Clicks</button>
        <button className="btn btn-danger mx-2" onClick={() => setTab("analytics")}>Analytics</button>
      </div>

      <div className="bg-dark p-4 rounded shadow-lg">
        {tab === "urls" && <MyUrlsList />}
        {tab === "clicks" && <TotalClicksChart />}
        {tab === "analytics" && (
          <>
            <input
              type="text"
              placeholder="Enter short URL"
              className="form-control bg-secondary text-light my-2"
              value={selectedShortUrl}
              onChange={(e) => setSelectedShortUrl(e.target.value)}
            />
            {selectedShortUrl && <UrlAnalyticsChart shortUrl={selectedShortUrl} />}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
