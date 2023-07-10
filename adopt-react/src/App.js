import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import TitlePage from "./landing/TitlePage";
import WaysToHelp from "./landing/WaysToHelp";
import Annoucements from "./landing/Annoucements";

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
      <TitlePage />
      <WaysToHelp />
      <Annoucements />
    </div>
  );
}
