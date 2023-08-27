import React from "react";
import AnimalCard from "./AnimalCard";

function AnimalList({ animals }) {
  return (
    <div className="d-flex flex-wrap ">
      {animals.map((animal) => {
        return (
          <AnimalCard animal={animal} key={`${animal.type}${animal.id}`} />
        );
      })}
    </div>
  );
}

export default AnimalList;
