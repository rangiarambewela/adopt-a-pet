import React from "react";
import "./About.css";
import about_us_img from "../../assets/about-us.jpeg";
import DirectorCard from "./DirectorCard";
import director1 from "../../assets/director1.jpg";
import director2 from "../../assets/director2.jpg";
import director3 from "../../assets/director3.jpg";

function About() {
  const about_us_p1 =
    "The Adopt-a-Pet Society (APS) is an independent, all-volunteer, federally registered charity serving the Greater Toronto Area since 1987.";
  const about_us_p2 =
    "APS began over 30 years ago as the Adopt-a-Pet Welfare Society (APWS) and subsequently became a registered charity, registered as the Adopt-a-Pet Society. As a federally registered charity, APS operates entirely from donations and our own fundraising efforts.";
  const about_us_p3 =
    "APS is an independent shelter. Our operations are not administered by nor funded by the OSPCA, the Toronto Humane Society, the City of Toronto Animal Services nor any other organization. APS operations are overseen by a volunteer board of directors. Everyone involved at APS is a volunteer, including our board of directors, shelter volunteers, office volunteers and program coordinators. APS has no paid employees.";
  return (
    <div className="p-3 px-lg-5">
      <div className="d-flex flex-column flex-md-row gap-md-3 gap-lg-5 align-items-md-center pb-3 pb-lg-5 page-padding">
        <div>
          <h1>About Us</h1>
          <p className="pb-3">{about_us_p1}</p>
          <p className="pb-3">{about_us_p2}</p>
          <p className="pb-3">{about_us_p3}</p>
        </div>
        <img src={about_us_img} className="col-12 col-md-5 about-img" />
      </div>
      <div>
        <h1>What We Do</h1>
        <p className="pb-3">
          At APS we care for dogs and cats who are looking for forever homes.
        </p>
        <p className="pb-3">
          We are a small shelter with a big heart, with space in our shelter for
          approximately 30 to 40 cats and nine dogs. We also rely on foster
          homes to expand our capacity.
        </p>
        <p className="pb-3">
          APS does not euthanize any animal due to lack of space. Euthanasia is
          only considered in the rare instances when a vet determines that it
          would be the only humane alternative.
        </p>
        <p className="pb-3">
          We are completely dedicated to the well-being of our animals and take
          extra steps to ensure they receive the care they need. This includes
          veterinary care and special training for animals with behavioural
          issues. For dogs, this can include spending time at a training
          facility where they have access to one on one time with expert
          trainers.
        </p>
        <p className="pb-3">
          Our Sanctuary Program is a special program for animals that are
          dealing with chronic illnesses or who may be considered palliative. We
          place these animals in foster homes where they can live out their days
          in the comfort of a home environment. We continue to cover the costs
          of their care through a special Sanctuary fund.
        </p>
      </div>
      <div>
        <h1>Our Governance</h1>
        <p className="pb-3">
          The Board of Directors is the governance body of the Adopt-a-Pet
          Society. On behalf of the community, and representing its members, the
          board provides strategic direction, oversight and links to the
          community for the organization to be successful in achieving its
          mission and goals.
        </p>
        <p className="pb-3">
          The role of the Board of Directors is to provide leadership and
          oversight of the activities at APS while balancing the needs of the
          organization. Board members are elected at the Annual General Meeting
          which is held within the first six months of each calendar year.
        </p>
      </div>
      <div>
        <h2>Board of Directors</h2>
        <div className="row  ">
          <div className="col-md-6 col-lg-4 p-3">
            <DirectorCard image={director1} />
          </div>
          <div className="col-md-6 col-lg-4 p-3">
            <DirectorCard image={director2} />
          </div>
          <div className="col-md-6 col-lg-4 p-3">
            <DirectorCard image={director3} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
