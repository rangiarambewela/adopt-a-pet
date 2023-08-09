import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
// import ImageUpload from "./components/ImageUpload";
import LandingPage from "./components/landing/LandingPage";
import About from "./about/About";
import Login from "./components/auth/Login";
import RegisterForm from "./components/auth/RegisterForm";
import PrivateRoute from "./components/PrivateRoute";
import Portal from "./components/dashboard/Portal";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />

        {/* <ImageUpload /> */}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterForm />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route
            path="/portal"
            element={
              <PrivateRoute>
                <Portal />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}
