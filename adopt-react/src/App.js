import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Navbar from "./components/navbar/Navbar";
import BrowseLayout from "./components/footer/BrowseLayout";
// import ImageUpload from "./components/ImageUpload";
import LandingPage from "./components/landing/LandingPage";
import About from "./components/about/About";
import Login from "./components/auth/Login";
import RegisterForm from "./components/auth/RegisterForm";
import PrivateRoute from "./components/PrivateRoute";
import Portal from "./components/portal/Portal";
import Dashboard from "./components/portal/dashboard/Dashboard";
import NewDogForm from "./components/portal/create/DogForm";
import DisplayDog from "./components/portal/display/DisplayDog";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />

        {/* <ImageUpload /> */}

        <Routes>
          <Route path="/" element={<BrowseLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            {/* <Route path="register" element={<RegisterForm />} /> */}
          </Route>

          <Route
            path="portal"
            element={
              <PrivateRoute>
                <Portal />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dogs/new" element={<NewDogForm />} />
            <Route path="dogs/:id" element={<DisplayDog />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}
