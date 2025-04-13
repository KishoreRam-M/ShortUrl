import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar-bg">
      <div className="container">
        {/* Brand Name */}
        <NavLink className="navbar-brand text-danger fw-bold" to="/">
          ShadowLink
        </NavLink>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" activeClassName="active">
                About
              </NavLink>
            </li>

            {/* Signup Button */}
            <li className="nav-item">
              <NavLink className="nav-link btn btn-danger text-light px-3 ms-2" to="/signup">
                Signup
              </NavLink>
            </li>

            {/* Login Button */}
            <li className="nav-item">
              <NavLink className="nav-link btn btn-outline-danger px-3 ms-2" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
        .custom-navbar-bg {
          background-color: black !important;
        }
        .nav-link {
          color: rgba(255, 255, 255, 0.7) !important;
          transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        .nav-link:hover, .nav-link.active {
          color: white !important;
          transform: scale(1.1);
        }
        .btn-danger {
          transition: all 0.3s ease-in-out;
        }
        .btn-danger:hover {
          background-color: #8b0000;
          transform: scale(1.05);
        }
        .btn-outline-danger:hover {
          background-color: red;
          color: black !important;
        }
        `}
      </style>
    </nav>
  );
}

export default Navbar;
