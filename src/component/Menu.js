import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.jpg";
import admin from "../images/useradmin.jpg";

const Menu = () => {
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <NavLink className="brand-link" to="/">
          <img
            src={logo}
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
          />
          <span className="brand-text font-weight-light ">SARICE</span>
        </NavLink>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={admin}
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a className="d-block">
                <strong>Welcome</strong> Admin
              </a>
            </div>
          </div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <a className="nav-link NavLinkactive">
                  <i className="nav-icon fa fa-home" />
                  <p>
                    Home
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink to="/" className="nav-link  ">
                      <i className="  nav-icon fas fa-tachometer-alt"></i>

                      <p>Dashboard</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="colorconfig" className="nav-link   ">
                      <i className="fa fa-crosshairs ml-1"></i>
                      <p className="pl-2">Color Config</p>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item  ">
                <a className="nav-link NavLinkactive">
                  <i className="nav-icon nav-icon fas fa-book" />
                  <p>
                    Employ Management
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink to="info" className="nav-link  ">
                      <i className="  nav-icon nav-icon fas fa-table"></i>
                      <p>Employee Info</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="attendence" className="nav-link  ">
                      <i className="  nav-icon nav-icon fas fa-table"></i>
                      <p>Attendence</p>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item  ">
                <a className="nav-link NavLinkactive">
                  <i className="nav-icon nav-icon  fa fa-user" />
                  <p>
                    Setting
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink to="login" className="nav-link  ">
                      <i className="  nav-icon nav-icon fas fa-table"></i>
                      <p>Login</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="log" className="nav-link">
                      {" "}
                      <i className="  nav-icon nav-icon fas fa-file"></i>{" "}
                      <p>Logs</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="config" className="nav-link">
                      {" "}
                      <i className="  nav-icon fas fa-ellipsis-h"></i>{" "}
                      <p>Device Config</p>
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};
export default Menu;
