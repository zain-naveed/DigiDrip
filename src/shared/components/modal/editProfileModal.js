import React from "react";
import { Modal, Button } from "react-bootstrap";
// import EditProfileInput from "../editProfile/EditProfileInput";

function EditProfileModal({ openModal, HideModal, children }) {
  return (
    <Modal
      size="lg"
      backdrop="static"
      show={openModal}
      onHide={HideModal}
      centered
    >
      <button
        type="button"
        className="close custom-modal-close"
        onClick={HideModal}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="modal-body modal-body-flex">{children}</div>
    </Modal>
  );
}

export default EditProfileModal;
