import React, { useState, useEffect } from "react";
import {
  DateConverter,
  TimeConverter,
} from "../../services/dateTimeCoverter.js";
import Loader from "../Layout/Loader";
const url = "http://sa-hrm.genial365.com";

const LogPage = () => {
  const [logToRender, setlogToRender] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [pageIndex, setpageIndex] = useState(0);
  const [loadMoreButtonSpin, setloadMoreButtonSpin] = useState(false);

  const LoadMore = async () => {
    await setloadMoreButtonSpin(true);
    await setpageIndex(pageIndex + 1);
    await callApiToGetLogData();
    setloadMoreButtonSpin(false);
  };

  const callApiToGetLogData = async () => {
    await fetch(url + `/api//Logs?size=13&page_index=${pageIndex}`, {
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
            setlogToRender([...logToRender, ...data]);
            setisLoading(false);
          })
        );
      })
      .catch((error) => console.log("errrr  ", error));
  };

  useEffect(() => {
    callApiToGetLogData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-center">
                  <b>#</b>
                </th>
                <th>Description</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {logToRender.map((item, index) => {
                return (
                  <tr>
                    <th scope="row" className="text-center">
                      {index + 1}
                    </th>
                    <td> {item.log_desc}</td>

                    <td>{DateConverter(item.datetime)}</td>

                    <td>{TimeConverter(item.datetime)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="col-md-12 text-right">
            <a
              className="highlight-button btn btn-small button xs-margin-bottom-five mb-3"
              data-abc="true"
              onClick={() => {
                LoadMore();
              }}
              style={{ width: "160px" }}
            >
              Load More
              {loadMoreButtonSpin ? (
                <span
                  className="spinner-border spinner-border-sm ml-4"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : null}
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default LogPage;
