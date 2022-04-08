import React, { useState, useEffect } from "react";
import userLogo from "../../images/useradmin.jpg";
import { DateConverter, TimeConverter } from "../../services/dateTimeCoverter";
import Loader from "../Layout/Loader";
import { useNavigate } from 'react-router-dom';

const UserProfile = ({setisLogin}) => {
  const navigate = useNavigate();
  const [logToRender, setlogToRender] = useState([]);
  const [userProfile, setuserProfile] = useState({});
  const [isLoading, setisLoading] = useState(true);

  const callApiToGetLogData = async () => {
    await fetch("http://sa-hrm.genial365.com/api//Logs?size=3&page_index=0", {
      method: "GET",
      headers: {
        Authorization:
          JSON.parse(localStorage.getItem("authUser")).token_type +
          " " +
          JSON.parse(localStorage.getItem("authUser")).access_token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        console.log(
          response.json().then((data) => {
            setlogToRender(data);
            setisLoading(false);
          })
        );
      })
      .catch((error) => console.log("errrr  ", error));
  };

  useEffect(() => {
    fetch("http://sa-hrm.genial365.com/api/logged-user-info", {
      method: "GET",
      headers: {
        Authorization:
          JSON.parse(localStorage.getItem("authUser")).token_type +
          " " +
          JSON.parse(localStorage.getItem("authUser")).access_token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        console.log(
          response.json().then((data) => {
            setuserProfile(data);
            callApiToGetLogData();
          })
        );
      })
      .catch((error) => console.log("errrr  ", error));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 ">
                <div className="mt-5 card card-primary card-outline py-3">
                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src={userLogo}
                        alt="admin"
                      />
                    </div>
                    <h3 className="profile-username text-center">
                      {userProfile.username}
                    </h3>
                    <p className="text-muted text-center">
                      {userProfile.email}
                    </p>
                    <ul className="mb-5 list-group list-group-unbordered mb-3">
                      <li className="list-group-item">
                        <b>Role ID</b> <a className="float-right">1,322</a>
                      </li>
                    </ul>
                    <a   className="btn btn-primary btn-block"  onClick={()=>{
                      
                      window.localStorage.clear()
                      setisLogin(false)
                      navigate('/');
                      }}>
                      <b   >Logout</b>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      <li className="nav-item ">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                        >
                          Lattest Logs
                        </a>
                      </li>
                     
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="active tab-pane" id="timeline">
                        {logToRender.map((logItem) => {
                          return (
                            <div
                              className="timeline timeline-inverse"
                              style={{ marginBottom: "0px" }}
                            >
                              <div className="time-label">
                                <span className="bg-secondary">
                                  {DateConverter(logItem.datetime)}
                                </span>
                              </div>
                              <div>
                                <i className="fas fa-envelope bg-primary" />
                                <div className="timeline-item">
                                  <span className="time">
                                    <i className="far fa-clock" />{" "}
                                    {TimeConverter(logItem.datetime)}
                                  </span>

                                  <div className="timeline-body">
                                    {logItem.log_desc}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div className="text-right">
                          <a   className="btn btn-dark btn-sm" onClick={()=>navigate("../log")}>
                           Show All
                          </a>
                        </div>
                      </div>
                      {/* /.tab-pane */}
                      <div className="tab-pane" id="settings">
                        <form className="form-horizontal">
                          <div className="form-group row">
                            <label
                              htmlFor="inputName"
                              className="col-sm-2 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                id="inputName"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputEmail"
                              className="col-sm-2 col-form-label"
                            >
                              Email
                            </label>
                            <div className="col-sm-10">
                              <inputFsrc
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                placeholder="Email"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputName2"
                              className="col-sm-2 col-form-label"
                            >
                              Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="inputName2"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputExperience"
                              className="col-sm-2 col-form-label"
                            >
                              Experience
                            </label>
                            <div className="col-sm-10">
                              <textarea
                                className="form-control"
                                id="inputExperience"
                                placeholder="Experience"
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputSkills"
                              className="col-sm-2 col-form-label"
                            >
                              Skills
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="inputSkills"
                                placeholder="Skills"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <div className="checkbox">
                                <label>
                                  <input type="checkbox" /> I agree to the{" "}
                                  <a >terms and conditions</a>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                              <button type="submit" className="btn btn-dark">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UserProfile;
