import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "./Nav";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min");
  }, []);

  return (
    <div className="bg-dark text-light min-vh-100">
      <Navbar />

      {/* Hero Section */}
      <div className="container text-center py-5">
        <h1 className="display-3 fw-bold text-danger glow">
          Shorten Your Links, Stay in the Shadows 🦇
        </h1>
        <p className="lead text-secondary">
          Fast, secure, and anonymous link shortening with a touch of mystery.
        </p>
        <div className="mt-4">
          <button 
            className="btn btn-danger btn-lg me-3 shadow-lg animated-button"
            onClick={() => navigate("/dashboard")} // Redirect to Dashboard
          >
            🕵️‍♂️ Manage Links
          </button>
          <button className="btn btn-outline-danger btn-lg shadow-lg animated-button">
            ✂️ Create Short Link
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-black text-light shadow-lg p-3 hover-effect">
              <div className="card-body">
                <h5 className="card-title text-danger">⚡ Instant Shortening</h5>
                <p className="card-text text-secondary">
                  Shorten your URLs in a flash with maximum efficiency.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-black text-light shadow-lg p-3 hover-effect">
              <div className="card-body">
                <h5 className="card-title text-danger">🦇 Anonymous & Secure</h5>
                <p className="card-text text-secondary">
                  Your links remain private and untraceable.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-black text-light shadow-lg p-3 hover-effect">
              <div className="card-body">
                <h5 className="card-title text-danger">🔗 Custom Links</h5>
                <p className="card-text text-secondary">
                  Create personalized short links with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Custom Styles */}
      <style>
        {`
          .glow {
            text-shadow: 0px 0px 20px rgba(255, 0, 0, 0.8);
            animation: glow-pulse 2s infinite alternate;
          }

          @keyframes glow-pulse {
            from { text-shadow: 0px 0px 10px rgba(255, 0, 0, 0.5); }
            to { text-shadow: 0px 0px 25px rgba(255, 0, 0, 1); }
          }

          .animated-button {
            transition: all 0.3s ease-in-out;
          }

          .animated-button:hover {
            transform: scale(1.1);
            box-shadow: 0px 0px 15px rgba(255, 0, 0, 0.7);
          }

          .hover-effect {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .hover-effect:hover {
            transform: translateY(-8px);
            box-shadow: 0px 0px 25px rgba(255, 0, 0, 0.7);
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
