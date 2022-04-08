import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./Model.css";

const Modal = ({
  closeModel,
  currentID,
  employePerson,
  setEmployePerson,
  fetchDatafromServer,
  setCurrentID,
}) => {
  console.log(employePerson.attachments, "attavhment");
  const url = "http://sa-hrm.genial365.com";
  const [pdfAttachment, setPdfAttachment] = useState("");
  const [progressBarNow, setprogressBarNow] = useState(0);
  const [showProgressBar, setshowProgressBar] = useState(false);
  const [arrayList, setArrayList] = useState([]);
  const [jobStatusSelect, setjobStatusSelect] = useState("false");
  const [actualAttachment, setactualAttachment] = useState(
    employePerson.attachments
  );

  var dateNullIssueSolve =
    employePerson.joining_date == null
      ? "2000-01-01"
      : employePerson.joining_date.slice(0, 10);
  const [joinDate, setjoinDate] = useState(dateNullIssueSolve);
  const [showButtonUpload, setshowButtonUpload] = useState(false);

  var arrayList1 = [];

  // File Handle
  const fileHandle = (e) => {
    setprogressBarNow(0);
    console.log(e.target.files);
    setPdfAttachment([...e.target.files]);
    setshowButtonUpload(true);
  };

  // Job Status Update
  const updateJobStatusApi = (status) => {
    fetch(
      url +
        `/api/Employees/job-status?status=${status}&UserInfo1_id=${currentID}`,
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
      .then((response) => {})
      .catch((error) => console.log("error", error));
    fetchDatafromServer();
  };

  // Update In Server DataBase
  const savePDF = async (e) => {
    e.preventDefault();
    setprogressBarNow(0);
    setshowProgressBar(true);

    for (let i = 0; i < pdfAttachment.length; i++) {
      var myHeaders = new Headers();
      myHeaders.append("contentType", "false");
      myHeaders.append("processData", "false");
      var formdata = new FormData();
      formdata.append("UploadedImage", pdfAttachment[i]);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      //   ///api/Employees/attach-files
      await fetch("http://sa-hrm.genial365.com/api/FileUpload", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          arrayList1.push(result.replace(/['"]+/g, ""));
          setprogressBarNow(Math.round((i * 100) / pdfAttachment.length));
          if (i == pdfAttachment.length - 1) {
            setprogressBarNow(100);
          }
        })
        .catch((error) => console.log("error", error));
    }

    console.log(arrayList1);
    // await setArrayList(arrayList1);
    console.log();
    var oldAttachment;
    var valueToBeParse;
    if (
      employePerson.attachments === null ||
      employePerson.attachments === undefined ||
      employePerson.attachments === ""
    ) {
      valueToBeParse = arrayList1.toString();
    } else {
      valueToBeParse =
        arrayList1.toString() + "," + actualAttachment.toString();
    }
    setactualAttachment(valueToBeParse);
    fetch(
      url +
        `/api/Employees/attach-files?filesPathsQomaSep=${valueToBeParse}&UserInfo1_id=${currentID}`,
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
        console.log(response, "File uploaded succes fully ", response);
        setactualAttachment(valueToBeParse);
      })
      .catch((error) => console.log("error", error));
    // setprogressBarNow(0);
  };
  // Submittion of all record
  const onSubmit = async (e) => {
    console.log(arrayList);
    e.preventDefault();
    closeModel(false);
    const updatedBody = {
      UserInfo1_id: currentID,
      Name: employePerson.Name,
      cell_no: employePerson.cell_no,
      cnic: employePerson.cnic,
      address: employePerson.address,
      attachments: actualAttachment,
      joining_date: `${joinDate}T00:00:00`,
      monthly_salary: employePerson.monthly_salary,
      holidays_allowed_monthly: employePerson.holidays_allowed_monthly,
      food_allowence: employePerson.food_allowence,
      other_allowence: employePerson.other_allowence,
      job_status: jobStatusSelect,
      designation: "",
      reference: "",
    };
    console.log(updatedBody);
    fetch(url + "/api/Employees", {
      method: "PUT",
      headers: {
        Authorization:
          JSON.parse(localStorage.getItem("authUser")).token_type +
          " " +
          JSON.parse(localStorage.getItem("authUser")).access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBody),
    })
      .then((response) => {
        console.log(response, "passed");
      })
      .catch((error) => console.log("error", error));

    setEmployePerson({
      Name: "",
      cell_no: "",
      cnic: "",
      monthly_salary: "",
      joining_date: "",
      holidays_allowed_monthly: "",
      food_allowence: "",
      other_allowence: "",
      job_status: null,

      // use here ""  if any error
    });
    setCurrentID("");
    fetchDatafromServer();
  };

  // Docs Deletes
  const deleteSelectedDoc = (itemToDelete) => {
    const ArrrayOfAttachment = actualAttachment.split(",");
    var attachmentUpdatedAfterDelete = ArrrayOfAttachment.filter(
      (itemTobeDelete) => {
        return itemToDelete !== itemTobeDelete;
      }
    );
    fetch(
      url +
        `/api/Employees/attach-files?filesPathsQomaSep=${attachmentUpdatedAfterDelete}&UserInfo1_id=${currentID}`,
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
        setactualAttachment(attachmentUpdatedAfterDelete.join());
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    setjobStatusSelect(
      employePerson.job_status === null ? "false" : employePerson.job_status
    );
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className=" ">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-dark">
                  <div className="card-header d-flex justify-content-between">
                    <div className="col-md-6">
                      <h3 className="card-title">
                        <b> Customized Config </b>
                      </h3>
                    </div>
                    <div className="col-md-6 text-right">
                      <button
                        className="btn btn-sm btn-danger  w-20 ms-3"
                        onClick={() => {
                          closeModel(false);
                          fetchDatafromServer();
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div className="card-body">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1"> Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Customize Name"
                              value={employePerson.Name}
                              onChange={(e) =>
                                setEmployePerson({
                                  ...employePerson,
                                  Name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1"> Cell No</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Customize Cell No"
                              value={employePerson.cell_no}
                              onChange={(e) =>
                                setEmployePerson({
                                  ...employePerson,
                                  cell_no: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="exampleInputEmail1"> Address</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Customize Name"
                              value={employePerson.address}
                              onChange={(e) =>
                                setEmployePerson({
                                  ...employePerson,
                                  address: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">
                              CNIC <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Customize Name"
                              value={employePerson.cnic}
                              onChange={(e) =>
                                setEmployePerson({
                                  ...employePerson,
                                  cnic: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">
                              Joining Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="birthday"
                              name="birthday"
                              value={joinDate}
                              onChange={(e) => setjoinDate(e.target.value)}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">
                              Monthly Salary
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Customize Salary"
                              value={
                                employePerson.monthly_salary === null
                                  ? "false"
                                  : employePerson.monthly_salary
                              }
                              onChange={(e) =>
                                setEmployePerson({
                                  ...employePerson,
                                  monthly_salary: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div className="form-group col-md-3">
                            <label htmlFor="exampleInputEmail1">
                              Holidays Allowed Mothly
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Customize Name"
                              value={employePerson.holidays_allowed_monthly}
                              onChange={(e) =>
                                setEmployePerson({
                                  ...employePerson,
                                  holidays_allowed_monthly: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group col-md-2">
                            <label htmlFor="exampleInputEmail1">
                              Job Status
                            </label>
                            <div>
                              <Form.Select
                                className="form-control"
                                aria-label="Default select example"
                                value={jobStatusSelect}
                                onChange={(e) => {
                                  setjobStatusSelect(e.target.value);
                                }}
                              >
                                <option value="true">Active </option>
                                <option value="false">Left</option>
                              </Form.Select>
                            </div>
                          </div>
                          <div className="form-group col-md-1">
                            <label htmlFor="exampleInputEmail1">Update</label>
                            <button
                              className="btn btn-dark text-center pl-3 "
                              onClick={() => {
                                updateJobStatusApi(jobStatusSelect);
                              }}
                            >
                              <i class="fa fa-upload" aria-hidden="true"></i>
                            </button>
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">
                              Food Allowence
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Customize Name"
                              value={employePerson.food_allowence}
                              onChange={(e) =>
                                setEmployePerson({
                                  ...employePerson,
                                  food_allowence: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">
                              Other Allowence
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Customize Name"
                              value={employePerson.other_allowence}
                              onChange={(e) =>
                                setEmployePerson({
                                  ...employePerson,
                                  other_allowence: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="form-group col-md-12 ">
                            <label
                              for="formFileMultiple"
                              className="form-label"
                            >
                              Attach File Here
                            </label>
                            <input
                              className="form-control pt-1 bg-light pt-0"
                              id="formFileMultiple"
                              type="file"
                              onChange={fileHandle}
                              multiple
                            />
                          </div>
                          <div className="form-group col-md-9 ">
                            {showButtonUpload && showProgressBar && (
                              <ProgressBar
                                now={progressBarNow}
                                label={`${progressBarNow}%`}
                              />
                            )}
                          </div>
                          <div className="form-group col-md-3 text-right">
                            {showButtonUpload ? (
                              <button
                                onClick={savePDF}
                                className=" btn btn-sm py-1 btn-dark mr-2 px-3 w-100"
                              >
                                Upload attachments
                              </button>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="form-group col-md-12">
                            {employePerson.attachments == null ||
                            employePerson.attachments == undefined ||
                            employePerson.attachments === "" ||
                            employePerson.attachments === " " ? (
                              <div
                                className="btn-group btn-group-lg"
                                role="group"
                                aria-label="Call to action"
                              >
                                <a
                                  type="button"
                                  className="btn btn-default btn-lg"
                                >
                                  No Attachment &nbsp;
                                </a>
                              </div>
                            ) : (
                              actualAttachment
                                .split(",")
                                .map((eachFile, index) => {
                                  return (
                                    <>
                                      <div className="w-33 btn btn-outline-dark btn-outline-dark-custom btn-sm m-1 ">
                                        {eachFile.slice(15)}

                                        <span
                                          className="iconForDocs"
                                          onClick={() => {
                                            window.open(
                                              `http://sa-hrm.genial365.com${eachFile}`
                                            );
                                          }}
                                        >
                                          <i
                                            className="fa fa-eye ml-2"
                                            aria-hidden="true"
                                          ></i>
                                        </span>
                                        <span
                                          className="iconForDocs"
                                          onClick={() =>
                                            deleteSelectedDoc(eachFile)
                                          }
                                        >
                                          <i
                                            className="fa fa-trash ml-2 "
                                            aria-hidden="true"
                                          ></i>
                                        </span>
                                      </div>
                                    </>
                                  );
                                })
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-footer text-right">
                      <button type="submit" className=" btn btn-dark mr-2 px-3">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Modal;
