import React, { Component, useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";

//== import "../../../assets/css/all.css";
import logo from "../../../assets/images/logo.png";
import Search from "../../../assets/images/search.svg";
import profile from "../../../assets/images/author-img2.png";

import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/reducers/userSlice";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import LoginModal from "../modal/loginModal";
import SignupModal from "../modal/signupModal";
import SubmitNftModal from "../modal/submitNftModal";
import { useHistory } from "react-router-dom";
import { ProfilePlaceHolder } from "../../../assets";
import { GetUserAllCollection } from "../../services";
import Web3 from "web3";
import SupportModal from "../modal/supportModal";
export default function Header(props) {
  const history = useHistory();
  const [balance, setBal] = useState(0);

  const signOutPressHandler = () => {
    confirmAlert({
      message: "Are you sure you want to Sign Out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            history.push("/");
            setBal(0);

            dispatch(resetUser());
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const [address, setAddress] = useState("");

  const [isOpen, setOpen] = useState(false);
  const [isOpen1, setOpen1] = useState(false);
  const [isOpen2, setOpen2] = useState(false);
  const [isOpen3, setOpen3] = useState(false);
  const [supportModal, setSupportModal] = useState(false);
  const [collectionArr, setCollectionArr] = useState([]);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const openModal1 = () => setOpen1(true);
  const closeModal1 = () => setOpen1(false);
  const openModal2 = () => setOpen2(true);
  const closeModal2 = () => setOpen2(false);
  const openModal3 = () => setOpen3(true);
  const closeModal3 = () => setOpen3(false);
  const closeSupportModal = () => setSupportModal(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.root.user);

  const isLoggedIn = user;

  const getUserCollection = () => {
    if (user && user?.user?._id) {
      GetUserAllCollection(user?.user?._id)
        .then((res) => {
          setCollectionArr(res?.data?.data);
        })
        .catch((err) => setCollectionArr([]));
    }
  };

  useEffect(() => {
    getUserCollection();
  }, [isOpen2]);
  const getBalance = async () => {
    if (window.ethereum) {
      if (user?.user?.address) {
        let web3Instance = await new Web3(window.ethereum);
        let bal = await web3Instance.eth.getBalance(user?.user?.address);
        let ether = await web3Instance.utils.fromWei(bal, "ether");
        setBal(Number(ether).toFixed(5));
      }
    }
  };
  getBalance();
  return (
    <div>
      <header>
        <div className="container">
          <div className="header-flex">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="cus-navigation">
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>

                  <li>
                    <Link to="/driptivity">Driptivity</Link>
                  </li>
                  {/* {isLoggedIn?.token && (
                    <li>
                      <Link to="/profile">Activity</Link>
                    </li>
                  )} */}
                  <li>
                    <Link to="/work">How It Works</Link>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      data-toggle="modal"
                      onClick={() => setSupportModal(true)}
                    >
                      Support
                    </a>
                  </li>
                  <li>
                    <Link to="/tour">Tour</Link>
                  </li>
                  {isLoggedIn?.token && (
                    <>
                      {isLoggedIn?.user?.role == "artist" && (
                        <li>
                          <a href="#" data-toggle="modal" onClick={openModal2}>
                            Submit NFTs
                          </a>
                        </li>
                      )}

                      <li>
                        <Link to="/offers">Dashboard</Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
              <div className="search-field" onClick={openModal3}>
                <Link to="/search">
                  <a href="#">
                    <img src={Search} alt="search" />
                  </a>
                </Link>
              </div>
              {!isLoggedIn?.token && (
                <div className="header-btn">
                  <a href="#" className="custom-site-btn" onClick={openModal}>
                    Create an Account
                  </a>
                  <a
                    href="#"
                    className="custom-site-btn custom-site-btn2"
                    onClick={openModal}
                  >
                    Login
                  </a>
                </div>
              )}

              {isLoggedIn?.token && (
                <Link to="/profile">
                  <div className="profile-ctn">
                    {/* <div className="profile-absolute">1</div> */}
                    <img
                      src={
                        user?.user?.profilePic
                          ? user?.user?.profilePic + "?" + new Date().getTime()
                          : ProfilePlaceHolder
                      }
                      className="profile-pic"
                    />
                    <p className="profile-amount">{balance}</p>
                  </div>
                </Link>
              )}

              {isLoggedIn?.token && (
                <button
                  onClick={signOutPressHandler}
                  className="custom-site-btn3"
                >
                  Sign Out
                </button>
              )}
              <div className="menu-bar">
                <i className="fa fa-bars" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="empty-header"></div>
      <LoginModal
        openModal={isOpen}
        HideModal={closeModal}
        OpenModal1={openModal1}
        setAddress={setAddress}
      />
      <SignupModal
        openModal={isOpen1}
        HideModal={closeModal1}
        address={address}
      />
      <SubmitNftModal
        openModal={isOpen2}
        HideModal={closeModal2}
        collectnArr={collectionArr}
      />
      <SupportModal openModal={supportModal} HideModal={closeSupportModal} />
    </div>
  );
}
