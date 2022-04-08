import React, { useEffect, useState } from "react";
import axios from "axios";
import "./employeeData.css";
import Modal from "./Modal";
import Loader from "../Layout/Loader";
import NewCom from "./NewCom.js";
import { DateConverter } from "../../services/dateTimeCoverter";

const EmployInfoTable = React.forwardRef((props, ref) => {
  const url = "http://sa-hrm.genial365.com";
  // States 
  const [openModel, setOpenModel] = useState(false);
  const [currentID, setCurrentID] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [employePerson, setEmployePerson] = useState({
    Name: "",
    cell_no: "",
    cnic: "",
    monthly_salary: "",
    joining_date: "",
    holidays_allowed_monthly: "",
    food_allowence: "",
    other_allowence: "",
    job_status: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [valueForNewComponent, setvalueForNewComponent] = useState([]);
  // Job Status Update
  const updateEmployJobStatus = (employ) => {
    var convertedEmployStatus;
    if (employ.job_status === "true") {
      convertedEmployStatus = "false";
    } else {
      convertedEmployStatus = "true";
    }

    fetch(
      url +
        `/api/Employees/job-status?status=${convertedEmployStatus}&UserInfo1_id=${employ.UserInfo1_id}`,
      {
        method: "PUT",
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
        fetchDatafromServer();
      })
      .catch((error) => console.log("error", error));
  };


// Edit Model 
  const editEmployData = (employ) => {
    setOpenModel(true);
    setCurrentID(employ.UserInfo1_id);
    setEmployePerson({
      Name: employ.Name,
      cell_no: employ.cell_no,
      cnic: employ.cnic,
      monthly_salary: employ.monthly_salary,
      joining_date: employ.joining_date,
      holidays_allowed_monthly: employ.holidays_allowed_monthly,
      food_allowence: employ.food_allowence,
      other_allowence: employ.other_allowence,
      job_status: employ.job_status,
      address: employ.address,
      attachments: employ.attachments,
    });
  };

  // Fetch server call 
  const fetchDatafromServer = async () => {
    await fetch(url + "/api/Employees", {
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
        response.json().then((data) => {
          setEmployeeData(data);
          setIsLoading(false);
        });
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchDatafromServer();
  }, []);

  if (!openModel) {
    if (isLoading) {
      return <Loader />;
    }

    return (
      <div>
        <NewCom
          show={modalShow}
          valueForNewComponent={valueForNewComponent}
          onHide={() => setModalShow(false)}
        />
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex justify-content-between">
                    <div className="col-md-6">
                      <h3 className="card-title">
                        <b> EMPLOYEES DATA </b>{" "}
                      </h3>
                    </div>
                    <div className="col-md-6 text-right pr-4">
                      <a
                        className="highlight-button btn btn-small button print-button xs-margin-bottom-five p-2"
                        data-abc="true"
                        onClick={() => {
                          setIsLoading(true);
                          fetchDatafromServer();
                        }}
                      >
                        Reload &nbsp;&nbsp;
                        <i class="fa fa-retweet" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                  <div className="card-body table-responsive card-body-remove-padding">
                    <div ref={ref} className="tableResponsiveNes">
                      <div className="container mt-3 employInfoPrint">
                        <h2 className="sariceHeading">
                          {" "}
                          SA RICE PVT LIMITTED FAISALABAD
                        </h2>
                      </div>
                      <table
                        id="example1"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th width="4%" className="text-center">
                              <b>#</b>
                            </th>
                            <th width="8%">Name</th>
                            <th width="10%" className="text-center">
                              Cell No
                            </th>
                            <th width="14%" className="text-center">
                              CNIC{" "}
                            </th>
                            <th width="18%" className="text-center">
                              Monthly Salary
                            </th>
                            <th width="14%" className="text-center">
                              Join Date
                            </th>
                            <th width="8%" className="text-center">
                              Holiday Allowed
                            </th>
                            <th width="8%" className="text-center">
                              Food Allowence
                            </th>
                            <th width="8%" className="text-center">
                              Other Allowence
                            </th>
                            <th
                              width="8%"
                              className="text-center noInfoInPrint"
                            >
                              Job Status
                            </th>
                            <th className="text-center noInfoInPrint">Att..</th>
                            <th width="8% noInfoInPrint">Edit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employeeData.map((employ, index) => {
                            return (
                              <tr key={employ.UserInfo1_id}>
                                <td className="text-center">
                                  <b>{index + 1}</b>
                                </td>{" "}
                                <td width="40%">
                                  {employ.Name === "" || employ.Name == null
                                    ? employ.UserInfo1_id
                                    : employ.Name}
                                </td>
                                <td className="text-center">
                                  {employ.cell_no === "" ||
                                  employ.cell_no == null
                                    ? "--"
                                    : employ.cell_no}
                                </td>
                                <td className="text-center">
                                  {employ.cnic == null ? "--" : employ.cnic}
                                </td>
                                <td className="text-center">
                                  {employ.monthly_salary === null
                                    ? "--"
                                    : employ.monthly_salary}
                                </td>
                                <td className="text-center">
                                  {DateConverter(employ.joining_date) === "NAN"
                                    ? "--"
                                    : DateConverter(employ.joining_date)}
                                </td>
                                <td className="text-center">
                                  {employ.holidays_allowed_monthly == null
                                    ? "--"
                                    : employ.holidays_allowed_monthly}
                                </td>
                                <td className="text-center">
                                  {employ.food_allowence == null
                                    ? "--"
                                    : employ.food_allowence}
                                </td>
                                <td className="text-center">
                                  {employ.other_allowence == null
                                    ? "--"
                                    : employ.other_allowence}
                                </td>
                                <td>
                                  <div className="container" key={index}>
                                    <div className="toggle-switch">
                                      <input
                                        type="checkbox"
                                        className={`checkbox ${employ.UserInfo1_id}`}
                                        name="label"
                                        id={`label${employ.UserInfo1_id}`}
                                        onChange={() => {
                                          updateEmployJobStatus(employ);

                                          setIsLoading(true);
                                          fetchDatafromServer();
                                        }}
                                        checked={
                                          employ.job_status == "true"
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        className="label"
                                        htmlFor={`label${employ.UserInfo1_id}`}
                                      >
                                        <span className="inner" />
                                        <span className="switch" />
                                      </label>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-center">
                                  <a
                                    className="editsheet-button btn btn-small button "
                                    data-abc="true"
                                    onClick={() => {
                                      setvalueForNewComponent(employ);
                                      setModalShow(true);
                                    }}
                                  >
                                    <i className="fa fa-paperclip"></i>
                                  </a>
                                </td>
                                <td>
                                  <a
                                    className="editsheet-button btn btn-small button "
                                    data-abc="true"
                                    onClick={() => {
                                      editEmployData(employ);
                                    }}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  return (
    <Modal
      closeModel={setOpenModel}
      currentID={currentID}
      employePerson={employePerson}
      setEmployePerson={setEmployePerson}
      fetchDatafromServer={fetchDatafromServer}
      setCurrentID={setCurrentID}
    />
  );
});

export default EmployInfoTable;
