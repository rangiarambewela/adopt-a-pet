import React from "react";
import { useState } from "react";
import "./Login.css";
import usernameLogo from "../assets/icons/username.svg";
import passwordLogo from "../assets/icons/password.svg";

import LoginFormInput from "./LoginFormInput";
import FormButton from "../components/FormButton";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUsernameError] = useState("");
  const [usernameErrorMsg, setusernameErrorMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const validateLoginForm = () => {
    let status = 1;
    setUsernameError(false);
    setusernameErrorMsg("");
    setPasswordError(false);
    setPasswordErrorMsg("");
    if (username.length === 0) {
      console.log("Username cannot be less than 5 characters long.");
      setUsernameError(true);
      setusernameErrorMsg("Please enter a username.");
      status = 0;
    } else if (username.length < 5) {
      console.log("Username cannot be less than 5 characters long.");
      setUsernameError(true);
      setusernameErrorMsg("Username cannot be less than 5 characters long.");
      status = 0;
    }
    if (password.length === 0) {
      setPasswordError(true);
      setPasswordErrorMsg("Please enter a password.");
      status = 0;
    } else if (password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMsg("Please ensure password is 6 - 48 characters long.");
      status = 0;
    }

    return status;
  };
  const loginHander = (e) => {
    e.preventDefault();
    console.log("FORM SUBMITTED");
    console.log(username);
    console.log(password);
    const status = validateLoginForm();
    if (status) {
      console.log("Validation successful");
    } else {
      console.log("Log in error");
    }
  };
  return (
    <div className="vh-100  d-flex  justify-content-center align-items-center">
      <div className="d-flex flex-column align-items-center p-3 login-card">
        <h1 className="mb-3 mb-md-5 ">APS Login</h1>
        <form action="" className="w-100">
          <div className="mb-3">
            <LoginFormInput
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              img={usernameLogo}
              value={username}
              error={userNameError}
              errorMsg={usernameErrorMsg}
              onBlur={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <LoginFormInput
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              img={passwordLogo}
              value={password}
              error={passwordError}
              errorMsg={passwordErrorMsg}
              onBlur={(event) => setPassword(event.target.value)}
            />
          </div>

          <FormButton text="Log In" className="w-100" onClick={loginHander} />
        </form>
      </div>
    </div>
  );
}

export default Login;
