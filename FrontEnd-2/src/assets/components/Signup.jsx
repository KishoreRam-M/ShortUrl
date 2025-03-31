import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "./Nav";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 🔥 Hardcoded Backend URL
  const API_BASE_URL = "http://localhost:8080"; // Change this to match your backend

  const onSubmit = async (data) => {
    console.log("Signup Data:", data);
    await registerHandler(data);
  };

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      console.log("Sending request to:", `${API_BASE_URL}/api/auth/public/register`);

      const response = await axios.post(`${API_BASE_URL}/api/auth/public/register`, data);
      console.log("Signup Successful:", response.data);

      reset();
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed! Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-dark d-flex flex-column justify-content-center align-items-center min-vh-100 text-light">
        <div className="container text-center">
          <h1 className="text-danger fw-bold">Join ShadowLink</h1>
          <p className="text-secondary">Become part of the shadow network.</p>
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
              {...register("username", { required: "Username is required" })}
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-danger small">{errors.username.message}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Email</label>
            <input
              type="email"
              className="form-control bg-secondary text-light border-0"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-danger small">{errors.email.message}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control bg-secondary text-light border-0"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-danger small">{errors.password.message}</p>}
          </div>

          <button type="submit" className="btn btn-danger w-100" disabled={loader}>
            {loader ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
