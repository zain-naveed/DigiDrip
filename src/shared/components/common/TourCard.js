import React from "react";
import { useHistory } from "react-router-dom";
import { ProfilePlaceHolder, clientMusic } from "../../../assets";
import Project2 from "../../../assets/images/driptivity-img3.png";
import moment from "moment";
import "./tourCard.css";
import { useSelector } from "react-redux";
import { convertToEther, convertToWei } from "../../util/dateValid";
const TourCard = ({ resp }) => {
  console.log(resp);
  const history = useHistory();
  const user = useSelector((state) => state.root.user);
  const navigateUser = () => {
    if (user?.token) {
      if (resp?.owner?._id == user?.user?._id) {
        history.push({
          pathname: `/profile`,
        });
      } else {
        history.push({
          pathname: `/viewProfile/${resp?.owner?._id}`,
        });
      }
    } else {
      history.push({
        pathname: `/viewProfile/${resp?.owner?._id}`,
      });
    }
  };
  const navigateArt = (resp) => {
    history.push({
      pathname: `${
        resp?.artwork?.isAuctionOpen
          ? `/auction/${resp?.artwork?.auction}`
          : `/sale/${resp?.artwork?.sale}`
      }`,
      state: resp,
    });
  };
  return (
    <>
      <div className="recent-activity-img change">
        {resp?.artwork?.artwork_type == "image" ? (
          <img
            src={
              resp?.artwork?.artwork_url ? resp?.artwork?.artwork_url : Project2
            }
            alt="driptivity-img3"
            style={{ height: "200px", width: "100%" }}
            onClick={() => navigateArt(resp)}
          />
        ) : resp?.artwork?.artwork_type == "video" ? (
          <video
            src={resp?.artwork?.artwork_url}
            height="200px"
            width="100%"
            style={{ background: "black" }}
            onClick={() => navigateArt(resp)}
            loading="lazy"
          ></video>
        ) : (
          <img
            src={clientMusic}
            alt="drops-img1"
            // className="image"
            // min-height="270px"
            width="100%"
            onClick={() => navigateArt(resp)}
            loading="lazy"
          />
        )}
      </div>
      <div className="recent-activity-text">
        <div className="driptivity-person-img">
          <img
            className="tour-avatar"
            src={
              resp?.owner?.profilePic
                ? resp?.owner?.profilePic
                : ProfilePlaceHolder
            }
            alt="author-img3"
            onClick={navigateUser}
          />
        </div>
        <div className="driptivity-person-text">
          <h6>
            <span onClick={navigateUser} className="cursor">
              @{resp?.owner?.userName}
            </span>{" "}
            {console.log(resp)}
            has created an
            {resp?.artwork?.openForSale ? " Sale " : " auction "}
            with base price of{" "}
            {resp?.initialPrice
              ? `${convertToEther(resp?.initialPrice)} Ether `
              : `${convertToEther(resp?.price)} Ether `}
            on{" "}
            <span
              onClick={() => history.push(`/Art/${resp?.artwork?._id}`)}
              className="cursor"
            >
              {resp?.artwork?.name}
            </span>
          </h6>
          <span className="time-driptivity">
            {moment(resp?.createdAt).fromNow().toUpperCase()}
          </span>
        </div>
      </div>
    </>
  );
};

export default TourCard;
