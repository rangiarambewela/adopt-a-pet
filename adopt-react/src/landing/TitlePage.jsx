import React from "react";
import "./TitlePage.css";

export default function TitlePage() {
  const subtitle =
    "The Adopt-a-Pet Society is an independent, all-volunteer, no-kill shelter.";
  return (
    <div className="title-page vh-100 d-flex align-items-center">
      <div className="px-3 px-lg-5 d-flex flex-column">
        <h1 className="mb-0 pb-1">
          WE PUT OUR <br />
          ANIMALS FIRST.
        </h1>
        <p className="d-md-none">{subtitle}</p>
        <h5 className=" d-none mb-0 pb-3 d-md-block ">{subtitle}</h5>
        <div className="py-3 d-flex flex-wrap">
          <button
            type="button"
            className="btn  btn-adopt col-12 col-md-4 px-0 me-md-3 py-2 mb-3 mb-md-0"
          >
            Adopt a Dog
          </button>
          <button
            type="button"
            className="btn  btn-adopt col-12 col-md-4 px-0 py-2"
          >
            Adopt a Cat
          </button>
        </div>
      </div>
    </div>
  );
}
