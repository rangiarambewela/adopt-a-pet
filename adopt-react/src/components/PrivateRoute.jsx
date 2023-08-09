import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

import LoadingScreen from "./loading/LoadingScreen";

function PrivateRoute({ children }) {
  const { user, isAuthenticating } = useContext(AuthContext);

  if (isAuthenticating) return <LoadingScreen />;
  return user ? children : <Navigate to="/login" />; // this is WRONG - CANNOT USE USER BC NOT LOADED
}

export default PrivateRoute;
