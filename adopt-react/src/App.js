import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import LandingPage from "./landing/LandingPage";
import About from "./about/About";
import Footer from "./footer/Footer";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/test")
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      {/* <div>{data["test1"]}</div>
      <div>{data["test2"]}</div> */}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}
