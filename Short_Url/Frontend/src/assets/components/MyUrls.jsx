import React, { useState, useEffect } from "react";
import axios from "axios";

function MyUrlsList() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    // Using axios for the API call
    axios
      .get("http://localhost:8080/api/Urls/myurls", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setUrls(response.data))
      .catch((err) =>
        setError(`Error: ${err.response?.data?.message || err.message}`)
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-dark p-3 rounded">
      <h3 className="text-danger">Your Shortened URLs</h3>
      {loading && <p className="text-warning">⏳ Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {urls.length > 0 ? (
          urls.map((url) => (
            <li key={url.id} className="list-group-item bg-dark text-light">
              <a
                href={`http://localhost:8080/${url.shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`http://localhost:8080/${url.shortUrl}`}
              </a>{" "}
              → {url.originalUrl}
            </li>
          ))
        ) : (
          <p className="text-muted">No URLs found.</p>
        )}
      </ul>
    </div>
  );
}

export default MyUrlsList;
