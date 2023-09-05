import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import { toast } from "react-toastify";
import {
  uploadImages,
  deleteCloudinaryImages,
} from "../../../utils/imageUploadUtils";

import FormInput from "../../FormInput";
import FormButton from "../../FormButton";
import FormDropDownMenu from "../../FormDropDownMenu";
import ToastContainerWrapper from "../../ToastContainerWrapper";
import ImageUpload from "../../ImageUpload";
import ImageUploadFailedErrorModal from "../../shared/ImageUploadFailedErrorModal";
import ImageUploadErrorModal from "../../shared/ImageUploadErrorModal";

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

  const [status, setStatus] = useState(-2); // -2 is not a valid state - uses this for form validation
  const [statusError, setStatusError] = useState(false);

  const [imageUploads, setImageUploads] = useState([]); // stores user input for imaged selected (not yet uploaded to cloudinary)
  const [imageUploadsError, setImageUploadsError] = useState(false);
  const [imageUploadErrorMsg, setImageUploadErrorMsg] = useState("");

  const [successfullyUploadedImages, setSuccessfullyUploadedImages] = useState(
    []
  ); // stores images successfully uploaded to cloudinary

  const [showImageFailedModal, setShowImageFailedModal] = useState(false);
  const handleImageFailedModalShow = () => setShowImageFailedModal(true);
  const handleImageFailedModalClose = () => {
    setShowImageFailedModal(false);
    setIsLoading(false);
    // note: do not need to deleteCloudinaryImages() because no images were successfully uploaded to cloudinary
  };

  const [showImageErrorModal, setShowImageErrorModal] = useState(false);
  const handleImageErrorModalShow = () => setShowImageErrorModal(true);
  const handleImageErrorModalClose = () => {
    setShowImageErrorModal(false);
    deleteCloudinaryImages(successfullyUploadedImages); // don't need to do this if all images failed
    setIsLoading(false);
  };

  const [isLoading, setIsLoading] = useState(false); // used to set the styling of submit button to be loading and disabled

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
      label: "Yes",
      action: () => setHousetrained(true),
    },
    {
      label: "No",
      action: () => setHousetrained(false),
    },
  ];

  const selectGoodWithKidsMenuItems = [
    {
      label: "Yes",
      action: () => setKids(true),
    },
    {
      label: "No",
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
    setImageUploadsError(false);
    setImageUploadErrorMsg("");

    if (name === "") {
      setNameError(true);
      setNameErrorMessage("Please enter a name");
      formValid = false;
    }
    if (breed === "") {
      setBreedError(true);
      setBreedErrorMessage("Please enter a breed name");
      formValid = false;
    }
    if (color === "") {
      setColorError(true);
      setColorErrorMessage("Please enter a color description");
      formValid = false;
    }
    if (birthdate === "") {
      setBirthdateError(true);
      setBirthdateErrorMessage("Please enter a valid birthdate");
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
      setIntakeDateErrorMessage("Please enter a valid intake date");
      formValid = false;
    }
    if (fee === "" || fee > 1000000.0 || fee < 0) {
      setFeeError(true);
      setFeeErrorMsg("Please enter a value between 0.00 and 1 000 000.00");
      formValid = false;
    }
    if (status === -2) {
      setStatusError(true);
      formValid = false;
    }
    if (imageUploads.length === 0) {
      setImageUploadsError(true);
      setImageUploadErrorMsg("Please select at least one image to upload");
      formValid = false;
    }
    if (imageUploads.length > 5) {
      setImageUploadsError(true);
      setImageUploadErrorMsg("Please select up to 5 images to upload");
      formValid = false;
    }
    return formValid;
  };

  const generatePayload = (images) => {
    const payload = {
      name,
      breed,
      color,
      birthdate,
      sex,
      size,
      status,
      images,
      house_trained: housetrained,
      good_with_kids: kids,
      intake_date: intakeDate,
      adoption_fee: fee,
      display_status: 1,
    };
    return payload;
  };

  const saveDraft = () => {
    console.log("Clicked Save Draft");
    setShowImageErrorModal(false); // IS THIS BAD
    setShowImageFailedModal(false); // IS THIS BAD bc idk which modal called this but need to hide the modal
    const payload = generatePayload(successfullyUploadedImages);
    payload.display_status = 0;
    saveDogInfo(payload);
  };

  const publishProfile = () => {
    console.log("Clicked Publish");
    setShowImageErrorModal(false);
    const payload = generatePayload(successfullyUploadedImages);
    saveDogInfo(payload);
  };

  const createDog = async () => {
    const validForm = validateFormData();
    if (validForm) {
      setIsLoading(true);
      const images = await uploadImages(imageUploads, "dogs"); // first upload images to cloudinary
      setSuccessfullyUploadedImages(images);
      if (images.length === 0) {
        // error uploading all images to cloudinary (no images successfully uploaded to cloudinary)
        console.log("ALL images failed to upload");
        setShowImageFailedModal(true); // modal has option to save draft or cancel
      } else if (images.length !== imageUploads.length) {
        // some images successfully uploaded to cloudinary and some images failed
        console.log("Some images failed to upload");
        setShowImageErrorModal(true); // modal has option to save draft, publish, or cancel
      } else {
        // all images uploaded successfully
        const payload = generatePayload(images);
        saveDogInfo(payload); // send all data to the back end to save
      }
    }
  };

  const saveDogInfo = async (data) => {
    console.log("in saveDogInfo");
    setIsLoading(true);
    try {
      console.log(data);
      const response = await axios.post("/api/dogs/new", data);
      console.log(response.data);
      navigate("/portal");
    } catch (err) {
      console.log("Error creating dog: ", err);
      deleteCloudinaryImages(data.images);
      toast.error(
        "Could not create new dog profile. Please contact support team for help.",
        {
          toastId: "create_dog_error",
        }
      );
    }
    setIsLoading(false);
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
          <div className="mb-3">
            <ImageUpload
              setImageUploads={setImageUploads}
              imageUploads={imageUploads}
              error={imageUploadsError}
              errorMsg={imageUploadErrorMsg}
            />
          </div>
          <FormButton
            text="Create Dog"
            className="w-100"
            onClick={createDog}
            disabled={isLoading}
          />
        </form>
      </div>
      <ToastContainerWrapper />
      <ImageUploadFailedErrorModal
        show={showImageFailedModal}
        handleClose={handleImageFailedModalClose}
        handleShow={handleImageFailedModalShow}
        modalTitle={"Image Upload Error!"}
        description={
          "Profile cannot be published because the images failed to upload. Please contact the support team for help uploading images."
        }
        question={"Would you like to save this profile as draft?"}
        onClick={saveDraft}
      />
      <ImageUploadErrorModal
        show={showImageErrorModal}
        handleClose={handleImageErrorModalClose}
        handleShow={handleImageErrorModalShow}
        modalTitle={"Image Upload Error!"}
        description={
          "Some images failed to upload. Please contact the support team for help with uploading images."
        }
        question={
          "Would you like to save this profile as draft or publish with the successfully uploaded images?"
        }
        saveDraft={saveDraft}
        publishProfile={publishProfile}
      />
    </div>
  );
}

export default DogForm;
