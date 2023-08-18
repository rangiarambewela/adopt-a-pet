import React from "react";
import "./AnimalCard.css";
import puppies from "../../assets/puppies.jpg";

function AnimalCard({ animal }) {
  return (
    <div className="animal-card shadow ">
      <img src={puppies} className="img-fluid " alt="" />
      <div className="p-3">
        <h3>{animal.name}</h3>
        <p className="">Age: {animal.age}</p>
        <p className="mb-3">Sex: {animal.sex}</p>
        <button className="btn btn-sm action-btn-secondary w-100">
          View Details
        </button>
      </div>
    </div>
  );
}

export default AnimalCard;
