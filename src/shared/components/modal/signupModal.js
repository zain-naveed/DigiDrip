import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { SignUpImage } from "../../../assets";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/userSlice";
import "./signup.css";
import { RegisterUser } from "../../services";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { RegistrationVS } from "../../util/validation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupModal({ openModal, HideModal, address }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    username: "",
    role: "",
  };

  const handleSignUp = async (values, action) => {
    let obj = {};
    if (address) {
      obj["userName"] = values.username;
      obj["email"] = values.email;
      obj["role"] = values.role;
      obj["address"] = String(address);
    }

    await RegisterUser(obj)
      .then((res) => {
        let resp = {
          user: res.data.user,
          token: res.data.tokens,
        };
        dispatch(setUser(resp));
        action.setSubmitting(false);
        history.push("/");
        toast.success("User Registered Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        HideModal();
      })
      .catch((err) => {
        action.setSubmitting(false);
        toast.error(
          err?.response?.data?.message
            ? err.response.data.message
            : "Check your Network Connection",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
        // console.log(err.response.data.message);
      });
    // if (RegistrationResponse?.res) {
    //   HideModal();
    // } else {

    // }
    // HideModal();
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
      <div className="modal-body modal-body-flex">
        <div className="login-bg">
          <img
            src={SignUpImage}
            alt="register-modal"
            className="signup-image"
          />
        </div>
        <div className="signup-login-form">
          <p className="signup-heading">Create a DigitalArt Crypto</p>
          <p className="signup-heading">Account</p>
          <div className="address-container">
            <p className="address-heading">ADDRESS</p>
            <p className="address">{address}</p>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, action) => {
              action.setSubmitting(true);
              handleSignUp(values, action);
            }}
            validationSchema={RegistrationVS}
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
              <div className="formik-container">
                <div className="signup-input-container">
                  <input
                    type="text"
                    placeholder="username*"
                    onChange={handleChange("username")}
                    value={values.username}
                    className="input-value"
                  />
                </div>
                <div className="error">
                  {touched.username && errors.username ? errors.username : ""}
                </div>
                <div className="signup-input-container">
                  <input
                    type="text"
                    placeholder="email*"
                    onChange={handleChange("email")}
                    value={values.email}
                    className="input-value"
                  />
                </div>
                <div className="error">
                  {touched.email && errors.email ? errors.email : ""}
                </div>
                <div className="left">
                  {" "}
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="user"
                      onChange={(e) => setFieldValue("role", e.target.value)}
                    />
                    <label class="form-check-label" for="inlineRadio1">
                      User
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="artist"
                      onChange={(e) => setFieldValue("role", e.target.value)}
                    />
                    <label class="form-check-label" for="inlineRadio2">
                      Artist
                    </label>
                  </div>
                  <div className="error">
                    {touched.role && errors.role ? errors.role : ""}
                  </div>
                </div>

                <button
                  type="submit"
                  className="signup-button mt-3"
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <Spinner animation="grow" size="sm" />
                  ) : (
                    <p className="mb-0">Sign up</p>
                  )}
                </button>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
}

export default SignupModal;
