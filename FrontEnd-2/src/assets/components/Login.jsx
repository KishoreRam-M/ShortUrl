import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "./Nav";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage(""); // Reset error message

    try {
      const response = await fetch("http://localhost:8080/api/auth/public/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed! Invalid credentials.");
      }

      localStorage.setItem("token", result.token);
      alert("Login Successful! Welcome to the Dark Side. 🦇");

      navigate("/"); // Redirect to Home Page
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-dark d-flex flex-column justify-content-center align-items-center min-vh-100 text-light">
        <div className="container text-center">
          <h1 className="text-danger fw-bold">Enter the Shadows</h1>
          <p className="text-secondary">Access the network of secrecy.</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 bg-dark rounded shadow-lg"
          style={{ width: "350px" }}
        >
          <div className="mb-3">
            <label className="form-label text-light">Username</label>
            <input
              type="text"
              className="form-control bg-secondary text-light border-0"
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <small className="text-danger">{errors.username.message}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control bg-secondary text-light border-0"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <button type="submit" className="btn btn-danger w-100" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>

      <style>
        {`
          .shadow-lg {
            box-shadow: 0px 0px 15px rgba(255, 0, 0, 0.8);
          }
          .btn-danger {
            transition: all 0.3s ease-in-out;
          }
          .btn-danger:hover {
            background-color: #8b0000;
          }
        `}
      </style>
    </>
  );
}

export default Login;
