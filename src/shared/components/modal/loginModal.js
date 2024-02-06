import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { LoginImage } from "../../../assets";
import { setUser } from "../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { getWeb3 } from "../../util/getWeb3";
import { useHistory } from "react-router-dom";
import "./login.css";
import { LogInUser } from "../../services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastMessage } from "../../components/common/toast";
function LoginModal({ openModal, HideModal, OpenModal1, setAddress }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isSubmitting, setSubmitting] = useState(false);

  const handleConnectedWallet = async () => {
    setSubmitting(true);
    let web3 = await getWeb3(null);
    let obj = {};
    if (!web3) {
      setSubmitting(false);
    }
    if (web3) {
      let add = await web3?.web3_instance?.eth.getAccounts();

      if (add && add?.length > 0) {
        obj["address"] = add[0];
      }

      await LogInUser(obj)
        .then((res) => {
          if (res.data.status) {
            let resp = {
              user: res.data.user,
              token: res.data.tokens,
            };
            setSubmitting(false);
            dispatch(setUser(resp));
            history.push("/");
            HideModal();
            toastMessage("User Logged In Successfully", "success");
          } else {
            setAddress(add);
            setSubmitting(false);
            HideModal();
            OpenModal1();
          }
        })
        .catch((err) => {
          setSubmitting(false);

          toastMessage(err?.response?.data?.message, "error");
        });
    }
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
      <div className="login-modal-body">
        <p className="login-heading">Welcome! Let's begin with</p>
        <p className="login-heading">your wallet.</p>
        <button
          className="connect-login-btn"
          disabled={isSubmitting}
          onClick={handleConnectedWallet}
        >
          {isSubmitting ? (
            <Spinner animation="grow" size="sm" />
          ) : (
            <p className="mb-0">Connect Wallet</p>
          )}
        </button>
        <p className="login-link">
          <u>First Time Setting Up A Wallet?</u>
        </p>
      </div>
      {/* <div className="login-bg">
          <img src={LoginImage} alt="login-background" />
        </div>
        <div className="login-form">
          <h4>Login</h4>
          <form>
            <div className="input-container">
              <input type="text" placeholder="@elorapautrat" />
            </div>
            <div className="input-container">
              <input type="password" placeholder="…………" />
            </div>
            <div className="connected-wallet-link">
              <a href="#" onClick={handleConnectedWallet}>
                Connected Wallet
              </a>
            </div>
            <input
              type="submit"
              value="Login"
              onClick={() => {
                dispatch(setUser({ _id: "1234", email: "momin@gmail.com" }));
                HideModal();
              }}
            />
          </form>
          <div className="signup-btn">
            <span>
              or{" "}
              <a
                href="#"
                data-dismiss="modal"
                data-toggle="modal"
                data-target="#register-modal"
              >
                SignUp
              </a>
            </span>
          </div>
        </div> */}
    </Modal>
  );
}

export default LoginModal;
