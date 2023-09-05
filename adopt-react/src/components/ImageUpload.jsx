import React from "react";
import { useState } from "react";
import axios from "axios";

function ImageUpload({ imageUploads, setImageUploads, error, errorMsg }) {
  // const [imageUploads, setImageUploads] = useState([]);
  // const cloudinaryUpload = async (image) => {
  //   const formData = new FormData();
  //   formData.append("file", image);
  //   formData.append(
  //     "upload_preset",
  //     process.env.REACT_APP_CLOUNDINARY_UPLOAD_PRESET
  //   );

  //   const req_url =
  //     "https://api.cloudinary.com/v1_1/" +
  //     process.env.REACT_APP_CLOUNDINARY_CLOUD_NAME +
  //     "/image/upload";
  //   try {
  //     const res = await axios.post(req_url, formData);
  //     console.log("RESULT: ", res);
  //     return res.data.url;
  //   } catch (e) {
  //     console.log("ERROR UPLOADING: ", e);
  //   }
  // };

  // const uploadImages = async () => {
  //   var images = [];
  //   for (const image of imageUploads) {
  //     // making post request
  //     const imageURL = await cloudinaryUpload(image);
  //     images.push(imageURL);
  //   }
  //   console.log("PRINTING OUT IMAGES AFTER UPLOAD");
  //   console.log(images);
  // };
  return (
    <div className="">
      <p>Upload Images</p>
      <label
        className={`input cursor-pointer ${error ? "input-error" : ""}`}
        htmlFor="imageUpload"
      >
        {imageUploads.length > 0
          ? `${imageUploads.length} Image${
              imageUploads.length > 1 ? "s" : ""
            } Selected`
          : "Select Images"}
      </label>
      <input
        id="imageUpload"
        className="d-none "
        type="file"
        multiple
        onChange={(event) => {
          setImageUploads(event.target.files);
        }}
      />
      {error && errorMsg.length > 0 && (
        <small className="error-msg text-wrap d-block">{errorMsg}</small>
      )}
      {/* <button onClick={uploadImages}>Submit</button> */}
    </div>
  );
}

export default ImageUpload;
