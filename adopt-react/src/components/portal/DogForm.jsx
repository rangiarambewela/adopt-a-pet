import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { toast } from "react-toastify";

import FormInput from "../FormInput";
import FormButton from "../FormButton";
import FormDropDownMenu from "../FormDropDownMenu";
import ToastContainerWrapper from "../ToastContainerWrapper";

function DogForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  const [age, setAge] = useState(0);
  const [ageError, setAgeError] = useState("");
  const [ageErrorMessage, setAgeErrorMessage] = useState("");

  const [sex, setSex] = useState("");
  const [sexError, setSexError] = useState(false);

  const [status, setStatus] = useState(-1);
  const [statusError, setStatusError] = useState(false);

  const validateFormData = () => {
    let formValid = true;
    setNameError(false);
    setNameErrorMessage("");
    setAgeError(false);
    setAgeErrorMessage("");
    setSexError(false);
    setStatusError(false);
    if (name === "") {
      setNameError(true);
      setNameErrorMessage("Please enter a name.");
      formValid = false;
    }
    if (age === 0) {
      setAgeError(true);
      setAgeErrorMessage("Please enter a valid age in years");
      formValid = false;
    }
    if (sex === "") {
      setSexError(true);
      formValid = false;
    }
    if (status === -1) {
      setStatusError(true);
      formValid = false;
    }
    return formValid;
  };

  const createDog = async () => {
    if (validateFormData()) {
      try {
        console.log("creating new dog");
        console.log("Name: ", name);
        console.log("Age: ", age);
        console.log("Sex: ", sex);
        console.log("Status: ", status);

        const data = {
          name,
          age,
          sex,
          status,
        };

        const response = await axios.post("/api/dogs/new", data);
        console.log(response.data);
        navigate("/portal");
      } catch (err) {
        console.log("Error creating dog: ", err);
        toast.error(
          "Could not create new dog profile. Please contact support team for help.",
          {
            toastId: "create_dog_error",
          }
        );
      }
    }
  };

  const maleSelected = () => {
    setSex("M");
  };
  const femaleSelected = () => {
    setSex("F");
  };

  const availableSelected = () => {
    setStatus(1);
  };

  const pendingSelected = () => {
    setStatus(2);
  };

  const unavailableSelected = () => {
    setStatus(0);
  };

  const selectSexMenuItems = [
    {
      label: "Male",
      action: maleSelected,
    },
    {
      label: "Female",
      action: femaleSelected,
    },
  ];

  const selectStatusMenuItems = [
    {
      label: "Available",
      action: availableSelected,
    },
    {
      label: "Pending",
      action: pendingSelected,
    },
    {
      label: "Unavailable",
      action: unavailableSelected,
    },
  ];

  return (
    <div className="w-100">
      <h1>Create New Dog Profile</h1>
      <div>
        <form action="" className="d-flex flex-column">
          <div className="mb-3">
            <FormInput
              type="text"
              label="Name"
              name="name"
              id="name"
              value={name}
              error={nameError}
              errorMsg={nameErrorMessage}
              onBlur={(event) => setName(event.target.value.trim())}
            />
          </div>
          <div className="mb-3">
            <FormInput
              type="number"
              label="Age"
              name="age"
              id="age"
              value={age}
              min={0}
              error={ageError}
              errorMsg={ageErrorMessage}
              onBlur={(event) => setAge(event.target.value)}
            />
          </div>
          <div className="mb-3 d-flex flex-column flex-sm-row">
            <div className="me-sm-3 me-lg-5">
              <label htmlFor="sex">Sex</label>
              <div id="sex" name="sex">
                <FormDropDownMenu
                  title="Select sex"
                  items={selectSexMenuItems}
                  error={sexError}
                />
              </div>
            </div>

            <div className="">
              <label htmlFor="status">Status</label>
              <div id="status" name="status">
                <FormDropDownMenu
                  title="Select Status"
                  items={selectStatusMenuItems}
                  error={statusError}
                />
              </div>
            </div>
          </div>

          <FormButton text="Create Dog" className="w-100" onClick={createDog} />
        </form>
      </div>
      <ToastContainerWrapper />
    </div>
  );
}

export default DogForm;
