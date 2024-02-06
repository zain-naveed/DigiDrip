import React, { useEffect, useState } from "react";
import CardImage from "../../../shared/components/common/CardImage";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "react-bootstrap";
import {
  ProfileImg,
  Project,
  Project1,
  Project2,
  Project3,
  Project4,
} from "../../../assets";
import {
  GetAllCollection,
  profileDetailMutate,
} from "../../../shared/services";
import Animation from "../../../shared/components/common/Animation";
import { NotFoundAnim } from "../../../assets";
import "./tab.css";
import { useParams } from "react-router-dom";
import { toastMessage } from "../../../shared/components/common/toast";
function CollectionListTab() {
  const { user, userProfile } = useSelector((state) => state.root);
  const param = useParams();
  const [loader, setLoader] = useState(true);
  const [pageDetail, setPage] = useState({
    page: 0,
    limit: 5,
    userId: param?.id ? param?.id : user?.user?._id,
  });

  const [dumyArr, setDumArr] = useState([]);

  const getAllCollection = () => {
    GetAllCollection(pageDetail)
      .then(({ data }) => {
        if (data?.status && data?.data?.length > 0) {
          profileDetailMutate(false, data?.data, false);
          setPage({
            ...pageDetail,
            page: pageDetail.page + 1,
          });
          setLoader(false);
        } else {
          setLoader(false);
          setDumArr(data.data);
        }
      })
      .catch((err) => {
        setLoader(false);
        toastMessage(err?.response?.data?.message, "error");
      });
  };
  useEffect(() => {
    getAllCollection();
  }, []);

  const history = useHistory();

  return (
    <InfiniteScroll
      dataLength={userProfile?.collection?.length}
      next={getAllCollection}
      hasMore={true}
      loader={<h4>{dumyArr.length > 0 ? "Loading..." : ""} </h4>}
    >
      <div
        className={`recent-activity-flex grid-height ${
          userProfile?.collection?.length < 0
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
        ) : userProfile &&
          userProfile?.collection &&
          userProfile?.collection?.length > 0 ? (
          userProfile?.collection?.map((colectn, inx) => {
            return colectn?.profileImage ? (
              <div key={inx} className="recent-activity-col drops-img-col">
                {console.log("collection", colectn)}
                <CardImage
                  src={colectn?.profileImage}
                  name={colectn?.name}
                  type="not"
                  dropType="image"
                  navigate={() =>
                    history.push(
                      `/nftcollection/${colectn._id}${
                        param?.id ? "?user=" + param?.id : ""
                      }`
                    )
                  }
                />
              </div>
            ) : (
              <div
                key={inx}
                className="recent-activity-col drops-img-col"
                // onClick={() => history.push(`/Collection/${colectn._id}`)}
              >
                <CardImage src={Project1} name="Not Found" type="failed" />
              </div>
            );
          })
        ) : (
          <Animation Pic={NotFoundAnim} Message={"No Collections Found"} />
        )}
      </div>
    </InfiniteScroll>
  );
}

export default CollectionListTab;
