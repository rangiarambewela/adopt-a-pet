import React from "react";

function ImageUpload({ imageUploads, setImageUploads, error, errorMsg }) {
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
    </div>
  );
}

export default ImageUpload;
