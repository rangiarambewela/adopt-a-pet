import React, { useContext } from "react";
import axios from "../../axios";
import "./Portal.css";

import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";

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
    <div className="d-flex page-padding vh-100 overflow-hidden">
      <div className="sidebar col-auto px-0 bg-light d-flex flex-column">
        <button
          className="btn btn-secondary w-100"
          onClick={() => {
            navigate("/portal");
          }}
        >
          Home
        </button>

        <button
          className="btn btn-secondary w-100"
          onClick={() => {
            navigate("/portal/dogs/new");
          }}
        >
          Create New Dog
        </button>

        <button className="btn btn-primary w-100" onClick={logoutUser}>
          Log Out
        </button>
      </div>

      <div className="col overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
}

export default Portal;
