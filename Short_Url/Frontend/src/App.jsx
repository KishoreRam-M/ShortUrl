import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "./App.css";

// Lazy Load Components for Performance
const LandingPage = lazy(() => import("./assets/components/LandingPage"));
const AboutPage = lazy(() => import("./assets/components/AboutPage"));
const Signup = lazy(() => import("./assets/components/Signup"));
const Login = lazy(() => import("./assets/components/Login"));
const Dashboard = lazy(() => import("./assets/components/MainDashBoard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
