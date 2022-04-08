import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Layout/Loader";
import "./Table.css";

const Table = () => {
  const url = "http://sa-hrm.genial365.com";
  const [data, setdata] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [saveButtonSpin, setsaveButtonSpin] = useState(false)

  // form-control state
  const [deviceIP, setdeviceIP] = useState("");
  const [PORT, setPORT] = useState("");
  const [machineNo, setMachineNo] = useState("");
  const [timeIntervalMin, settimeIntervalMin] = useState("");
  const updateData = async () => {
      setsaveButtonSpin(true)
    const updatedData = {
      device_config_id: data.device_config_id,
      device_ip: deviceIP,
      port: PORT,
      machine_no: machineNo,
      time_interval_min: timeIntervalMin,
    };
    fetch(url + "/api/config", {
      method: "PUT",
      headers: {
        Authorization:
          JSON.parse(localStorage.getItem("authUser")).token_type +
          " " +
          JSON.parse(localStorage.getItem("authUser")).access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        console.log(response);
        setsaveButtonSpin(false)
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetch(url + "/api/config", {
      method: "GET",
      headers: {
        Authorization:
          JSON.parse(localStorage.getItem("authUser")).token_type +
          " " +
          JSON.parse(localStorage.getItem("authUser")).access_token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(
          response.json().then((data) => {
            setdata(data);
            setdeviceIP(data.device_ip);
            setPORT(data.port);
            setMachineNo(data.machine_no);
            settimeIntervalMin(data.time_interval_min);
            setisLoading(false);
          })
        );
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="card card-default">
            <div className="card-header">
              <h3 className="card-title">
                {" "}
                <b> Device Configuration</b>
              </h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i className="fas fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="remove"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <main>
                <div>
                  <div className="card ">
                    <div className="card-body">
                      <form className="form-horizontal">
                        <div className="card-body">
                          <div className="form-group row">
                            <label
                              htmlFor="inputEmail3"
                              className="col-sm-3 col-form-label"
                            >
                              Device IP
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                disabled={!isEdit}
                                className={
                                  isEdit
                                    ? "form-control"
                                    : "form-control form-control-active bg-light"
                                }
                                id="inputEmail3"
                                value={deviceIP}
                                onChange={(e) => setdeviceIP(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputEmail3"
                              className="col-sm-3 col-form-label"
                            >
                              PORT
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                disabled={!isEdit}
                                className={
                                  isEdit
                                    ? "form-control"
                                    : "form-control form-control-active bg-light"
                                }
                                id="inputEmail3"
                                value={PORT}
                                onChange={(e) => setPORT(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputEmail3"
                              className="col-sm-3 col-form-label"
                            >
                              Machine No:
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                disabled={!isEdit}
                                className={
                                  isEdit
                                    ? "form-control"
                                    : "form-control form-control-active bg-light"
                                }
                                id="inputEmail3"
                                value={machineNo}
                                onChange={(e) => setMachineNo(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputEmail3"
                              className="col-sm-3 col-form-label"
                            >
                              Time Interval Mins
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                disabled={!isEdit}
                                className={
                                  isEdit
                                    ? "form-control"
                                    : "form-control form-control-active bg-light"
                                }
                                id="inputEmail3"
                                value={timeIntervalMin}
                                onChange={(e) =>
                                  settimeIntervalMin(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        {/* /.card-body */}
                        <div className="card-footer bg-none">
                          {" "}
                          <section class="button-style">
                            <div class="container ">
                              <div class="row">
                                <div class="col-md-12 col-sm-12 center-col text-right ">
                                  {isEdit ? (
                                    <a
                                      className=" w-15 highlight-button btn btn-small button xs-margin-bottom-five"
                                      data-abc="true"
                                      onClick={() => {
                                          updateData();
                                          setIsEdit(false);
                                      }}
                                    >
                                      <i class="fas fa-save"> </i> 
                                     
                                      Save Changes
                                    </a>
                                  ) : (
                                    <a
                                      className="w-15 highlight-button btn btn-small button xs-margin-bottom-five"
                                      data-abc="true"
                                      onClick={() => setIsEdit(true)}
                                    > 
                                      {saveButtonSpin ? (
                                          <span
                                            class="spinner-border spinner-border-sm mr-2"
                                            role="status"
                                            aria-hidden="true"
                                          ></span>
                                        ) :  <i class="fas fa-edit"> </i>}
                                          
                                          
                                          
                                           Edit Values
                                    </a>
                                  )}{" "}
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                        {/* /.card-footer */}
                      </form>
                    </div>
                  </div>
                </div>

                {/* </div> */}
                {/*MDB Tables*/}
              </main>
            </div>
            {/* /.card-body */}
            {/* <div className="card-footer">
                    Default device configuration
                </div> */}
          </div>
        </>
      )}
    </>
  );
};

export default Table;
