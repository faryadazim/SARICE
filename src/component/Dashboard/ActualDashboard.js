import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateConverter, TimeConverter } from "../../services/dateTimeCoverter";
import Loader from "../Layout/Loader";

const url = "http://sa-hrm.genial365.com";
const ActualDashboard = () => {
  const [dashboardData, setDashboardData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url + "/api/Dashboard", {
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
          setDashboardData(data);
          setIsLoading(false);
        });
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-3 col-sm-6 col-12">
                      <div className="info-box bg-gradient-info">
                        <span className="info-box-icon">
                          <i className="far fa-bookmark" />
                        </span>
                        <div className="info-box-content">
                          <span className="info-box-text">Last Update</span>
                          <span className="info-box-number">
                            {DateConverter(dashboardData.LastUpdate.datetime)}
                          </span>

                          <span className="progress-description">
                            {TimeConverter(dashboardData.LastUpdate.datetime)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12">
                      <div className="info-box bg-gradient-success">
                        <span className="info-box-icon">
                          <i className="far fa-thumbs-up" />
                        </span>
                        <div className="info-box-content">
                          <span className="info-box-text">
                            Today Attandances
                          </span>
                          <span className="info-box-number">
                            {dashboardData.TodayAttandanceses}
                          </span>
                          <span className="progress-description">
                            Presence Record
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12">
                      <div className="info-box bg-gradient-warning">
                        <span className="info-box-icon">
                          <i className="far fa-calendar-alt" />
                        </span>
                        <div className="info-box-content">
                          <span className="info-box-text">
                            Total Attandances
                          </span>
                          <span className="info-box-number">
                            {dashboardData.TotalAttandanceses}
                          </span>

                          <span className="progress-description">
                            Attandance Taken
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12">
                      <div className="info-box bg-gradient-danger">
                        <span className="info-box-icon">
                          <i className="fas fa-comments" />
                        </span>
                        <div className="info-box-content">
                          <span className="info-box-text">Total Employees</span>
                          <span className="info-box-number">
                            {dashboardData.TotalEmployees}
                          </span>
                          <span className="progress-description">
                            {dashboardData.TodayAttandanceses} Worker Available
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6"></div>
                  </div>
                  <div className="card">
                    <div className="card-header border-transparent">
                      <h3 className="card-title">
                        <b>Last Attende Record</b>
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
                    {/* /.card-header */}
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table m-0">
                          <tbody>
                            <tr>
                              <td>
                                <a>1</a>
                              </td>
                              <td>
                                <b>Name :</b>
                              </td>

                              <td>
                                <div
                                  className="sparkbar"
                                  data-color="#00a65a"
                                  data-height={20}
                                >
                                  {
                                    dashboardData.LastAttandance.user_detail
                                      .Name
                                  }
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a>2</a>
                              </td>
                              <td>
                                <b>Cell No :</b>
                              </td>
                              <td>
                                <div
                                  className="sparkbar"
                                  data-color="#00a65a"
                                  data-height={20}
                                >
                                  {
                                    dashboardData.LastAttandance.user_detail
                                      .cell_no
                                  }
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <a>3</a>
                              </td>
                              <td>
                                <b>Check In/Out</b>
                              </td>
                              <td>
                                <div
                                  className="sparkbar"
                                  data-color="#00a65a"
                                  data-height={20}
                                >
                                  {dashboardData.LastAttandance.attandance_rec
                                    .dwInOutMode ? (
                                    <>Check In</>
                                  ) : (
                                    <>Check Out</>
                                  )}
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <a>4</a>
                              </td>
                              <td>
                                <b>Date</b>
                              </td>
                              <td>
                                <div
                                  className="sparkbar"
                                  data-color="#00a65a"
                                  data-height={20}
                                >
                                  {DateConverter(
                                    dashboardData.LastAttandance.attandance_rec
                                      .DateTimeRecord
                                  )}
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <a>5</a>
                              </td>
                              <td>
                                <b>Time</b>
                              </td>
                              <td>
                                <div
                                  className="sparkbar"
                                  data-color="#00a65a"
                                  data-height={20}
                                >
                                  {TimeConverter(
                                    dashboardData.LastAttandance.attandance_rec
                                      .DateTimeRecord
                                  )}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="text-right">
                        <Link
                          to="info"
                          className="btn btn-dark btn-sm py-1 my-2 mb-3 mr-4"
                        >
                          <i class="  nav-icon fas fa-chart-pie"></i> Go To
                          Employees List
                        </Link>
                      </div>
                    </div>
                    <div className="card-footer clearfix text-right"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ActualDashboard;
