import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../axios";
import "./DisplayDog.css";

import LoadingScreen from "../../loading/LoadingScreen";
import MobileDogProfile from "./MobileDogProfile";

function DisplayDog() {
  const { id } = useParams();
  const [dog, setDog] = useState();

  const get_dog_info = async () => {
    try {
      const resp = await axios.get(`/api/dogs/${id}`);
      console.log(resp);
      setDog(resp.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    // fetch dog info
    get_dog_info();
  }, []);
  return dog ? (
    <div className="display-page p-3">
      <MobileDogProfile dog={dog} />
      <div className="p-3 display-card rounded mt-3">
        <h5>Description</h5>
        <p>{dog.data.description}</p>
      </div>
      {dog.data?.special_needs && (
        <div className="p-3 display-card rounded mt-3">
          <h5>Special Needs</h5>
          <p>{dog.data.special_needs}</p>
        </div>
      )}
      <div className="p-3 display-card rounded mt-3">
        <h5>Ideal Home</h5>
        <p>{dog.data.ideal_home}</p>
      </div>
      <div className="p-3 display-card rounded mt-3">
        <h5>Adoption Coordinator</h5>
      </div>
      {dog.images.length > 1 && (
        <div className="p-3 display-card rounded mt-3">
          <h5>Pictures</h5>
        </div>
      )}
    </div>
  ) : (
    <LoadingScreen />
  );
}

export default DisplayDog;
