import React from "react";
import "./FormInput.css";

function FormInput({
  label,
  img,
  type,
  min,
  max,
  placeholder,
  name,
  id,
  error,
  errorMsg,
  onChange,
  value,
}) {
  return (
    <div className="input-wrapper">
      {label?.length > 0 ? (
        <label htmlFor={id} className="text-blue-1">
          {label}
        </label>
      ) : null}
      <div
        className={`input d-flex align-items-center ${
          error ? "input-error" : ""
        }`}
      >
        {img && <img src={img} alt="" className="input-logo" />}
        <input
          type={type}
          value={value}
          min={min}
          placeholder={placeholder}
          name={name}
          id={id}
          className="input-box ps-3"
          onChange={onChange}
        />
      </div>
      {error && errorMsg.length > 0 && (
        <small className="error-msg text-wrap">{errorMsg}</small>
      )}
    </div>
  );
}

export default FormInput;
