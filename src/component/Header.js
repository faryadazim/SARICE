import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ setisLogin }) => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
          <li className="nav-item " style={{ marginRight: "60px" }}>
            <a
              className="  highlight-button btn btn-small button xs-margin-bottom-five"
              data-abc="true"
              onClick={() => {
                window.localStorage.clear();
                setisLogin(false);
                navigate("/");
              }}
            >
              Logout
              <i class="pl-2 fa fa-user"> </i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
