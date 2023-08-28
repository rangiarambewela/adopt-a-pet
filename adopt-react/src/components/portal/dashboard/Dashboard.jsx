import React, { useContext, useEffect, useState } from "react";
import axios from "../../../axios";
import { toast } from "react-toastify";

import AnimalList from "./AnimalList";
import ErrorPage from "../../ErrorPage";
import LoadingScreen from "../../loading/LoadingScreen";
import ToastContainerWrapper from "../../ToastContainerWrapper";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dogs, setDogs] = useState([]);

  const getAllDogs = async () => {
    try {
      const response = await axios.get("/api/dogs");
      console.log(response);
      setDogs(response.data);
      setIsLoading(false);
    } catch (e) {
      console.log("ERROR fetching dogs: ", e);
      setDogs(null);
      setIsLoading(false);
      toast.error("Error loading your dogs, please contact support team.", {
        toastId: "dogs_loading_error",
      });
    }
  };
  useEffect(() => {
    console.log("Dashboard loading");
    getAllDogs();
  }, []);
  if (isLoading) return <LoadingScreen />;
  return dogs ? (
    <div className="h-100 overflow-scroll">
      <h1>Your Animals </h1>
      {dogs.length > 0 && (
        <div>
          <h2>Dogs</h2>
          <div>
            <AnimalList animals={dogs} />
          </div>
        </div>
      )}
      {/* <div>
        <h2>Cats</h2>
        <div><AnimalList animals={cats} /></div>
      </div> */}
    </div>
  ) : (
    <div className="h-100">
      <ErrorPage />
      <ToastContainerWrapper />
    </div>
  );
}

export default Dashboard;
