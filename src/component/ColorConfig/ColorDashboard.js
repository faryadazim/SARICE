import React from "react";
import TableForColor from "./TableForColor";

const ColorDashboard = () => {
  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-7">
                <h1 className="m-0 pl-1">HRM SYSTEM - SA Rice Mills Pvt Ltd</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <TableForColor />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ColorDashboard;
