import React, { useEffect, useState } from "react";
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
  getSingleArtService,
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
import { createAution } from "../../services/contract.service";
import { AUCTION_MINT_STATUS } from "../../util/enums";
import { useHistory } from "react-router-dom";

const OptionsModal = ({ openModal, HideModal, artDetail }) => {
  const history = useHistory();
  console.log(Number(convertToEther(artDetail?.price)));
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState(null);
  const [price, setPrice] = useState(
    Number(convertToEther(artDetail?.price)) || null
  );
  const [time, setTime] = useState(new Date());
  const [pic, setPic] = useState(artDetail?.artwork_url);
  const { userProfile } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  useEffect(() => {
    setPrice(Number(convertToEther(artDetail?.price)));
    setPic(artDetail?.artwork_url);
  }, [artDetail?.price, artDetail?.artwork_url]);
  const CheckDate = (endDate) => {
    const todayMintues = new Date().getMinutes();
    const todayHours = new Date().getHours();
    const endHours = new Date(endDate).getHours();
    const endMinutes = new Date(endDate).getMinutes();
    const checkDay = SelectedDay(endDate);
    const today = getToday();

    if (checkDay > today) {
      return true;
    } else if (checkDay == today) {
      if (endHours > todayHours) {
        return true;
      } else if (endHours == todayHours) {
        if (endMinutes > todayMintues) {
          return true;
        } else {
          toastMessage(
            "You Can't Select the Same Time as Current Time",
            "error"
          );
          return false;
        }
      } else if (endHours < todayHours) {
        toastMessage(
          "Your Selected Time is Smaller Your Current Time",
          "error"
        );
        return false;
      } else {
        toastMessage(
          "You Can't Select the Same Time & Date as Current Date",
          "error"
        );
        return false;
      }
    } else {
      toastMessage(
        "You Selected is Date is Smaller for the Current Date!!",
        "error"
      );
      return false;
    }
  };

  const handleConfirm = () => {
    if (value) {
      const getdt = startDate;
      let hour = value?.replace(/:/, ",");
      const getdate = getdt.setHours(
        parseInt(hour.split(",")[0]),
        parseInt(hour.split(",")[1])
      );

      let validate = CheckDate(getdate);
      if (validate) {
        setStartDate(new Date(getdate));
        var getunix = moment(getdate).unix() * 1000;
        let obj = {
          initialPrice: price,
          artwork: artDetail?._id,
          endTime: getunix,
        };
        auction(obj);
      }
    } else {
      const checkDay = SelectedDay(startDate);
      const today = getToday();
      if (new Date(checkDay) > new Date(today)) {
        var getunix = moment(startDate).unix() * 1000;
        let obj = {
          initialPrice: price,
          artwork: artDetail?._id,
          endTime: getunix,
        };
        auction(obj);
      } else {
        toastMessage(
          "You Can't Select the Same Time & Date as Current Date",
          "error"
        );
      }
    }
  };
  const resetState = () => {
    setStartDate(new Date());
    onChange(null);
    setPrice(Number(convertToEther(artDetail?.price)));
    setTime(new Date());
    setPic(artDetail?.artwork_url);
    return true;
  };
  const auction = async (obj) => {
    dispatch(setLoaderSlice({ Loader: true }));
    let params = {
      collectionAddress: artDetail.collectionId.collectionAddress
        ? artDetail.collectionId.collectionAddress
        : artDetail.collectionAddress,
      tokenId: artDetail.tokenId,
      startPrice: convertToWei(obj.initialPrice),
      startTime: moment.utc().format("X"),
      endTime: moment(obj.endTime).utc().format("X"),
    };
    createAution(params)
      .then(async (res) => {
        dispatch(setLoaderSlice({ Loader: false }));
        mutateUserDropsAndCollectionArt(artDetail._id, false, false);
        toastMessage("Auction minting in progress", "success");
        history.push("/tour");
        // let p = {
        //   artworkId: artDetail._id,
        //   status: AUCTION_MINT_STATUS.PENDING,
        // };
        // mintAuction(p).then(async (res) => {
        //   mutateUserDropsAndCollectionArt(res?.data?.data._id, false, false);`
        //   dispatch(setLoaderSlice({ Loader: false }));
        //   toastMessage("Auction minting in progress", "success");
        // });
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoaderSlice({ Loader: false }));
      });
  };
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
      {console.log(artDetail)}
      <div className="row main-ctn">
        <h1 className="heading mb-4"> Confirm Auction of your Amazing Art</h1>
        <div className="col-sm-5 text-center">
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
                onChange={(e) => setPrice(e.target.value)}
                className="lg-input mb-3"
              />
            </div>
            <label className="label">Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
              className="lg-input"
            />
            <label className="label">Time</label>
            <TimePicker
              onChange={(e) => {
                setTime(e);
                onChange(e);
              }}
              value={time}
              className="lg-input mb-4"
              format="h:m:s a"
              disableClock={false}
            />
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

export default OptionsModal;
