import React from "react";

import AnnoucementCard from "./AnnoucementCard";

export default function Annoucements() {
  return (
    <div className="p-3 px-lg-5">
      <h2>Events & Announcements</h2>
      <div className="row  ">
        <div className="col-md-6 col-lg-4 p-3">
          <AnnoucementCard />
        </div>
        <div className="col-md-6 col-lg-4 p-3">
          <AnnoucementCard />
        </div>
        <div className="col-md-6 col-lg-4 p-3">
          <AnnoucementCard />
        </div>
        <div className="col-md-6 col-lg-4 p-3">
          <AnnoucementCard />
        </div>
      </div>
    </div>
  );
}
