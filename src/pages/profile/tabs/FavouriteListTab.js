import React, { useEffect, useState } from "react";

import CardImage from "../../../shared/components/common/CardImage";
import { useHistory } from "react-router-dom";
import {
  GetAllUserArtFavourite,
  GetAllUserArts,
  profileDetailMutate,
} from "../../../shared/services";
import {
  NotFoundAnim,
  ProfileImg,
  Project,
  Project1,
  Project2,
  Project3,
  Project4,
} from "../../../assets";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "react-bootstrap";
import Animation from "../../../shared/components/common/Animation";
import "./tab.css";
function FavouriteListTab() {
  const { user, userProfile } = useSelector((state) => state.root);
  const [loader, setLoader] = useState(true);
  const [pageDetail, setPage] = useState({
    page: 0,
    limit: 5,
    userId: user?.user?._id || null,
  });

  const [favouriteArr, setFavouriteArrr] = useState([]);
  const getAllArts = () => {
    GetAllUserArtFavourite(pageDetail)
      .then(({ data }) => {
        setFavouriteArrr(data.data);
        setLoader(false);
        if (data?.status && data?.data?.length > 0) {
          profileDetailMutate(false, false, data?.data);

          setPage({
            ...pageDetail,
            page: pageDetail.page + 1,
          });
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  useEffect(() => {
    getAllArts();
  }, []);
  return (
    <InfiniteScroll
      dataLength={favouriteArr?.length}
      next={getAllArts}
      hasMore={true}
      loader={<h4>{favouriteArr.length > 0 ? "" : ""} </h4>}
    >
      <div
        className={`recent-activity-flex grid-height ${
          favouriteArr?.length <= 0
            ? "justify-content-center"
            : loader
            ? "justify-content-center"
            : ""
        }`}
      >
        {loader ? (
          <div className="center-text">
            <Spinner animation="grow" size="lg" />
          </div>
        ) : favouriteArr && favouriteArr?.length > 0 ? (
          favouriteArr?.map((fav, inx) => {
            return (
              <div key={inx} className="recent-activity-col drops-img-col">
                <CardImage src={fav?.artwork_url} name={fav?.name} type="not" />
              </div>
            );
          })
        ) : (
          <Animation Pic={NotFoundAnim} Message={"No Favoruite Arts Found"} />
        )}
      </div>
    </InfiniteScroll>
  );
}

export default FavouriteListTab;
