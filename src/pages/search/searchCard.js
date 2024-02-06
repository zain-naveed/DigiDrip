import React from "react";
import styles from "../../styles/search.module.scss";
import DriptivityImage from "../../assets/images/driptivity-img1.png";
import { clientMusic } from "../../assets";

import { useHistory } from "react-router-dom";
import { convertToEther } from "../../shared/util/dateValid";
function SearchCard({ respon, type }) {
  const history = useHistory();

  const handleNavigate = () => {
    if (type == "artwork") {
      history.push(`/Art/${respon?.id}`);
    } else if (type == "user") {
      history.push(`/viewProfile/${respon?.id}`);
    } else if (type == "collection") {
      // history.push(`/viewProfile/${respon?.id}`);
    }
  };
  console.log(respon);
  return (
    <div className={`  ${styles.searchCard}`}>
      {respon?.artwork_type == "image" ? (
        <img
          onClick={handleNavigate}
          src={
            respon?.artwork_url
              ? respon?.artwork_url
              : respon?.profilePic
              ? respon?.profilePic
              : respon?.coverImage
              ? respon?.coverImage
              : DriptivityImage
          }
          height="302px"
          width="100%"
          style={{ cursor: "pointer" }}
        />
      ) : respon?.artwork_type == "video" ? (
        <video
          onClick={handleNavigate}
          // controls
          src={respon?.artwork_url}
          style={{ background: "black" }}
          height="302px"
          width="100%"
          loading="lazy"
        ></video>
      ) : (
        <img
          onClick={handleNavigate}
          src={clientMusic}
          height="302px"
          width="100%"
          style={{ cursor: "pointer" }}
        />
      )}

      <div className={styles.text_cont}>
        <span className={`text-secondary px-4 mt-3 ${styles.text_less}`}>
          {respon?.name
            ? respon?.name
            : respon?.userName
            ? respon?.userName
            : ""}
        </span>
        <span className={`mr-1 mt-3 text-secondary ${styles.text_less2}`}>
          {respon?.price ? convertToEther(respon?.price) + "Eth" : ""}
        </span>
        <label className={`text-dark px-4 mt-3 ${styles.text_des}`}>
          {respon?.description}
        </label>
      </div>
    </div>
  );
}

export default SearchCard;
