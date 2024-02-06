import React, { useEffect, useState } from "react";
import {
  CollectionCover,
  ArtImage,
  AvatarLogo,
  Pencil,
  LoaderImage,
  NotFoundAnim,
  ProfilePlaceHolder,
} from "../../../assets";
import "./collection.css";
import Art from "../../../shared/components/art";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderSlice } from "../../../shared/redux/reducers/LoaderSlice";
import { GetCollectionDetail } from "../../../shared/services";
import { useParams } from "react-router-dom";
import Animation from "../../../shared/components/common/Animation";
import {
  setCollectionDetail,
  resetCollectionDetail,
} from "../../../shared/redux/reducers/collectionDetail";
import EditProfileModal from "../../../shared/components/modal/editProfileModal";
import EditCollection from "./editCollection";
import SubmitNftModal from "../../../shared/components/modal/submitNftModal";
import CardImage from "../../../shared/components/common/CardImage";
import { AuthenticationError } from "../../../shared/util/intercepter";
import DeleteConfirmationArt from "../../../shared/components/modal/deleteArtModal";
import { useLocation } from "react-router-dom";
export default function CollectionDetail() {
  const history = useHistory();
  const dispatch = useDispatch();
  let query = useQuery();
  const param = useParams();
  const [toggleBool, setToggleBool] = useState(false);
  const [artModal, setArtModal] = useState(false);
  const [conirmationModal, setConfirmationModal] = useState(false);
  const [singleCollection, setSingleCollection] = useState({});
  const [artResp, setResp] = useState({});
  const {
    loader,
    collectDetail,
    user: { user },
  } = useSelector((state) => state.root);

  const GetUserDetail = () => {
    dispatch(setLoaderSlice({ Loader: true }));
    GetCollectionDetail(param?.id)
      .then((res) => {
        let artwork = [];
        res?.data?.data?.artworks?.forEach((element) => {
          element["collectionAddress"] = res?.data?.data?.collectionAddress;

          artwork.push(element);
        });
        let obj = {
          ...res?.data?.data,
          artworks: artwork,
        };

        dispatch(setCollectionDetail(obj));
        dispatch(setLoaderSlice({ Loader: false }));
      })
      .catch((err) => {
        AuthenticationError(err);
        dispatch(setLoaderSlice({ Loader: false }));
      });
  };
  useEffect(() => {
    dispatch(resetCollectionDetail());
    GetUserDetail();
  }, []);

  useEffect(() => {
    let arr = [];
    collectDetail?.artworks?.forEach((res) => {
      if (!res?.isAuctionOpen) {
        arr.push(res);
      }
    });
    let obj = {
      ...collectDetail,
      artworks: arr,
    };
    setSingleCollection(obj);
  }, [collectDetail]);
  const handleCloseEdit = () => setToggleBool(false);
  const handleCloseArt = () => setArtModal(false);
  const closeDelete = () => setConfirmationModal(false);

  return (
    <>
      <section
        className="driptivity-banner"
        style={{
          backgroundImage: ` url(${
            singleCollection?.coverImage + "?" + new Date().getTime() ||
            singleCollection
          })`,
          backgroundAttachment: "fixed",
          height: "500px",
        }}
      >
        <div className="driptivity-text">
          <h2 className="text-light p-4 text-back">{collectDetail?.name}</h2>
        </div>
        {singleCollection?.owner == user?._id ? (
          <div className="edit">
            <button
              className="btn btn-sm btn-edit p-2  "
              onClick={() => setToggleBool(true)}
            >
              <img src={Pencil} />
            </button>
          </div>
        ) : (
          ""
        )}

        <img
          src={
            singleCollection?.profileImage
              ? singleCollection?.profileImage + "?" + new Date().getTime()
              : ProfilePlaceHolder
          }
          className="avatar"
        />
      </section>

      <section className="driptivity-content content">
        <div style={{ position: "relative" }}>
          {singleCollection?.owner == user?._id ? (
            <div className="edit">
              <button className="add-item" onClick={() => setArtModal(true)}>
                Add Art
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="recent-activity-flex grid-height">
                {loader.Loader ? (
                  <div className="center-text"></div>
                ) : singleCollection &&
                  singleCollection?.artworks &&
                  singleCollection?.artworks?.length > 0 ? (
                  singleCollection?.artworks?.map((res, inx) => {
                    return res?.tokenId &&
                      !res?.isAuctionOpen &&
                      res?.collectionAddress ? (
                      <div className="recent-activity-col" key={inx}>
                        <CardImage
                          src={res?.artwork_url}
                          name={res?.name}
                          dropType={res?.artwork_type}
                          type={`${query.get("user") ? "not" : "success"}`}
                          response={res}
                          navigate={() => {
                            history.push(
                              `/Collection/${param?.id}/edit/${
                                res?._id ? res?._id : res?.id
                              }`
                            );
                          }}
                        />
                      </div>
                    ) : res?.reload ? (
                      <div className="recent-activity-col card-height">
                        <CardImage
                          src={res?.artwork_url}
                          name={"Minting Artwork refresh page"}
                          type={"Wait"}
                        />
                      </div>
                    ) : (
                      !res?.tokenId && (
                        <div className="recent-activity-col card-height">
                          <span className="card-delete">
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() => {
                                setResp(res);
                                setConfirmationModal(true);
                              }}
                            />
                          </span>
                          <CardImage
                            src={res?.artwork_url}
                            name={"Mint Failed"}
                            type={"failed"}
                          />
                        </div>
                      )
                    );
                  })
                ) : (
                  <Animation
                    Pic={NotFoundAnim}
                    Message={"Art Work Not Found"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {conirmationModal && (
        <DeleteConfirmationArt
          openModal={conirmationModal}
          HideModal={closeDelete}
          response={artResp}
        />
      )}
      {toggleBool && (
        <EditProfileModal openModal={toggleBool} HideModal={handleCloseEdit}>
          <EditCollection CloseModal={handleCloseEdit} />
        </EditProfileModal>
      )}
      {artModal && (
        <SubmitNftModal
          openModal={artModal}
          HideModal={handleCloseArt}
          collectionobj={collectDetail}
        />
      )}
    </>
  );
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
