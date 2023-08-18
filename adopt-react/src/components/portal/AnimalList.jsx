import React from "react";
import AnimalCard from "./AnimalCard";

function AnimalList({ animals }) {
  return (
    <div className="d-flex ">
      {animals.map((animal) => {
        return <AnimalCard animal={animal} />;
      })}
    </div>
  );
}

export default AnimalList;
