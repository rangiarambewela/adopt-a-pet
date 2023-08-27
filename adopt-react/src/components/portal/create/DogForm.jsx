import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import { toast } from "react-toastify";

import FormInput from "../../FormInput";
import FormButton from "../../FormButton";
import FormDropDownMenu from "../../FormDropDownMenu";
import ToastContainerWrapper from "../../ToastContainerWrapper";

function DogForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  const [birthdate, setBirthdate] = useState("");
  const [birthdateError, setBirthdateError] = useState(false);
  const [birthdateErrorMessage, setBirthdateErrorMessage] = useState("");

  const [breed, setBreed] = useState("");
  const [breedError, setBreedError] = useState(false);
  const [breedErrorMessage, setBreedErrorMessage] = useState("");

  const [color, setColor] = useState("");
  const [colorError, setColorError] = useState(false);
  const [colorErrorMessage, setColorErrorMessage] = useState("");

  const [sex, setSex] = useState("");
  const [sexError, setSexError] = useState(false);

  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);

  const [housetrained, setHousetrained] = useState("");
  const [housetrainedError, setHousetrainedError] = useState(false);

  const [kids, setKids] = useState("");
  const [kidsError, setKidsError] = useState(false);

  const [intakeDate, setIntakeDate] = useState("");
  const [intakeDateError, setIntakeDateError] = useState(false);
  const [intakeDateErrorMessage, setIntakeDateErrorMessage] = useState("");

  const [fee, setFee] = useState("");
  const [feeError, setFeeError] = useState(false);
  const [feeErrorMsg, setFeeErrorMsg] = useState("");

  const [status, setStatus] = useState(-1);
  const [statusError, setStatusError] = useState(false);

  const selectSexMenuItems = [
    {
      label: "Male",
      action: () => setSex("M"),
    },
    {
      label: "Female",
      action: () => setSex("F"),
    },
  ];

  const selectSizeMenuItems = [
    {
      label: "Small",
      action: () => setSize("small"),
    },
    {
      label: "Medium",
      action: () => setSize("medium"),
    },
    {
      label: "Large",
      action: () => setSize("large"),
    },
    {
      label: "Extra Large",
      action: () => setSize("extra_large"),
    },
  ];

  const selectStatusMenuItems = [
    {
      label: "Available",
      action: () => setStatus(1),
    },
    {
      label: "Pending",
      action: () => setStatus(2),
    },
    {
      label: "Unavailable",
      action: () => setStatus(0),
    },
  ];

  const selectHousetrainedMenuItems = [
    {
      label: "True",
      action: () => setHousetrained(true),
    },
    {
      label: "False",
      action: () => setHousetrained(false),
    },
  ];

  const selectGoodWithKidsMenuItems = [
    {
      label: "True",
      action: () => setKids(true),
    },
    {
      label: "False",
      action: () => setKids(false),
    },
  ];

  const validateFormData = () => {
    let formValid = true;
    setNameError(false);
    setNameErrorMessage("");
    setBreedError(false);
    setBreedErrorMessage("");
    setColorError(false);
    setColorErrorMessage("");
    setBirthdateError(false);
    setBirthdateErrorMessage("");
    setIntakeDateError(false);
    setIntakeDateErrorMessage("");
    setSexError(false);
    setSizeError(false);
    setHousetrainedError(false);
    setKidsError(false);
    setFeeError(false);
    setFeeErrorMsg("");
    setStatusError(false);

    if (name === "") {
      setNameError(true);
      setNameErrorMessage("Please enter a name.");
      formValid = false;
    }
    if (breed === "") {
      setBreedError(true);
      setBreedErrorMessage("Please enter a breed name.");
      formValid = false;
    }
    if (color === "") {
      setColorError(true);
      setColorErrorMessage("Please enter a color description.");
      formValid = false;
    }
    if (birthdate === "") {
      setBirthdateError(true);
      setBirthdateErrorMessage("Please enter a valid birthdate.");
      formValid = false;
    }
    if (sex === "") {
      setSexError(true);
      formValid = false;
    }
    if (size === "") {
      setSizeError(true);
      formValid = false;
    }
    if (housetrained === "") {
      setHousetrainedError(true);
      formValid = false;
    }
    if (kids === "") {
      setKidsError(true);
      formValid = false;
    }

    if (intakeDate === "" || intakeDate.length > 10) {
      setIntakeDateError(true);
      setIntakeDateErrorMessage("Please enter a valid intake date.");
      formValid = false;
    }
    if (fee === "" || fee > 1000000.0 || fee < 0) {
      setFeeError(true);
      setFeeErrorMsg("Please enter a value between 0.00 and 1 000 000.00");
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
        const data = {
          name,
          breed,
          color,
          birthdate,
          sex,
          size,
          status,
          house_trained: housetrained,
          good_with_kids: kids,
          intake_date: intakeDate,
          adoption_fee: fee,
        };
        console.log(data);
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

  return (
    <div className="w-100 ">
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
              onChange={(event) => setName(event.target.value)}
              onBlur={(event) => setName(event.target.value.trim())}
            />
          </div>
          <div className="mb-3">
            <FormInput
              type="text"
              label="Breed"
              name="breed"
              id="breed"
              value={breed}
              error={breedError}
              errorMsg={breedErrorMessage}
              onChange={(event) => setBreed(event.target.value)}
              onBlur={(event) => setBreed(event.target.value.trim())}
            />
          </div>
          <div className="mb-3">
            <FormInput
              type="text"
              label="Color"
              name="color"
              id="color"
              value={color}
              error={colorError}
              errorMsg={colorErrorMessage}
              onChange={(event) => setColor(event.target.value)}
              onBlur={(event) => setColor(event.target.value.trim())}
            />
          </div>
          <div className="mb-3">
            <FormInput
              type="date"
              label="Birthdate"
              name="birthdate"
              id="birthdate"
              value={birthdate}
              error={birthdateError}
              errorMsg={birthdateErrorMessage}
              onChange={(event) => setBirthdate(event.target.value)}
            />
          </div>

          <div className="mb-3 d-flex flex-column flex-sm-row flex-wrap">
            <div className=" col-sm-6 col-md-3 pe-md-3">
              <label htmlFor="sex">Sex</label>
              <div id="sex" name="sex">
                <FormDropDownMenu
                  title="Select sex"
                  items={selectSexMenuItems}
                  error={sexError}
                />
              </div>
            </div>
            <div className=" col-sm-6 col-md-3 pe-md-3">
              <label htmlFor="size">Size</label>
              <div id="size" name="size">
                <FormDropDownMenu
                  title="Select size"
                  items={selectSizeMenuItems}
                  error={sizeError}
                />
              </div>
            </div>
            <div className=" col-sm-6 col-md-3 pe-md-3">
              <label htmlFor="housetrained">Housetrained</label>
              <div id="housetrained" name="housetrained">
                <FormDropDownMenu
                  title="Select Option"
                  items={selectHousetrainedMenuItems}
                  error={housetrainedError}
                />
              </div>
            </div>
            <div className=" col-sm-6 col-md-3 pe-md-3">
              <label htmlFor="kids">Good with Kids</label>
              <div id="kids" name="kids">
                <FormDropDownMenu
                  title="Select Option"
                  items={selectGoodWithKidsMenuItems}
                  error={kidsError}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-3 ">
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
          <div className="mb-3">
            <FormInput
              type="date"
              label="Intake Date"
              name="intake"
              id="intake"
              value={intakeDate}
              error={intakeDateError}
              errorMsg={intakeDateErrorMessage}
              onChange={(event) => setIntakeDate(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <FormInput
              type="number"
              label="Adoption Fee ($)"
              min={0.0}
              max={1000000.0}
              step=".01"
              name="fee"
              id="fee"
              value={fee}
              error={feeError}
              errorMsg={feeErrorMsg}
              onChange={(event) => setFee(event.target.value)}
              onBlur={(event) =>
                setFee(parseFloat(event.target.value).toFixed(2))
              }
            />
          </div>
          <FormButton text="Create Dog" className="w-100" onClick={createDog} />
        </form>
      </div>
      <ToastContainerWrapper />
    </div>
  );
}

export default DogForm;
