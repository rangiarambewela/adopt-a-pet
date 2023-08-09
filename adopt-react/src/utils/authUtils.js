import axios from "../axios";

export function validatePassword(
  password,
  setPasswordError,
  setPasswordErrorMsg
) {
  setPasswordError(false);
  setPasswordErrorMsg("");
  if (password.length === 0) {
    setPasswordError(true);
    setPasswordErrorMsg("Please enter a password.");
    return false;
  }
  if (password.length < 6) {
    setPasswordError(true);
    setPasswordErrorMsg("Please ensure password is 6 - 48 characters long.");
    return false;
  }

  return true;
}

export function validateUsername(
  username,
  setUsernameError,
  setusernameErrorMsg
) {
  setUsernameError(false);
  setusernameErrorMsg("");
  if (username.length === 0) {
    setUsernameError(true);
    setusernameErrorMsg("Please enter a username.");
    return false;
  }
  if (username.length < 5) {
    setUsernameError(true);
    setusernameErrorMsg("Username cannot be less than 5 characters long.");
    return false;
  }
  return true;
}

export async function checkAuthentication(user) {
  if (user === null) {
    try {
      const res = await axios.get("/api/check-authentication");
      console.log("RETURNING TRUE");
      return res.data.user;
    } catch (e) {
      console.log("NOT LOGGED IN: ", e);
      console.log("RETURNING FALSE");
      return null;
    }
  }
  console.log("USER NOT NULL");
  return user;
}
