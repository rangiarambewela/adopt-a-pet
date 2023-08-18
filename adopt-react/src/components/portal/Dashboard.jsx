import React, { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import AnimalList from "./AnimalList";
import "./Dashboard.css";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dogs, setDogs] = useState([]);

  const getAllDogs = async () => {
    try {
      const response = await axios.get("/api/dogs");
      console.log(response);
      setDogs(response.data);
      setIsLoading(false);
    } catch (e) {
      console.log("ERROR fetching dogs: ", e);
      setDogs(null);
    }
  };
  useEffect(() => {
    console.log("Dashboard loading");
    getAllDogs();
  }, []);

  return (
    <div className="dashboard">
      <h1>Your Animals </h1>
      <div>
        <h2>Dogs</h2>
        <div>
          <AnimalList animals={dogs} />
        </div>
      </div>
      <div>
        <h2>Cats</h2>
        <div>{/* <AnimalList animals={cats} /> */}</div>
      </div>
    </div>
  );
}

export default Dashboard;
