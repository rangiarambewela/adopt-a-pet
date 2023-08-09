import React from "react";
import puppies from "../../assets/puppies.jpg";

import "./AnnoucementCard.css";

function AnnoucementCard() {
  return (
    <div className="announcement-card shadow">
      <img src={puppies} className="img-fluid card-img" alt="" />
      <div className="p-3">
        <h3>Event Title Temp</h3>
        <p className="mb-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, vel
          in provident maiores ipsa quaerat delectus natus obcaecati maxime
          consectetur dolore ducimus rerum perspiciatis suscipit recusandae
          eveniet commodi tempora minima?
        </p>
        <button className="btn action-btn-secondary w-100">Read More</button>
      </div>
    </div>
  );
}

export default AnnoucementCard;
