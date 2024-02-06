import React, { useState, useEffect } from "react";
import "../auction/pastel.module.scss";
import { useSelector, useDispatch } from "react-redux";
import SignupModal from "../../../shared/components/modal/signupModal";
import LoginModal from "../../../shared/components/modal/loginModal";
import { useLocation, useParams } from "react-router-dom";
import {
  getSingleArtService,
  getSaleDetail,
  increaseViewCountService,
  auctionHistoryService,
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
export default function MarketDetail(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const param = useParams();
  const { user } = useSelector((state) => state.root);
  const [saleDetail, setSaleDetail] = useState(null);
  const [auctionHistory, setAuctionHis] = useState([]);
  const getSignleArtwork = () => {
    dispatch(setLoaderSlice({ Loader: true }));
    getSaleDetail(param.id)
      .then((res) => {
        setSaleDetail(res.data.data);
        console.log(res.data.data);
        dispatch(setLoaderSlice({ Loader: false }));
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

  useEffect(() => {
    getSignleArtwork();
  }, []);

  return (
    <div>
      <section className="pastel-path-content">
        <div className="container">
          <div className="row">
            {saleDetail ? (
              <AuctionDescription singleArtwork={saleDetail} />
            ) : null}
            <AuctionImage singleArtwork={saleDetail} />
            <AuctionOwner singleArtwork={saleDetail} />
          </div>
        </div>
      </section>
    </div>
  );
}
