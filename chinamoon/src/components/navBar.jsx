import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        China Moon
      </Link>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item ">
            <NavLink className="nav-link" to="/login">
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/menu">
              Menu List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="#">
              Location
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
