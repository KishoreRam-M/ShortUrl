import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./assets/components/LandingPage";
import AboutPage from "./assets/components/AboutPage";
import Signup from "./assets/components/Signup";
import Login from "./assets/components/Login";
import React from "react";

import Dashboard from "./assets/components/MainDashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Added Dashboard Route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
