import React from "react";
import "./FormButton.css";

function FormButton({ text, className, onClick }) {
  return (
    <button className={`form-btn ${className}`} onClick={onClick}>
      <div className="text-center btn-text">{text}</div>
    </button>
  );
}

export default FormButton;
