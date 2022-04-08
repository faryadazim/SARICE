import React, { useState, useEffect, useRef } from "react";
import Loader from "../Layout/Loader.js";
import MultiSelectAll from "./MultiSelectAll.js";

import DatePicker from "react-date-picker";
import { convertDateForapi } from "../../services/convertDateForapi.js";
import {
  DateConverter,
  TimeConverter,
} from "../../services/dateTimeCoverter.js";

const EmployAttendence = React.forwardRef((props, ref) => {
  // Date Validation
  const [colorIn, setcolorIn] = useState("#74FF33");
  const [colorOut, setcolorOut] = useState("#FFD133");
  var today = new Date();
  var mint = today.getMinutes().toString();
  var hours = today.getHours().toString();
  var secs = today.getSeconds().toString();

  if (hours.length === 1) {
    hours = `0${hours}`;
  } else {
    hours = hours;
  }

  if (mint.length === 1) {
    mint = `0${mint}`;
  } else {
    mint = mint;
  }
  if (secs.length === 1) {
    secs = `0${secs}`;
  } else {
    secs = secs;
  }
  var time = hours + ":" + mint + ":" + secs;
  console.log(hours + ":" + mint + ":" + secs);

  const [isLoading, setIsLoading] = useState(true);
  const [employToBeSearch, setemployToBeSearch] = useState("-1");
  const [employToBeSearchName, setemployToBeSearchName] = useState("All");
  const [noDataAvailable, setnoDataAvailable] = useState(false);

  // Date fetch from machine
  const [firstDate, setFirstDate] = useState(new Date());
  const [lastDate, setLastDate] = useState(new Date());

  const [fromTime, setfromTime] = useState("00:00");
  const [toTime, settoTime] = useState(time.slice(0, 5));

  const [neverRender, setneverRender] = useState();

  // converted dadte
  const [firstDateRender, setfirstDateRender] = useState(
    convertDateForapi(firstDate).slice(0, 10)
  );
  const [lastDateRender, setlastDateRender] = useState(
    convertDateForapi(lastDate).slice(0, 10)
  );

  const [allUserAttendenceDate, setallUserAttendenceDate] = useState([]);

  const searchEventFunc = () => {
    setIsLoading(true);
    // console.log(
    //   "Search",
    //   employToBeSearch,
    //   ">>",
    //   employToBeSearchName,
    //   " >>",
    //   lastDate,
    //   firstDate,
    //   ">>>>",
    //   "______________",
    //   fromTime,
    //   "___",
    //   toTime,
    //   "___",
    //   lastDateRender,
    //   "___",
    //   firstDateRender
    // );

    firstTimefetchAllUSerData(
      employToBeSearch,
      fromTime,
      toTime,
      firstDateRender,
      lastDateRender
    );
  };

  // First Time Fetch All Data
  const firstTimefetchAllUSerData = (
    passedId,
    fromTime,
    toTime,
    firstDateRender,
    lastDateRender
  ) => {
    const InputDate = `${firstDateRender}T${fromTime}:00`;
    const outPutDate = `${lastDateRender}T${toTime}:00`;
    console.log("input & outPut ", InputDate, outPutDate);
    console.log("which id to be search =>", passedId);
    fetch(
      `http://sa-hrm.genial365.com/api/Attandance/EmployeesAttandance?EnrollmentNoQomaSep=${passedId}&dtFrom=${InputDate}&dtTo=${outPutDate}`,
      {
        method: "GET",
        headers: {
          Authorization:
            JSON.parse(localStorage.getItem("authUser")).token_type +
            " " +
            JSON.parse(localStorage.getItem("authUser")).access_token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => {
        console.log(
          response.json().then((data) => {
            setallUserAttendenceDate(data);
            setIsLoading(false);
            if (data.length === 0) {
              setnoDataAvailable(true);
            } else {
              setnoDataAvailable(false);
            }
          })
        );
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    fetch("http://sa-hrm.genial365.com/api/colors", {
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
            setcolorIn(data.in_color);
            setcolorOut(data.out_color);
          })
        );
      })
      .catch((error) => console.log("error", error));

    firstTimefetchAllUSerData(
      employToBeSearch,
      fromTime,
      toTime,
      firstDateRender,
      lastDateRender
    );
  }, [neverRender]);

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div>
                    <div className="row">
                      <div className="col-md-2  d-flex align-items-center justify-content-center">
                        <MultiSelectAll
                          setemployToBeSearch={setemployToBeSearch}
                          setemployToBeSearchName={setemployToBeSearchName}
                        />
                      </div>
                      <div className="col-md-4  ">
                        <div className="d-flex justify-content-around mt-1">
                          <b> From Date</b>
                          <DatePicker
                            onChange={(e) => {
                              setFirstDate(e);
                              setfirstDateRender(
                                convertDateForapi(e).slice(0, 10)
                              );
                            }}
                            value={firstDate}
                          />
                        </div>
                        <div className=" mt-2 d-flex justify-content-around my-1">
                          <b> To Date &nbsp;&nbsp;&nbsp;&nbsp;</b>
                          <DatePicker
                            onChange={(e) => {
                              setLastDate(e);
                              setlastDateRender(
                                convertDateForapi(e).slice(0, 10)
                              );
                            }}
                            value={lastDate}
                          />
                        </div>
                      </div>
                      <div className="col-md-4   d-flex flex-column">
                        <div className="text-center d-flex justify-content-center mt-1">
                          <label htmlFor="timeToIn">Time From</label>
                          <input
                            type="time"
                            id="timeToIn"
                            className="mx-3 form-control form-control-sm w-50"
                            name="appt"
                            min="09:00"
                            max="18:00"
                            value={fromTime}
                            onChange={(e) => setfromTime(e.target.value)}
                          ></input>
                        </div>
                        <div className="text-center d-flex justify-content-center my-1">
                          <label htmlFor="timeToOut">
                            Time To &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                          </label>
                          <input
                            className="form-control w-50 form-control-sm mx-3"
                            type="time"
                            id="timeToOut"
                            name="appt"
                            min="09:00"
                            max="18:00"
                            value={toTime}
                            onChange={(e) => settoTime(e.target.value)}
                          ></input>
                        </div>
                      </div>
                      <div className="col-md-2 text-center my-auto ">
                        <a
                          class="highlight-button btn btn-small button xs-margin-bottom-five"
                          data-abc="true"
                          onClick={() => searchEventFunc()}
                        >
                          Search &nbsp;&nbsp;<i class="fa fa-search"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div ref={ref}>
                  <div className="container mt-3 employInfoPrint">
                    <h2 className="sariceHeading">
                      {" "}
                      SA RICE PVT LIMITTED FAISALABAD
                    </h2>
                    <div className="row">
                      <table className="table container">
                        <thead>
                          <tr>
                            <th scope="col">
                              Employ Name :
                              {employToBeSearch == "-1" ? (
                                <>All</>
                              ) : (
                                <>{employToBeSearchName}</>
                              )}
                            </th>
                            <th scope="col">
                              From Date:{" "}
                              {DateConverter(
                                `${firstDateRender}T${fromTime}:00`
                              )}
                              /
                              {TimeConverter(
                                `${firstDateRender}T${fromTime}:00`
                              )}{" "}
                            </th>
                            <th scope="col">
                              To Date :{" "}
                              {DateConverter(
                                `${lastDateRender}T${fromTime}:00`
                              )}
                              /
                              {TimeConverter(`${firstDateRender}T${toTime}:00`)}
                            </th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-body  card-body-remove-padding">
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div className="tableResponsiveNesAttendence">
                        <table id="example1" className="table table-bordered ">
                          <thead>
                            <tr>
                              <th className="text-center">#</th>
                              <th className="text-center">Name</th>
                              <th className="text-center">CNIC</th>
                              <th className="text-center">Date</th>
                              <th className="text-center">Check In/Out</th>
                            </tr>
                          </thead>

                          {noDataAvailable ? (
                            <tr>
                              <td colspan="5">
                                {" "}
                                <div className=" noDataAvailableClass">
                                  No Data Available{" "}
                                </div>
                              </td>
                            </tr>
                          ) : (
                            <>
                              {" "}
                              <tbody>
                                {allUserAttendenceDate.map(
                                  (eachUser, index) => {
                                    return (
                                      <>
                                        <tr
                                          key={index}
                                          className="testingColor"
                                          style={
                                            eachUser.attandanceDetail
                                              .dwInOutMode == "0"
                                              ? { backgroundColor: colorIn }
                                              : { backgroundColor: colorOut }
                                          }
                                        >
                                          <td className="text-center">
                                            {index + 1}
                                          </td>
                                          <td className="text-center">
                                            {eachUser.userDetail.Name === ""
                                              ? eachUser.userDetail.UserInfo1_id
                                              : eachUser.userDetail.Name}
                                          </td>
                                          <td className="text-center">
                                            {eachUser.userDetail.cnic}
                                          </td>
                                          <td className="text-center">
                                            {DateConverter(
                                              eachUser.attandanceDetail
                                                .DateOnlyRecord
                                            )}{" "}
                                            {TimeConverter(
                                              eachUser.attandanceDetail
                                                .TimeOnlyRecord
                                            )}
                                          </td>

                                          <td className="text-center">
                                            {eachUser.attandanceDetail
                                              .dwInOutMode == "0" ? (
                                              <>Check Out</>
                                            ) : (
                                              <>Check In</>
                                            )}
                                          </td>
                                        </tr>
                                      </>
                                    );
                                  }
                                )}
                              </tbody>
                            </>
                          )}
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default EmployAttendence;
