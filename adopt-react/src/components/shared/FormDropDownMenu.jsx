import React, { useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "./FormDropDownMenu.css";

function FormDropDownMenu({ title, items, error }) {
  const [dropdownTitle, setDropdownTitle] = useState(title);

  const handleSelect = (itemAction, itemLabel) => {
    setDropdownTitle(itemLabel);
    itemAction();
  };
  return (
    <div className={` dropdown-wrapper ${error ? "dropdown-error" : ""}`}>
      <DropdownButton
        className="btn-block"
        id="dropdown-basic-button"
        title={dropdownTitle}
      >
        {items.map((item) => {
          return (
            <Dropdown.Item
              className="w-100"
              key={`option-${item.label}`}
              onClick={() => {
                handleSelect(item.action, item.label);
              }}
            >
              {item.label}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </div>
  );
}

export default FormDropDownMenu;
