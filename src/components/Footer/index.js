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
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink to="/news">
                <FontAwesomeIcon icon={faNewspaper} />
                Новости
              </NavLink>
            </li>
            <li>
              <NavLink to="/weather">
                <FontAwesomeIcon icon={faCloud} />
                Погода
              </NavLink>
            </li>
            <li>
              <NavLink to="/tasks">
                <FontAwesomeIcon icon={faListUl} />
                Задачи
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
