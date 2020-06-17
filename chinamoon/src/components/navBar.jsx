import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link class="navbar-brand" to="#">
        China Moon
      </Link>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li classNames="nav-item ">
            <NavLink className="nav-link" to="/movies">
              About Us
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-link" to="/customers">
              Menu List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/rentals">
              Location
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
