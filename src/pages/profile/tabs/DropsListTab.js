import React, { useEffect, useState } from "react";
import CardImage from "../../../shared/components/common/CardImage";
import { useHistory } from "react-router-dom";
import { GetAllUserArts, profileDetailMutate } from "../../../shared/services";

import { ArtAnimation } from "../../../assets";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "react-bootstrap";
import Animation from "../../../shared/components/common/Animation";
import "./tab.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmationArt from "../../../shared/components/modal/deleteArtModal";
import { useParams } from "react-router-dom";
function DropsListTab() {
  const history = useHistory();
  const { user, userProfile } = useSelector((state) => state.root);
  const param = useParams();
  const [loader, setLoader] = useState(true);
  const [artResp, setArtResp] = useState({});
  const [deleteArtModal, setDeleteArtModal] = useState(false);
  const [dropList, setDropList] = useState([]);
  const [pageDetail, setPage] = useState({
    page: 0,
    limit: 5,
    userId: param?.id ? param?.id : user?.user?._id,
  });

  const [dumyArr, setDumArr] = useState([]);
  const CloseDeleteModal = () => setDeleteArtModal(false);
  const getAllArts = () => {
    GetAllUserArts(pageDetail)
      .then(({ data }) => {
        if (data?.status && data?.data?.length > 0) {
          let arr = [];
          data?.data?.forEach((element) => {
            if (!element?.isAuctionOpen) {
              arr.push(element);
            }
          });
          profileDetailMutate(arr, false, false, false);
          setPage({
            ...pageDetail,
            page: pageDetail.page + 1,
          });
          setLoader(false);
        } else {
          setDumArr(data.data);
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  useEffect(() => {
    getAllArts();
  }, []);
  useEffect(() => {
    let arr = [];
    userProfile?.drops?.forEach((drop) => {
      if (!drop?.isAuctionOpen) {
        arr.push(drop);
      }
    });
    setDropList(arr);
  }, [userProfile]);

  return (
    <>
      <InfiniteScroll
        dataLength={dropList?.length}
        next={getAllArts}
        hasMore={true}
        loader={<h4>{dumyArr.length > 0 ? "Loading..." : ""} </h4>}
      >
        <div
          className={`recent-activity-flex grid-height ${
            dropList.length <= 0
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
          ) : dropList && dropList?.length > 0 ? (
            dropList?.map((drop, inx) => {
              console.log(drop);
              return drop?.tokenId && !drop?.isAuctionOpen ? (
                <div
                  key={inx}
                  className="recent-activity-col drops-img-col mt-2"
                >
                  <CardImage
                    src={drop?.artwork_url}
                    dropType={drop?.artwork_type}
                    name={drop?.name}
                    type="not"
                    navigate={() => history.push(`/Art/${drop?._id}`)}
                  />
                </div>
              ) : (
                <div className="recent-activity-col mt-2 card-height">
                  {console.log(user?.user?._id)}

                  {!param && (
                    <span className="card-delete">
                      {" "}
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => {
                          setArtResp(drop);
                          setDeleteArtModal(true);
                        }}
                      />
                    </span>
                  )}
                  <CardImage
                    src={drop?.artwork_url}
                    name={"Minting Process Reload Page"}
                    type={"Wait"}
                  />
                </div>
              );
            })
          ) : (
            <>
              <Animation Pic={ArtAnimation} Message={"No Drops Found"} />
            </>
          )}
        </div>
      </InfiniteScroll>
      <DeleteConfirmationArt
        openModal={deleteArtModal}
        HideModal={CloseDeleteModal}
        response={artResp}
      />
    </>
  );
}

export default DropsListTab;
