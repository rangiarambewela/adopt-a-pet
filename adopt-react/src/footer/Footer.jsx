import React from "react";
import "./Footer.css";

function Footer() {
  const visitingHoursDescription =
    "AAP has visiting hours, only for cats who are at our shelter. Visiting hours are 2-6pm on Saturday & Sunday. If you'd like to adopt a cat or dog (including one of our special dogs), please apply online and one of our volunteers will contact you.";
  return (
    <div className="footer py-5 px-3 px-lg-5">
      <div className="d-lg-flex  mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <h3 className="footer-title">Visiting Hours</h3>
          <p className="mb-0 py-2">{visitingHoursDescription}</p>
        </div>
        <div className="col px-0 d-lg-flex justify-content-evenly">
          <div className="d-flex flex-column py-3 py-lg-0">
            <h3 className="footer-title">Adoption Links</h3>
            <a href="" className="footer-link">
              Cats For Adoption
            </a>
            <a href="" className="footer-link">
              Dogs for Adoption
            </a>
          </div>
          <div className="d-flex flex-column py-3 py-lg-0">
            <h3 className="footer-title">Support Us</h3>
            <a href="" className="footer-link">
              Donate
            </a>
            <a href="" className="footer-link">
              Our Wish List
            </a>
            <a href="" className="footer-link">
              Host a Fundraiser
            </a>
          </div>
          <div className="d-flex flex-column py-3 py-lg-0">
            <h3 className="footer-title">Get Involved</h3>
            <a href="" className="footer-link">
              Volunteer
            </a>
            <a href="" className="footer-link">
              Foster An Animal
            </a>
            <a href="" className="footer-link">
              Membership
            </a>
          </div>
        </div>
      </div>
      <div className="footer-contact">
        <h5>Visit Us</h5>
        <p className="small">77 Seven Point Road</p>
        <p className="small">Toronto, ON</p>
        <p className="small">A1B 2C3</p>
        <p className="small">+1 (647) 000-0000</p>
      </div>
    </div>
  );
}

export default Footer;
