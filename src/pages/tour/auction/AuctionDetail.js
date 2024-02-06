import React, { useState, useEffect } from "react";

import Countdown from "react-countdown";
import styles from "./pastel.module.scss";
import { Modal } from "react-bootstrap";
import "./pastel.module.scss";
import { useSelector, useDispatch } from "react-redux";
import SignupModal from "../../../shared/components/modal/signupModal";
import LoginModal from "../../../shared/components/modal/loginModal";
import { useLocation, useParams } from "react-router-dom";
import {
  getSingleArtService,
  increaseViewCountService,
  auctionHistoryService,
  getAuctionDetail,
} from "../../../shared/services";

import { setLoaderSlice } from "../../../shared/redux/reducers/LoaderSlice";
import AuctionDescription from "../../../shared/components/auction/auctionDescription";
import AuctionImage from "../../../shared/components/auction/auctionImage";
import AuctionOwner from "../../../shared/components/auction/auctionOwner";
import AuctionHistory from "../../../shared/components/auction/auctionHistory";
import RelatedArts from "../../../shared/components/auction/relatedArts";
// import EditProfileModal from "../../../shared/components/modal/editProfileModal";
// import AuctionBid from "../../../shared/components/auction/auctionBid";
// import { Bidding } from "../../../assets";
import { toastMessage } from "../../../shared/components/common/toast";
export default function PastelPathDetail(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const param = useParams();
  const { user } = useSelector((state) => state.root);
  const [singleArtwork, setSingleArtwork] = useState(null);
  const [auctionHistory, setAuctionHis] = useState([]);
  const getSignleArtwork = () => {
    dispatch(setLoaderSlice({ Loader: true }));
    getAuctionDetail(param.id)
      .then((res) => {
        setSingleArtwork(res.data.data);
        dispatch(setLoaderSlice({ Loader: false }));
        getAuctionHistory(param.id);
        if (
          res?.data?.data?.creater?._id !== user?.user?._id &&
          res?.data?.data?.owner?._id !== user?.user?._id
        ) {
          increaseViewCountService(res?.data?.data?.artwork?._id);
        }
      })
      .catch((err) => {
        dispatch(setLoaderSlice({ Loader: false }));
        toastMessage(err?.response?.data?.message, "error");
      });
  };
  const getAuctionHistory = (aucId) => {
    if (aucId) {
      auctionHistoryService(aucId, (res) => {
        if (res) {
          setAuctionHis(res?.data?.data);
        }
      });
    }
  };
  useEffect(() => {
    getSignleArtwork();
  }, []);

  return (
    <div>
      <section className="pastel-path-content">
        <div className="container">
          <div className="row">
            {singleArtwork ? (
              <AuctionDescription singleArtwork={singleArtwork} />
            ) : null}
            <AuctionImage singleArtwork={singleArtwork} />
            <AuctionOwner singleArtwork={singleArtwork} />
          </div>
        </div>
      </section>
      <AuctionHistory history={auctionHistory} />
      <RelatedArts />
    </div>
  );
}
