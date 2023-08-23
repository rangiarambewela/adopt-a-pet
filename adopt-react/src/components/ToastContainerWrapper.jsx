import { ToastContainer, Slide } from "react-toastify";

import React from "react";

function ToastContainerWrapper() {
  return (
    <ToastContainer
      draggable={false}
      autoClose={5000}
      position="bottom-left"
      transition={Slide}
    />
  );
}

export default ToastContainerWrapper;
