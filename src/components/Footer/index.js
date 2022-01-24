import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import {
  faCloud,
  faHome,
  faListUl,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <nav className="nav-menu">
          <ul>
            <li>
              <NavLink to="/">
                <FontAwesomeIcon icon={faHome} />
                Main
              </NavLink>
            </li>
            <li>
              <NavLink to="/news">
                <FontAwesomeIcon icon={faNewspaper} />
                News
              </NavLink>
            </li>
            <li>
              <NavLink to="/weather">
                <FontAwesomeIcon icon={faCloud} />
                Weather
              </NavLink>
            </li>
            <li>
              <NavLink to="/tasks">
                <FontAwesomeIcon icon={faListUl} />
                Tasks
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
