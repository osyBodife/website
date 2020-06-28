import React from "react";
import { Link, NavLink } from "react-router-dom";

const moment = require("moment");

const Footer = () => {
  return (
    <>
      <div className="container" id="footer">
        <div className="row">
          <div className="col-4">
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/aboutus">
                  Location
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/aboutus">
                  Social Meida Connect With Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/aboutus">
                  Private Policy
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/aboutus">
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-4"> &nbsp; </div>
          <div className="col-4">
           <Link to='login'>Management Portal</Link>
          </div>
        </div>
      </div>
      <div className="row" id="copyright">
        <div className="col-2"> </div>
        <div className="col">
          {" "}
          {moment().format("YYYY")} &nbsp; &#169; Elyon Resources, LLC &nbsp;All Rights
          Reserved.
        </div>
        <div className="col-2"> </div>
      </div>
    </>
  );
};

export default Footer;
