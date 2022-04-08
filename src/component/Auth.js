import React, { useState } from "react";

const Auth = ({ setisLogin }) => {
  const urlLogIn = "http://sa-hrm.genial365.com";
  const [logInAuth, setlogInAuth] = useState({
    username: "",
    password: "",
    grant_type: "password",
  });

  const [isCredentials, setisCredentials] = useState(true);
  return (
    <>
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <a>
              <b>SA</b> RICE
            </a>
          </div>
          <div className="card py-3">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Welcome to SA RICE HRM</p>
              <h3 className="login-box-msg">Sign In to Access</h3>
              <form
                className="py-2"
                onSubmit={(e) => {
                  e.preventDefault(); 

                  var urlencoded = new URLSearchParams();
                  urlencoded.append("username", logInAuth.username);
                  urlencoded.append("password", logInAuth.password);
                  urlencoded.append("grant_type", "password");

                  fetch(urlLogIn + "/login", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: urlencoded,
                  })
                    .then((result) => {
                      result.json().then((response) => {
                        if (result.status === 200) {
                          localStorage.setItem(
                            "authUser",
                            JSON.stringify(response)
                          );
                          window.location.reload(false);
                          setisLogin(true);
                        } else {
                          setisCredentials(false);
                        }
                      });
                    })
                    .catch((error) => console.log("error", error));
                }}
              >
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={logInAuth.username}
                    onChange={(e) =>
                      setlogInAuth({ ...logInAuth, username: e.target.value })
                    }
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={logInAuth.password}
                    onChange={(e) =>
                      setlogInAuth({ ...logInAuth, password: e.target.value })
                    }
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8   pt-1">
                    {!isCredentials ? (
                      <code className="ml-2 "> Invalid Credentials</code>
                    ) : null}
                  </div>
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Log In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
