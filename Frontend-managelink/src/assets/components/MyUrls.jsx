import React, { useState, useEffect } from "react";

function MyUrlsList() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/myurls", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setUrls(data))
      .catch((err) => console.error("Error fetching URLs", err));
  }, []);

  return (
    <div className="text-light">
      <h3 className="text-danger">Your Shortened URLs</h3>
      <ul className="list-group bg-dark">
        {urls.map((url) => (
          <li key={url.id} className="list-group-item bg-dark text-light">
            <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
              {url.shortUrl}
            </a>{" "}
            → {url.originalUrl}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyUrlsList;
