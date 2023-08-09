import React from "react";
import { useState } from "react";
import axios from "../../axios";
import { validateUsername, validatePassword } from "../../utils/authUtils";

import FormInput from "../FormInput";
import FormButton from "../FormButton";

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailErrorMsg, setEmailErrorMessage] = useState("");

  const [username, setUsername] = useState("");
  const [userNameError, setUsernameError] = useState("");
  const [usernameErrorMsg, setusernameErrorMsg] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();
    const status = validateRegisterForm();
    if (status) {
      console.log("Validation successful");
      const data = {
        username,
        firstName,
        lastName,
        email,
        password,
      };
      const response = await axios.post("/api/register", data);
      console.log(response.data);
    } else {
      console.log("Log in error");
    }
  };

  const validateRegisterForm = () => {
    let status = true;

    const validUsername = validateUsername(
      username,
      setUsernameError,
      setusernameErrorMsg
    );
    const validPassword = validatePassword(
      password,
      setPasswordError,
      setPasswordErrorMsg
    );

    setFirstNameError(false);
    setFirstNameErrorMessage("");
    if (firstName.length === 0) {
      setFirstNameError(true);
      setFirstNameErrorMessage("Please enter a first name.");
      status = false;
    }

    setLastNameError(false);
    setLastNameErrorMessage("");
    if (lastName.length === 0) {
      setLastNameError(true);
      setLastNameErrorMessage("Please enter a last name.");
      status = false;
    }

    setEmailError(false);
    setEmailErrorMessage("");
    if (email.length === 0) {
      setEmailError(true);
      setEmailErrorMessage("Please enter an email.");
      status = false;
    }

    console.log("Valid username: ", validUsername);
    console.log("Valid password: ", validPassword);
    console.log("Status", status);

    return validUsername && validPassword && status;
  };

  //   const validateUsername = () => {
  //     setUsernameError(false);
  //     setusernameErrorMsg("");
  //     if (username.length === 0) {
  //       setUsernameError(true);
  //       setusernameErrorMsg("Please enter a username.");
  //       return false;
  //     }
  //     if (username.length < 5) {
  //       setUsernameError(true);
  //       setusernameErrorMsg("Username cannot be less than 5 characters long.");
  //       return false;
  //     }
  //     return true;
  //   };

  //   const validatePassword = () => {
  //     setPasswordError(false);
  //     setPasswordErrorMsg("");
  //     if (password.length === 0) {
  //       setPasswordError(true);
  //       setPasswordErrorMsg("Please enter a password.");
  //       return false;
  //     }
  //     if (password.length < 6) {
  //       setPasswordError(true);
  //       setPasswordErrorMsg("Please ensure password is 6 - 48 characters long.");
  //       return false;
  //     }

  //     return true;
  //   };

  return (
    <div>
      <h1>Create New User</h1>
      <div>
        <form action="" className="w-100">
          <div className="mb-3">
            <FormInput
              type="text"
              label="First Name"
              name="firstName"
              id="firstName"
              value={firstName}
              error={firstNameError}
              errorMsg={firstNameErrorMessage}
              onBlur={(event) => setFirstName(event.target.value.trim())}
            />
          </div>
          <div className="mb-3">
            <FormInput
              type="text"
              label="Last Name"
              name="lastName"
              id="lastName"
              value={lastName}
              error={lastNameError}
              errorMsg={lastNameErrorMessage}
              onBlur={(event) => setLastName(event.target.value.trim())}
            />
          </div>
          <div className="mb-3">
            <FormInput
              type="email"
              label="E-mail"
              name="email"
              id="email"
              value={email}
              error={emailError}
              errorMsg={emailErrorMsg}
              onBlur={(event) => setEmail(event.target.value.trim())}
            />
          </div>
          <div className="mb-3">
            <FormInput
              type="text"
              label="Username"
              name="username"
              id="username"
              value={username}
              error={userNameError}
              errorMsg={usernameErrorMsg}
              onBlur={(event) => setUsername(event.target.value.trim())}
            />
          </div>
          <div className="mb-3">
            <FormInput
              type="text"
              label="Password"
              name="password"
              id="password"
              value={password}
              error={passwordError}
              errorMsg={passwordErrorMsg}
              onBlur={(event) => setPassword(event.target.value)}
            />
          </div>

          <FormButton
            text="Create User"
            className="w-100"
            onClick={registerHandler}
          />
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
