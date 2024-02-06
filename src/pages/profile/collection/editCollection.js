import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { AvatarLogo, FileUpload } from "../../../assets";
import EditProfileInput from "../../../shared/components/editProfile/EditProfileInput";
import { useSelector, useDispatch } from "react-redux";
import { ImageUpload } from "../../../shared/util/mediaUpload";
import { UpdateCollectionService } from "../../../shared/services";
import { toast } from "react-toastify";
import { setCollectionDetail } from "../../../shared/redux/reducers/collectionDetail";
import "./editCollection.css";
function EditCollection({ CloseModal }) {
  const { collectDetail } = useSelector((state) => state.root);
  const [editCollection, setEditCollection] = useState(collectDetail);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    let obj = {
      collectionId: editCollection?._id,
      name: editCollection?.name,
    };
    if (profileImage) {
      obj["profileImage"] = profileImage;
    }
    if (coverImage) {
      obj["coverImage"] = coverImage;
    }
    setLoader(true);
    UpdateCollectionService(obj)
      .then((res) => {
        setLoader(false);
        let cloneCollectonDetail = { ...collectDetail };
        cloneCollectonDetail = res?.data?.collection;
        dispatch(setCollectionDetail(cloneCollectonDetail));

        toast.success(res?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        CloseModal();
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err.response.data.message
            : "Check your Network Connection",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      });
  };
  const ProfileImageUpload = (e) => {
    const files = e.target.files[0];
    ImageUpload(e, (data) => {
      if (data) {
        const fileImage = URL.createObjectURL(files);
        setProfileImageUrl(fileImage);
        setProfileImage(files);
      } else {
        setProfileImageUrl(null);
        setProfileImage(null);
      }
    });
  };
  const CoverImageUpload = (e) => {
    const files = e.target.files[0];
    ImageUpload(e, (data) => {
      if (data) {
        const fileImage = URL.createObjectURL(files);
        setCoverImageUrl(fileImage);
        setCoverImage(files);
      } else {
        setCoverImageUrl(null);
        setCoverImage(null);
      }
    });
  };
  return (
    <>
      <div className="login-form" style={{ width: "100%" }}>
        <div className="formik-container">
          <h4 className="margin">Update Collection</h4>
          <div className="margin bottom">
            <div className="Editavatar">
              <img
                className="Editavatar"
                src={
                  profileImageUrl
                    ? profileImageUrl
                    : editCollection
                    ? editCollection?.profileImage + "?" + new Date().getTime()
                    : AvatarLogo
                }
              />
              <input
                type="file"
                id="camera"
                onChange={ProfileImageUpload}
                style={{ display: "none" }}
              />
              <span className="camera">
                <label htmlFor="camera">
                  <FontAwesomeIcon icon={faCamera} />
                </label>
              </span>
            </div>
          </div>
          <input
            type="file"
            id="file2"
            style={{ display: "none" }}
            onChange={CoverImageUpload}
          />

          <div
            className="banner-image-container"
            style={{ overflow: "hidden", position: "relative" }}
            // style={{
            //   backgroundImage: `url(${
            //     coverImageUrl
            //       ? coverImageUrl
            //       : editCollection
            //       ? editCollection?.coverImage + "?" + new Date().getTime()
            //       : ""
            //   })`,
            // }}
          >
            <img
              className="center-image"
              src={`${
                coverImageUrl
                  ? coverImageUrl
                  : editCollection
                  ? editCollection?.coverImage + "?" + new Date().getTime()
                  : ""
              }`}
            />
            <span className="image-upload-style">
              <label htmlFor="file2">
                <img src={FileUpload} className="inner-image" />
              </label>
            </span>
          </div>
          <div className="margin">
            <EditProfileInput
              type="text"
              placeholder="Collection Name"
              onChange={(e) => {
                setEditCollection({
                  ...editCollection,
                  name: e.target.value,
                });
              }}
              value={editCollection?.name}
            />
          </div>

          <button
            className="savebutton"
            disabled={loader}
            onClick={handleSubmit}
          >
            {loader ? <Spinner animation="grow" size="sm" /> : "Update"}
          </button>
        </div>
      </div>
    </>
  );
}

export default EditCollection;
