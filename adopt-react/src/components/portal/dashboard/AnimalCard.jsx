import React from "react";
import { useNavigate } from "react-router-dom";
import "./AnimalCard.css";

function AnimalCard({ animal }) {
  const navigate = useNavigate();
  return (
    <div className="animal-card shadow ">
      <img src={animal.image} className="img-fluid " alt="" />
      <div className="p-3">
        <h3 className="text-truncate">{animal.name}</h3>
        <p className="">Age: {animal.age}</p>
        <p className="mb-3">Sex: {animal.sex}</p>
        <button
          className="btn btn-sm action-btn-secondary w-100"
          onClick={() => navigate(`/portal/dogs/${animal.id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default AnimalCard;
