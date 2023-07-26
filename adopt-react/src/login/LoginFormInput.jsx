import React from "react";
import "./LoginFormInput.css";

function LoginFormInput({
  img,
  type,
  placeholder,
  name,
  id,
  error,
  errorMsg,
  onBlur,
}) {
  return (
    <div className="input-wrapper">
      <div
        className={`input d-flex align-items-center ${
          error ? "input-error" : ""
        }`}
      >
        <img src={img} alt="" className="input-logo" />
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          className="input-box ps-3"
          onBlur={onBlur}
        />
      </div>
      {error && errorMsg.length > 0 && (
        <small className="error-msg text-wrap">{errorMsg}</small>
      )}
    </div>
  );
}

export default LoginFormInput;
