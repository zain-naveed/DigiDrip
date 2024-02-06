import React, { useState, useEffect } from "react";
import "./edit.css";
import {
  CollectionCover,
  ArtImage,
  AvatarLogo,
  Pencil,
  ProfilePlaceHolder,
} from "../../../assets";
import EditProfileInput from "../../../shared/components/editProfile/EditProfileInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faUpload } from "@fortawesome/free-solid-svg-icons";
import { EditProfileVS } from "../../../shared/util/validation";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { ImageUpload } from "../../../shared/util/mediaUpload";
import { updateUser } from "../../../shared/services";
import { Spinner } from "react-bootstrap";
import { setUser } from "../../../shared/redux/reducers/userSlice";
import { toast } from "react-toastify";

function EditProfileForm({ closeModal }) {
  const dispatch = useDispatch();
  const [UserPhoto, setUserPhoto] = useState(null);
  const UserDetail = useSelector((state) => state.root.user);
  const [Edituser, setEditUser] = useState(UserDetail?.user || null);
  const [userLogo, setUserLogo] = useState(null);

  const [loader, setLoader] = useState(false);

  const initialValues = {
    bio: "",
  };

  const handleEditProfile = async (values, action) => {
    setLoader(true);
    let obj = {};
    const { user } = UserDetail;
    let CloneUser = { ...UserDetail };

    obj["bio"] = values.bio;
    if (UserPhoto) {
      obj["profilePic"] = UserPhoto;
    }

    updateUser(user?._id, obj)
      .then((res) => {
        CloneUser.user = res?.data;

        dispatch(setUser(CloneUser));
        setEditUser(res?.data);

        setLoader(false);
        toast.success("Update Profile Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        closeModal();
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  const handleFiles = (e) => {
    let file = e.target.files[0];
    ImageUpload(e, (res) => {
      if (res) {
        const fileImage = URL.createObjectURL(file);
        setUserLogo(fileImage);
        setUserPhoto(res);
      }
    });
  };
  useEffect(() => {
    initialValues.bio = Edituser?.bio;
  }, [Edituser?.bio]);

  return (
    <div className="login-form" style={{ width: "100%" }}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, action) => handleEditProfile(values, action)}
        validationSchema={EditProfileVS}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <div className="formik-container">
            <h4 className="margin">Edit Profile</h4>
            <div className="margin bottom">
              <div className="Editavatar">
                <img
                  className="Editavatar"
                  src={
                    userLogo
                      ? userLogo
                      : Edituser?.profilePic
                      ? Edituser?.profilePic + "?" + new Date().getTime()
                      : ProfilePlaceHolder
                  }
                />
                <input
                  type="file"
                  id="camera"
                  onChange={handleFiles}
                  style={{ display: "none" }}
                />
                <span className="camera">
                  <label htmlFor="camera">
                    <FontAwesomeIcon icon={faCamera} />
                  </label>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-6 margin">
                <EditProfileInput
                  type="text"
                  placeholder="Username"
                  onChange={handleChange("username")}
                  value={Edituser.userName}
                />
              </div>
              <div className="col-6 margin">
                <EditProfileInput
                  type="text"
                  placeholder="Email"
                  disabled={true}
                  onChange={handleChange("email")}
                  value={Edituser.email}
                />
              </div>
            </div>
            <div className="margin">
              <div className="error pt-2">
                {touched.bio && errors.bio ? errors.bio : ""}
              </div>
              <EditProfileInput
                type="text"
                placeholder="Bio"
                onChange={(e) => {
                  setEditUser({
                    ...Edituser,
                    bio: e.target.value,
                  });
                  setFieldValue("bio", e.target.value);
                }}
                value={Edituser?.bio}
              />
            </div>

            <button
              className="savebutton"
              disabled={loader}
              onClick={handleSubmit}
            >
              {loader ? <Spinner animation="grow" size="sm" /> : "Save"}
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default EditProfileForm;
