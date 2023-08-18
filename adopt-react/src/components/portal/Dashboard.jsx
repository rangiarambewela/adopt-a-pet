import React, { useContext, useEffect } from "react";
import AnimalList from "./AnimalList";
import "./Dashboard.css";

function Dashboard() {
  const dogs = [
    {
      name: "Puppies",
      image: "",
      age: 0,
      sex: "Male",
    },
    {
      name: "Millie",
      image: "",
      age: 3,
      sex: "Female",
    },
  ];

  const cats = [
    {
      name: "Kittens",
      image: "",
      age: 0,
      sex: "Male",
    },
    {
      name: "Lola",
      image: "",
      age: 3,
      sex: "Female",
    },
  ];
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
        <div>
          <AnimalList animals={cats} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
