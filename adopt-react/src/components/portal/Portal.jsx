import React, { useContext } from "react";
import Dashboard from "./Dashboard";
import axios from "../../axios";
import "./Portal.css";

import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Portal() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const logoutUser = async () => {
    const response = await axios.post("/api/logout");
    // console.log(response);
    setUser(null);
    navigate("/", { replace: true });
  };
  return (
    <div className="d-flex page-padding vh-100">
      <div className="sidebar col-3 px-0 bg-dark">
        <button className="btn btn-primary" onClick={logoutUser}>
          Log Out
        </button>
      </div>

      <div className="col">
        <Dashboard />
      </div>
    </div>
  );
}

export default Portal;
