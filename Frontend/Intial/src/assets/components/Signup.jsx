import React, { useState } from "react";
import Navbar from "./Nav";
function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    alert("Signup successful!");
  };

  return (
    <>
      {/* Include Navbar */}
      <Navbar />

      <div className="bg-dark d-flex flex-column justify-content-center align-items-center min-vh-100 text-light">
        <div className="container text-center">
          <h1 className="text-danger fw-bold">Join ShadowLink</h1>
          <p className="text-secondary">Become part of the shadow network.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 bg-dark rounded shadow-lg"
          style={{ width: "350px" }}
        >
          <div className="mb-3">
            <label className="form-label text-light">Username</label>
            <input
              type="text"
              className="form-control bg-secondary text-light border-0"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Email</label>
            <input
              type="email"
              className="form-control bg-secondary text-light border-0"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control bg-secondary text-light border-0"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
