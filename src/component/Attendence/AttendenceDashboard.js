import React, { useRef } from "react";
import EmployAttendence from "./EmployAttendence.js";
import ReactToPrint from "react-to-print";

const AttendenceDashboard = () => {
  const componentRef = useRef();
  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-10 ">
                <h1 className="m-0 pl-1">HRM SYSTEM - SA Rice Mills Pvt Ltd</h1>
              </div>
              <div className="col-sm-2 ">
                <ReactToPrint
                  trigger={() => (
                    <a
                      class="highlight-button btn btn-small button print-button xs-margin-bottom-five"
                      data-abc="true"
                    >
                      Print &nbsp;&nbsp;<i class="fa fa-print"></i>
                    </a>
                  )}
                  content={() => componentRef.current}
                />
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="">
              <EmployAttendence ref={componentRef} />{" "}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AttendenceDashboard;
