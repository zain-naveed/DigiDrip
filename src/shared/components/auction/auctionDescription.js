import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Bidding } from "../../../assets";
import styles from "../../../pages/tour/auction/pastel.module.scss";
import LoginModal from "../modal/loginModal";
import SignupModal from "../modal/signupModal";
import moment from "moment";
import Countdown from "react-countdown";
import { useSelector, useDispatch } from "react-redux";
import BidModal from "../modal/bidModal";
import EditProfileModal from "../modal/editProfileModal";
import BidConMessage from "./bidConMessage";
import { CheckDate, convertToEther, convertToWei } from "../../util/dateValid";
import { cancelNftSale, buyNft } from "../../services/contract.service";
import { setLoaderSlice } from "../../../shared/redux/reducers/LoaderSlice";
import { toastMessage } from "../common/toast";
import { useHistory } from "react-router";

function AuctionDescription({ singleArtwork }) {
  const [showModal, setShowModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [address, setAddress] = useState("");
  const { user } = useSelector((state) => state.root.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const closeModal = () => setLoginModal(false);
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const [showModal2, setShowModal2] = useState(false);
  const handleToggleModal2 = () => {
    setShowModal2(!showModal2);
    setShowModal(false);
  };
  const closeModal1 = () => {
    setLoginModal(!LoginModal);
  };
  const closeSignUpModal = () => {
    setSignupModal(!signupModal);
  };

  const cancelSale = () => {
    dispatch(setLoaderSlice({ Loader: true }));
    let params = {
      saleId: singleArtwork.contractSaleId,
    };
    cancelNftSale(params)
      .then(() => {
        dispatch(setLoaderSlice({ Loader: false }));
        toastMessage(
          "Removing your Nft from sale, Please wait as it might take around 5 mins"
        );
        history.push("/tour");
      })
      .catch(() => {
        dispatch(setLoaderSlice({ Loader: false }));
        toastMessage("There was an error in removing Nft from sale");
      });
  };

  const buyIt = () => {
    dispatch(setLoaderSlice({ Loader: true }));
    let params = {
      saleId: singleArtwork.contractSaleId,
      amount: `${singleArtwork.price}`,
    };
    buyNft(params)
      .then(() => {
        dispatch(setLoaderSlice({ Loader: false }));
        toastMessage(
          "Buying NFT, Please wait as it might take from around 5mins"
        );
        history.push("/tour");
      })
      .catch(() => {
        dispatch(setLoaderSlice({ Loader: false }));
        toastMessage("There was an error in removing Nft from sale");
      });
  };

  return (
    <>
      <div className="col-lg-4">
        <div className="pastel-path-col-text">
          <h3>{singleArtwork?.artwork?.name}</h3>
          {/* <h6>Edition 1 of 1</h6> */}
          <p style={{ wordBreak: "break-word" }}>
            {singleArtwork?.artwork?.description}
          </p>
          {/* <span>#2D #anim #animation #colour #illustration #japan #pastel</span> */}
          {!user && (
            <a
              href="javascript:void(0)"
              onClick={() => setLoginModal(true)}
              className="custom-site-btn"
            >
              SIGN UP TO COLLECT
            </a>
          )}
          {console.log(singleArtwork?.endTime)}

          <div id="countdown">
            {!singleArtwork?.artwork?.openForSale ? (
              <>
                <h6>AUCTION ENDS IN</h6>
                <Countdown
                  daysInHours={true}
                  date={
                    singleArtwork?.endTime
                      ? new Date(singleArtwork?.endTime)
                      : Date.now() + 1000
                  }
                ></Countdown>
                <ul>
                  <li>
                    <span id="hours"></span>Hours
                  </li>
                  <li>
                    <span id="minutes"></span>Minutes
                  </li>
                  <li>
                    <span id="seconds"></span>Seconds
                  </li>
                </ul>
              </>
            ) : (
              ""
            )}

            {singleArtwork?.artwork?.openForSale ? (
              <div
                className={`current-high-bid ${
                  singleArtwork?.artwork?.openForSale
                    ? "current-border-none"
                    : ""
                }`}
              >
                <h6>SELLING PIRCE (ETHER):</h6>
                <h3> {convertToEther(singleArtwork?.price)}</h3>
                <span>
                  By @
                  {singleArtwork?.owner?.userName.charAt(0).toUpperCase() +
                    singleArtwork?.owner?.userName.slice(1)}
                </span>
              </div>
            ) : singleArtwork?.bids?.length > 0 ? (
              <div className={`current-high-bid `}>
                <h6>CURRENT HIGH BID :</h6>
                <h3> {convertToEther(singleArtwork?.bids[0].bid_amount)}</h3>
                <span>By @{singleArtwork?.bids[0].bidder.userName}</span>
              </div>
            ) : (
              <div className="current-high-bid">
                <h6>BASE PIRCE (ETHER):</h6>
                <h3> {convertToEther(singleArtwork?.initialPrice)}</h3>
                <span>
                  By @
                  {singleArtwork?.owner?.userName.charAt(0).toUpperCase() +
                    singleArtwork?.owner?.userName.slice(1)}
                </span>
              </div>
            )}
          </div>
        </div>
        {user &&
        user?._id != singleArtwork?.owner?._id &&
        singleArtwork?.artwork?.isAuctionOpen ? (
          CheckDate(singleArtwork?.endTime) ? (
            <button
              className={styles.modifiedButton}
              onClick={handleToggleModal}
            >
              Place a bid
            </button>
          ) : (
            <button disabled={true} className={styles.modifiedButton}>
              Auction Closed
            </button>
          )
        ) : user?._id == singleArtwork?.owner?._id &&
          singleArtwork?.artwork?.openForSale ? (
          <button onClick={cancelSale} className={styles.modifiedButton}>
            Cancel
          </button>
        ) : user &&
          user?._id != singleArtwork?.owner?._id &&
          singleArtwork?.artwork?.openForSale ? (
          <button onClick={buyIt} className={styles.modifiedButton}>
            Buy NFT
          </button>
        ) : (
          ""
        )}
      </div>
      <BidModal
        showModal={showModal}
        handleToggleModal={handleToggleModal}
        artDetail={singleArtwork}
        confirmMessage={handleToggleModal2}
      />
      <EditProfileModal
        openModal={showModal2}
        HideModal={handleToggleModal2}
        size="xl"
        centered
      >
        <BidConMessage handleToggleModal2={handleToggleModal2} />
      </EditProfileModal>

      <LoginModal
        openModal={loginModal}
        HideModal={closeModal}
        OpenModal1={() => setSignupModal(true)}
        setAddress={setAddress}
      />
      <SignupModal
        openModal={signupModal}
        HideModal={closeSignUpModal}
        address={address}
      />
    </>
  );
}

export default AuctionDescription;
