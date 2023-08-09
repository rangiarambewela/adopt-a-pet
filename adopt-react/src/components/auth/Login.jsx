import React, { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { validateUsername, validatePassword } from "../../utils/authUtils";
import { AuthContext } from "../../contexts/AuthContext";

import "./Login.css";
import usernameLogo from "../../assets/icons/username.svg";
import passwordLogo from "../../assets/icons/password.svg";

import FormInput from "../FormInput";
import FormButton from "../FormButton";
import LoadingScreen from "../loading/LoadingScreen";
import axios from "../../axios";

function Login() {
  const navigate = useNavigate();
  const { user, setUser, isAuthenticating } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const validateLoginForm = () => {
    const validUsername = validateUsername(
      username,
      setUsernameError,
      setUsernameErrorMsg
    );
    const validPassword = validatePassword(
      password,
      setPasswordError,
      setPasswordErrorMsg
    );

    return validUsername && validPassword;
  };

  const loginUser = async () => {
    const data = { username, password };
    try {
      const response = await axios.post("/api/login", data);
      console.log(response.data);
      const user_data = response.data?.user;
      console.log("SETTING USER");
      setUser(user_data); // set context for user info
      navigate("/portal", { replace: true }); // redirect to home page
    } catch (err) {
      console.log("COULD NOT LOG IN: ", err);
    }
  };

  const loginHander = async (e) => {
    e.preventDefault();
    const status = validateLoginForm();
    if (status) {
      await loginUser();
    } else {
      console.log("Log in FORM error");
    }
  };
  if (isAuthenticating) return <LoadingScreen />;
  return user ? (
    <Navigate to="/portal" />
  ) : (
    <div className="vh-100  d-flex  justify-content-center align-items-center">
      <div className="d-flex flex-column align-items-center p-3 login-card">
        <h1 className="mb-3 mb-md-5 ">APS Login</h1>
        <form action="" className="w-100">
          <div className="mb-3">
            <FormInput
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              img={usernameLogo}
              value={username}
              error={usernameError}
              errorMsg={usernameErrorMsg}
              onBlur={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <FormInput
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
