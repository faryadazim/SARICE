import React, { useEffect, useState } from "react";
import Loader from "../Layout/Loader";
import "./TableForColor.css";

const Table = () => {
  const url = "http://sa-hrm.genial365.com";

  // States
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [saveButtonSpin, setsaveButtonSpin] = useState(false);

  // form-control state
  const [colorId, setcolorId] = useState();
  const [inColor, setinColor] = useState();
  const [outColor, setoutColor] = useState();
  // {colors_id: 1, in_color: '#74FF33', out_color: '#FFD133'}      //default colors

  // Update Color Api
  const updateData = async () => {
    setsaveButtonSpin(true);
    const updatedData = {
      colors_id: colorId,
      in_color: inColor,
      out_color: outColor,
    };
    console.log(updatedData);
    fetch(url + "/api/colors", {
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
        setsaveButtonSpin(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    // Get Color api
    fetch(url + "/api/colors", {
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
            setcolorId(data.colors_id);
            setinColor(data.in_color);
            setoutColor(data.out_color);
            setisLoading(false);

            console.log(data);
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
                              htmlFor="favcolor"
                              className="col-sm-5 col-form-label"
                            >
                              Color In
                            </label>
                            <div className="col-sm-7">
                              <input
                                className="form-control"
                                type="color"
                                id="favcolor"
                                name="favcolor"
                                value={inColor}
                                disabled={!isEdit}
                                onChange={(e) => setinColor(e.target.value)}
                              ></input>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="favcolor"
                              className="col-sm-5 col-form-label"
                            >
                              Color Out
                            </label>
                            <div className="col-sm-7">
                              <input
                                type="color"
                                id="favcolor"
                                className="form-control"
                                name="favcolor"
                                value={outColor}
                                disabled={!isEdit}
                                onChange={(e) => setoutColor(e.target.value)}
                              ></input>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer bg-none">
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
                                      ) : (
                                        <i class="fas fa-edit"> </i>
                                      )}
                                      Edit Values
                                    </a>
                                  )} 
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Table;
