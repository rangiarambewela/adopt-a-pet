import React from "react";
import { useState } from "react";
import axios from "axios";

function ImageUpload() {
  const [imageUploads, setImageUploads] = useState([]);
  const cloudinaryUpload = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUNDINARY_UPLOAD_PRESET
    );

    const req_url =
      "https://api.cloudinary.com/v1_1/" +
      process.env.REACT_APP_CLOUNDINARY_CLOUD_NAME +
      "/image/upload";
    const res = await axios.post(req_url, formData);
    return res.data.url;
  };

  const uploadImages = async () => {
    var images = [];
    for (const image of imageUploads) {
      // making post request
      const imageURL = await cloudinaryUpload(image);
      images.push(imageURL);
    }
    console.log("PRINTING OUT IMAGES AFTER UPLOAD");
    console.log(images);
  };
  return (
    <div>
      <div>
        <input
          type="file"
          multiple
          onChange={(event) => {
            setImageUploads(event.target.files);
          }}
        />
        <button onClick={uploadImages}>Submit</button>
      </div>
    </div>
  );
}

export default ImageUpload;
