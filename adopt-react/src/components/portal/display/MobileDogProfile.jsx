import React from "react";
import "./MobileDogDisplay.css";

import millie from "../../../assets/millie.jpg";

function MobileDogProfile({ dog }) {
  const computeSize = () => {
    if (dog.size === "small") return "Small";
    else if (dog.size === "medium") return "Medium";
    else if (dog.size === "large") return "Large";
    else return "Extra Large";
  };

  const computeStatus = () => {
    if (dog.status === 0) return "Unavailable";
    else if (dog.status === 1) return "Available";
    else return "Pending";
  };
  return (
    <div className="display-card rounded">
      <img className="profile-picture rounded-top" src={millie} alt="" />
      <div className="p-3">
        <div className="pb-3">
          <p className="profile-info-label text-truncate">Name</p>
          <p className="profile-info-text text-truncate mb-0">{dog.name}</p>
        </div>
        <div className="d-flex justify-content-between py-3 top-separator">
          <div className="col-sm-6 px-0 pe-3 min-width-0">
            <p className="profile-info-label text-truncate">Birthdate</p>
            <p className="profile-info-text text-truncate mb-0">
              {dog.birthdate}
            </p>
          </div>
          <div className=" col-sm-6 px-0 ps-3 left-separator min-width-0">
            <p className="profile-info-label text-truncate">Age</p>
            <p className="profile-info-text text-truncate mb-0">
              {dog.age} years
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-between py-3 top-separator">
          <div className=" col-sm-6 px-0 pe-3 min-width-0">
            <p className="profile-info-label text-truncate">Breed</p>
            <p className="profile-info-text text-truncate mb-0">{dog.breed}</p>
          </div>
          <div className=" col-auto col-sm-6 px-0 ps-3 left-separator min-width-0">
            <p className="profile-info-label text-truncate">Sex</p>
            <p className="profile-info-text text-truncate mb-0">
              {dog.sex === "F" ? "Female" : "Male"}
            </p>
          </div>
        </div>
        <div className="col-auto px-0 pe-3  top-separator py-3">
          <p className="profile-info-label text-truncate">Colour</p>
          <p className="profile-info-text text-truncate mb-0">{dog.color}</p>
        </div>
        <div className="py-3 top-separator">
          <p className="profile-info-label text-truncate">Size</p>
          <p className="profile-info-text text-truncate mb-0">
            {computeSize()}
          </p>
        </div>
        <div className="d-flex justify-content-between py-3 top-separator">
          <div className="col-6 px-0 pe-3 min-width-0">
            <p className="profile-info-label text-truncate">Housetrained</p>
            <p className="profile-info-text text-truncate mb-0">
              {dog.house_trained === true ? "Yes" : "No"}
            </p>
          </div>
          <div className=" col-6 px-0 ps-3 left-separator min-width-0">
            <p className="profile-info-label text-truncate">Good with Kids</p>
            <p className="profile-info-text text-truncate mb-0">
              {dog.good_with_kids === true ? "Yes" : "No"}
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-between py-3 top-separator">
          <div className="col-6 px-0 pe-3 min-width-0">
            <p className="profile-info-label text-truncate">Status</p>
            <p className="profile-info-text text-truncate mb-0">
              {computeStatus()}
            </p>
          </div>
          <div className="col-6 px-0 ps-3 left-separator min-width-0">
            <p className="profile-info-label text-truncate">Adoption Fee ($)</p>
            <p className="profile-info-text text-truncate mb-0">
              {dog.adoption_fee.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="pt-3 top-separator">
          <p className="profile-info-label text-truncate">Intake Date</p>
          <p className="profile-info-text text-truncate mb-0">
            {dog.intake_date}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MobileDogProfile;
