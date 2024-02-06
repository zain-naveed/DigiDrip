import React from "react";
import { ProfileImg, ProfilePlaceHolder } from "../../../assets";

function Avatar({ image }) {
  return (
    <div className="steezdesigns-profile-img">
      <img
        load="lazy"
        src={`${
          image != null
            ? image + "?" + new Date().getTime()
            : ProfilePlaceHolder
        }`}
        alt="steez-design-edit"
      />
    </div>
  );
}

export default Avatar;
