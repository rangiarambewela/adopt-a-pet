import React from "react";
import "./DirectorCard.css";

function DirectorCard(props) {
  return (
    <div className="shadow h-100 director-card">
      <img src={props.image} className="img-fluid director-img w-100" alt="" />
      <div className="p-3">
        <h4>First LastName</h4>
        <p className="mb-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, vel
          in provident maiores ipsa quaerat delectus natus obcaecati. Biography.
        </p>
      </div>
    </div>
  );
}

export default DirectorCard;
