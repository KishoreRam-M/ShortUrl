import React from "react";
import Navbar from "./Nav";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function AboutPage() {
  return (
    <>
      <Navbar />

      <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-light position-relative">
        {/* Main Title */}
        <h1 className="display-1 fw-bold text-danger text-center glow-effect mb-4">
          ShadowLink
        </h1>

        {/* Subtitle */}
        <h2 className="display-6 fw-bold text-warning text-center fade-up">
          "Not All Heroes Wear Capes, Some Just Shorten Links."
        </h2>

        {/* Product Purpose */}
        <p className="lead text-center mt-3 text-secondary fade-up">
          In the vast digital city where URLs grow longer, one tool operates in the shadows—
          refining, securing, and accelerating access to what matters. Your links deserve 
          protection, and now, they have it.
        </p>

        {/* Core Features */}
        <div className="container mt-4 fade-up">
          <h3 className="text-warning text-center mb-3">The Code of the Shadows</h3>
          <div className="row">
            {/* Feature 1 */}
            <div className="col-md-6 col-lg-3">
              <div className="card feature-card">
                <div className="card-body text-center">
                  <h5 className="text-danger">⚡ Shadow Step</h5>
                  <p>Your links vanish from the public eye, yet move with lightning speed.</p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-md-6 col-lg-3">
              <div className="card feature-card">
                <div className="card-body text-center">
                  <h5 className="text-danger">🦇 Silent Guardian</h5>
                  <p>Fortified security ensures your links remain untouchable.</p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-md-6 col-lg-3">
              <div className="card feature-card">
                <div className="card-body text-center">
                  <h5 className="text-danger">🎭 Cloaked Identity</h5>
                  <p>No unnecessary traces, no exposure—just pure anonymity.</p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="col-md-6 col-lg-3">
              <div className="card feature-card">
                <div className="card-body text-center">
                  <h5 className="text-danger">🔗 Unbreakable Signal</h5>
                  <p>Even in the darkest corners of the web, your links stand resilient.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Information */}
        <div className="container mt-5 fade-up">
          <div className="card developer-card">
            <div className="card-body text-center">
              <h3 className="text-info">The Architect of the Night</h3>
              <p className="fst-italic text-light">
                "It's not who I am underneath, but what I do that defines me."
              </p>
              <p className="text-muted">
                Built by <strong>Kishore Ram</strong>, a full-stack developer mastering the art of efficiency, security,
                and performance. Transforming complexity into simplicity, ensuring your digital presence remains sharp and undetected.
              </p>
              <p>
                <a href="https://github.com/KishoreRam-M" className="btn btn-danger me-3" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/kishoreramm6/" className="btn btn-outline-danger ms-3" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-5 text-center text-muted small fade-up">
          "In a world of cluttered URLs, I bring order to the chaos. I am the unseen force behind seamless navigation."
        </div>

        {/* CSS Styles */}
        <style>
          {`
          .glow-effect {
            text-shadow: 0px 0px 25px rgba(255, 0, 0, 0.9);
            letter-spacing: 3px;
            animation: pulseGlow 2s infinite alternate;
          }
          @keyframes pulseGlow {
            from {
              text-shadow: 0px 0px 25px rgba(255, 0, 0, 0.9);
            }
            to {
              text-shadow: 0px 0px 40px rgba(255, 0, 0, 1);
            }
          }
          .feature-card, .developer-card {
            background-color: rgba(0, 0, 0, 0.85);
            border: 1px solid rgba(255, 0, 0, 0.5);
            color: white;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }
          .feature-card:hover, .developer-card:hover {
            transform: scale(1.05);
            box-shadow: 0px 0px 15px rgba(255, 0, 0, 0.6);
          }
          .fade-up {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 1.5s ease-in-out forwards;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          `}
        </style>
      </div>

      <Footer />
    </>
  );
}

export default AboutPage;
