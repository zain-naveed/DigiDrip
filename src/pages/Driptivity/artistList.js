import React from "react";
import { ProfilePlaceHolder } from "../../assets";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
function ArtistList({ TranArtist }) {
  const { user } = useSelector((state) => state.root);
  const Userhistory = useHistory();
  const navigateUser = (navId) => {
    if (user?.token) {
      if (navId == user?.user?._id) {
        Userhistory.push({
          pathname: `/profile`,
        });
      } else {
        Userhistory.push({
          pathname: `/viewProfile/${navId}`,
        });
      }
    } else {
      Userhistory.push({
        pathname: `/viewProfile/${navId}`,
      });
    }
  };
  return (
    <ul>
      {TranArtist?.length > 0
        ? TranArtist?.map((trans, inx) => {
            console.log(trans);
            return (
              <li key={inx}>
                <img src={ProfilePlaceHolder} alt="transcending-atrist-img1" />
                <div className="driptivity-transcending-text">
                  <h6 onClick={() => navigateUser(trans?.user?._id)}>
                    {trans?.user?.userName}
                  </h6>
                  <span>{moment(trans?.updatedAt).fromNow()}</span>
                </div>
              </li>
            );
          })
        : ""}

      {/* <li>
        <img src={AuthorImage1} alt="transcending-atrist-img2" />
        <div className="driptivity-transcending-text">
          <h6>@Javajam</h6>
          <span>15 MINUTES AGO </span>
        </div>
      </li>
      <li>
        <img src={AuthorImage1} alt="transcending-atrist-img3" />
        <div className="driptivity-transcending-text">
          <h6>@Javajam</h6>
          <span>15 MINUTES AGO </span>
        </div>
      </li>
      <li>
        <img src={AuthorImage1} alt="transcending-atrist-img4" />
        <div className="driptivity-transcending-text">
          <h6>@Javajam</h6>
          <span>15 MINUTES AGO </span>
        </div>
      </li>
      <li>
        <img src={AuthorImage1} alt="transcending-atrist-img5" />
        <div className="driptivity-transcending-text">
          <h6>@Javajam</h6>
          <span>15 MINUTES AGO </span>
        </div>
      </li> */}
    </ul>
  );
}

export default ArtistList;
