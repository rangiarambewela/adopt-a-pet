import React from "react";
import "./FormTextArea.css";

function FormTextArea({
  label,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  errorMessage,
}) {
  return (
    <div>
      <h5 htmlFor={name} className="d-block">
        {label}
      </h5>
      <textarea
        name={name}
        id={name}
        cols="30"
        rows="8"
        placeholder={placeholder}
        value={value}
        className={`w-100 description-area p-3 ${error ? "error-border" : ""}`}
        onChange={onChange}
        onBlur={onBlur}
      ></textarea>
      {error && errorMessage.length > 0 && (
        <small className="error-msg text-wrap">{errorMessage}</small>
      )}
    </div>
  );
}

export default FormTextArea;
