import React from "react";

const Footer = () => {
  return (
    <div>
      <footer
        className="main-footer"
        style={{ paddingTop: "8px", paddingBottom: "8px" }}
      >
        Copyright © 2022{" "}
        <a href="https://www.technupur.com" target="_blank">
          <b>Technupur</b>
        </a>
        . All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          Version 1.0.0
        </div>
      </footer>
    </div>
  );
};

export default Footer;
