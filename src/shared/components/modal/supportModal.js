import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { SUPPORT_VALIDATION_SCHEMA } from "../../util/validation";
import { Formik } from "formik";
import { toastMessage } from "../common/toast";
// import EditProfileInput from "../editProfile/EditProfileInput";
import Nftinput from "../common/nftinput";
import {gpostMail} from "../../../shared/services/general.service";

function SupportModal({ openModal, HideModal }) {
  const [loader, setLoader] = useState(false);
  const initialValues = {
    email: "",
    message: "",
  };
  const handleSubmit = (obj) => {
    setLoader(true);
    gpostMail(obj).then(({data})=>{
      setLoader(false);
      toastMessage("Thank you to Support Us!", "success");
      HideModal();
    }).catch((err)=>{
      setLoader(false);
    })
    
  };
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
      <Formik
        initialValues={initialValues}
        onSubmit={(values, action) => {
          handleSubmit(values);
        }}
        validationSchema={SUPPORT_VALIDATION_SCHEMA}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <div className="modal-body" style={{ padding: "38px 0" }}>
            {console.log(errors)}
            <div className="custom-nft-form">
              <h3 style={{ marginBottom: "25px" }}>Support Us</h3>
              <Nftinput
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                placeholder="info@gmail.com"
              />
              {errors.email && touched.email ? (
                <ErrorFor msg={errors.email} />
              ) : (
                ""
              )}
              <div className="input-container">
                <textarea
                  value={values.message}
                  onChange={handleChange("message")}
                  placeholder="Your Message"
                ></textarea>
              </div>
              {errors.message && touched.message ? (
                <ErrorFor msg={errors.message} />
              ) : (
                ""
              )}
              <button
                className="custom-site-btn mt-4"
                style={{ marginLeft: "auto" }}
                onClick={handleSubmit}
              >
                {loader ? <Spinner animation="grow" size="sm" /> : "Submit"}
              </button>
            </div>
          </div>
        )}
      </Formik>
    </Modal>
  );
}
const ErrorFor = ({ msg }) => {
  return (
    <h5 style={{ color: "red", lineHeight: "0.2", fontSize: "17px" }}>{msg}</h5>
  );
};

export default SupportModal;
