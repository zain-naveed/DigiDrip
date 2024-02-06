import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "./options.css";
import "react-datepicker/dist/react-datepicker.css";
import { PlaceBid, clientMusic } from "../../../assets";
import {
  mutateUserDropsAndCollectionArt,
  startAuctionService,
  mintAuction,
} from "../../services";
import moment from "moment";
import { toastMessage } from "../common/toast";
import {
  getToday,
  SelectedDay,
  convertToWei,
  convertToEther,
} from "../../util/dateValid";
import { useSelector, useDispatch } from "react-redux";
import { setLoaderSlice } from "../../redux/reducers/LoaderSlice";
import { putNftOnSale } from "../../services/contract.service";

const SaleModal = ({ openModal, HideModal, artDetail }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState(null);
  const [price, setPrice] = useState(artDetail?.price || null);
  const [askPrice, setAskPrice] = useState(0);
  const [time, setTime] = useState(new Date());
  const [pic, setPic] = useState(artDetail?.artwork_url);
  const { userProfile } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setPrice(Number(convertToEther(artDetail?.price)));
    setPic(artDetail?.artwork_url);
  }, [artDetail?.price, artDetail?.artwork_url]);

  const handleConfirm = () => {
    dispatch(setLoaderSlice({ Loader: true }));
    let params = {
      collectionAdress:
        artDetail.collectionAddress || artDetail.collectionId.collectionAddress,
      tokenId: artDetail.tokenId,
      price: convertToWei(askPrice),
    };
    putNftOnSale(params)
      .then((res) => {
        dispatch(setLoaderSlice({ Loader: false }));
        toastMessage(
          "Minting NFT sale in progress. Usually takes 5-10 mins to appear on your tours screen. Please wait...",
          "success"
        );
        history.push("/tour");
      })
      .catch((err) => {
        dispatch(setLoaderSlice({ Loader: false }));
        console.log(err);
        toastMessage("There was an error in putting nft on for sale.", "error");
      });
  };
  const resetState = () => {};
  const auction = async (obj) => {};
  const CloseModal = () => {
    resetState();
    HideModal();
  };

  return (
    <Modal
      size="lg"
      backdrop="static"
      show={openModal}
      onHide={CloseModal}
      centered
    >
      <button
        type="button"
        className="close custom-modal-close"
        onClick={CloseModal}
      >
        <span aria-hidden="true">&times;</span>
      </button>{" "}
      <div className="row main-ctn">
        <h1 className="heading mb-4"> Confirm Sell of your Amazing Art</h1>
        <div className="col-sm-5">
          {artDetail?.artwork_type == "image" ? (
            <img
              src={pic ? pic : PlaceBid}
              alt="login-background"
              className="auction-image"
            />
          ) : artDetail?.artwork_type == "video" ? (
            <video
              className="auction-image"
              src={artDetail?.artwork_url}
              height="300px"
              width="100%"
              style={{ background: "black" }}
              loading="lazy"
              controls
            ></video>
          ) : (
            <>
              <img src={clientMusic} style={{ width: "100%" }} />
              <audio
                src={artDetail?.artwork_url}
                controls
                style={{ width: "100%", background: "#edf0f1c7" }}
              ></audio>
            </>
          )}
        </div>
        <div className="col-sm-7">
          <div className="bidFooter">
            <label className="label">Base Price (In Ethers)</label>
            <div className="options-inline" style={{ width: "100%" }}>
              <input
                type="number"
                value={price}
                // onChange={(e) => setPrice(e.target.value)}
                className="lg-input mb-3"
              />
            </div>
            <label className="label">Asking Price (In Ethers)</label>
            <div className="options-inline" style={{ width: "100%" }}>
              <input
                type="number"
                value={askPrice}
                onChange={(e) => setAskPrice(e.target.value)}
                className="lg-input mb-3"
              />
            </div>
          </div>
          <input
            style={{ left: "16px", bottom: "-48px", width: "92% !important" }}
            type="submit"
            value="Confirm"
            className="confirm"
            onClick={handleConfirm}
          />
        </div>
      </div>
    </Modal>
  );
};

export default SaleModal;
