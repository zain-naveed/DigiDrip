import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import "./deleteArt.css";
import { deleteArtService } from "../../services";
function DeleteConfirmationArt({ openModal, HideModal, response }) {
  const [loader, setLoader] = useState(false);
  const handelDelete = () => {
    setLoader(true);
    let obj = { artworkId: response?._id };
    deleteArtService(obj, (bool) => {
      if (bool) {
        setLoader(false);
        HideModal();
      }
    });
  };

  return (
    <Modal
      backdrop="static"
      show={openModal}
      onHide={HideModal}
      centered
      dialogClassName="modal-30w"
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="para">Are You Sure Delete The Art?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary px-4" onClick={handelDelete} disabled={loader}>
          {loader ? <Spinner animation="grow" size="sm" /> : "Yes"}
        </Button>
        <Button variant="danger px-4" onClick={HideModal}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmationArt;
