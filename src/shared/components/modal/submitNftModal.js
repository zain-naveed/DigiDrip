import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { EmptyBox } from "../../../assets";
import SubmitNftForm from "../../../pages/form/submitNftForm";
import Animation from "../common/Animation";
import { useHistory } from "react-router-dom";

function SubmitNftModal({ openModal, HideModal, collectionobj, collectnArr }) {
  const history = useHistory();

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
      <Modal.Body className="modal-body modal-body-flex">
        {collectnArr && collectnArr?.length ? (
          <SubmitNftForm HideModal={HideModal} collectnArr={collectnArr} />
        ) : collectionobj ? (
          <SubmitNftForm HideModal={HideModal} collectionobj={collectionobj} />
        ) : (
          <div
            onClick={() => {
              history.push("/create-collection");
              HideModal();
            }}
          >
            <Animation
              Pic={EmptyBox}
              Message={"You have No Collection First Create Your Collection"}
            />
          </div>
        )}
        {/* </div> */}
      </Modal.Body>
    </Modal>
  );
}

export default SubmitNftModal;
