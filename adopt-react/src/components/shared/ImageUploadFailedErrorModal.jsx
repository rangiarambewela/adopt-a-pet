import React from "react";
import Modal from "react-bootstrap/Modal";

function ImageUploadErrorModal({
  show,
  handleClose,
  handleShow,
  modalTitle,
  description,
  question,
  onClick,
}) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center text-error">
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">{description}</p>
          <p>{question}</p>
        </Modal.Body>
        <Modal.Footer className="">
          <div className="px-3 d-flex justify-content-end align-items-center gap-1">
            <button
              className="btn col-auto mb-0 modal-action-btn-secondary"
              onClick={onClick}
            >
              Save Draft
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImageUploadErrorModal;
