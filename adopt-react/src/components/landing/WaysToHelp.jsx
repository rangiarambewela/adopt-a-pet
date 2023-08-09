import React from "react";

import kitten_basket from "../../assets/kitten_basket.jpg";
export default function WaysToHelp() {
  const fundingInfo =
    "Every dollar we raise goes directly into animal care and operations. We do not receive government funding and rely solely on the financial donations and continued support from our community and supporters.";
  return (
    <div className="p-3 px-lg-5 d-md-flex align-items-center gap-md-3 gap-lg-5">
      <div className="d-none d-md-block">
        <img src={kitten_basket} alt="" className="img-fluid img-round" />
      </div>
      <div className=" ">
        <div className="">
          <h2>Help Us Save Animals</h2>
          <p className="pb-3">{fundingInfo}</p>
        </div>
        <div className=" d-flex flex-column">
          <button className="btn action-btn-primary py-2">Donate</button>
          <button className="btn action-btn-secondary py-2">
            Foster An Animal
          </button>
          <button className="btn action-btn-secondary py-2">Volunteer</button>
        </div>
      </div>
    </div>
  );
}
