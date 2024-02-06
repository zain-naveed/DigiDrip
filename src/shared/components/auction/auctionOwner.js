import React, { useEffect } from "react";
import { Eye, ProfilePlaceHolder } from "../../../assets";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
// import { AddFavouriteArtService } from "../../services";
// import { setLoaderSlice } from "../../redux/reducers/LoaderSlice";
import { useHistory } from "react-router-dom";
function AuctionOwner({ singleArtwork }) {
  const { user } = useSelector((state) => state.root.user);
  const Userhistory = useHistory();
  const dispatch = useDispatch();

  // const hanleFavouriteArt = () => {
  //   dispatch(setLoaderSlice({ Loader: true }));
  //   AddFavouriteArtService({ artworkId: param.id });
  // };
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
    <>
      <div className="col-md-6 col-lg-4">
        <div className="pastel-path-main-list-col">
          <div className="driptivity-transcending-leading-col">
            <ul>
              <li>
                <img
                  src={
                    singleArtwork?.artwork?.creater?.profilePic
                      ? singleArtwork?.artwork?.creater?.profilePic
                      : ProfilePlaceHolder
                  }
                  alt="transcending-atrist-img6"
                />
                <div className="driptivity-transcending-text">
                  <h6
                    onClick={() =>
                      navigateUser(singleArtwork?.artwork?.creater?._id)
                    }
                  >
                    {singleArtwork?.artwork?.creater?.userName
                      ? singleArtwork?.artwork?.creater?.userName
                      : singleArtwork?.creater?.userName}
                  </h6>
                  <span>
                    {moment(singleArtwork?.creater?.createdAt).fromNow()}{" "}
                  </span>
                </div>
              </li>
              <li>
                <img
                  src={
                    singleArtwork?.owner?.profilePic
                      ? singleArtwork?.owner?.profilePic
                      : ProfilePlaceHolder
                  }
                  alt="transcending-atrist-img7"
                />
                <div className="driptivity-transcending-text">
                  <h6 onClick={() => navigateUser(singleArtwork?.owner?._id)}>
                    {singleArtwork?.owner?.userName}
                  </h6>
                  <span>{moment(singleArtwork?.createdAt).fromNow()}</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="driptivity-transcending-leading-col pastel-path-fav-eye">
            <ul>
              {/* <li>
                {user?._id == singleArtwork?.owner?._id ||
                user?._id == singleArtwork?.creater?._id ? (
                  <img src={Favorite} alt="favourite-img" />
                ) : user?.artworks?.includes(param?.id) ? (
                  <img src={FavouriteArt} alt="favourite-img" />
                ) : (
                  <img
                    src={Favorite}
                    onClick={hanleFavouriteArt}
                    alt="favourite-img"
                  />
                )}

                <div className="driptivity-transcending-text">
                  <h6>6</h6>
                  <span>FAVOURITES</span>
                </div>
              </li> */}
              <li>
                <img src={Eye} alt="eye-img" />
                <div className="driptivity-transcending-text">
                  <h6>{singleArtwork?.artwork?.views}</h6>
                  <span>VIEWS</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuctionOwner;
