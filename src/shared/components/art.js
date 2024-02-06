import React from "react";
import { ArtImage } from "../../assets";
export default function Art() {
  return (
    <>
      <div className="recent-activity-img">
        <img src={ArtImage} alt="driptivity-img1" />
      </div>
      <div className="recent-activity-text">
        <div className="driptivity-person-text">
          <h6>
            <span>@eux</span> made an offer for about $227 on <span>Tora</span>
          </h6>
          <span className="time-driptivity">15 MINUTES AGO </span>
        </div>
      </div>
    </>
  );
}
