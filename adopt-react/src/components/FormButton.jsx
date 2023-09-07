import React from "react";
import "./FormButton.css";

function FormButton({ text, className, onClick, disabled }) {
  return (
    <button
      type="button"
      className={`form-btn ${className} ${disabled ? "disabled-btn" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="text-center btn-text">{text}</div>
    </button>
  );
}

export default FormButton;
