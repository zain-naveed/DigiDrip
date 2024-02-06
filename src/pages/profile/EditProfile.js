import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap-tabs";

import { useHistory, useParams } from "react-router-dom";
import EditProfileModal from "../../shared/components/modal/editProfileModal";
import EditProfileForm from "./editProfileForm/editprofileForm";
import NotificationModal from "./notificationModal/notificationModal";
import Setting from "../setting/setting";
import CardImage from "../../shared/components/common/CardImage";
import CollectionListTab from "./tabs/CollectionListTab";
import DropsListTab from "./tabs/DropsListTab";
import { getSingleUserService } from "../../shared/services/authService";
import {
  ProfileImg,
  Project,
  Project1,
  Project2,
  Project3,
  Project4,
  AvatarLogo,
} from "../../assets";
import { useSelector } from "react-redux";
import FavouriteListTab from "./tabs/FavouriteListTab";
import Avatar from "../../shared/components/common/Avatar";
import { resetUserProfileSlice } from "../../shared/redux/reducers/userProfileSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../../shared/redux/reducers/userSlice";
function EditProfile() {
  const param = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.root.user);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [openSettingModal, setOpenSettingModal] = useState(false);

  const handleCloseEdit = () => setOpenEditModal(false);
  const handleCloseNotification = () => setOpenNotificationModal(false);
  const handleCloseSetting = () => setOpenSettingModal(false);
  const userProfileData = () => {
    let cloneuserProfile = { ...userProfile };
    getSingleUserService(cloneuserProfile?.user?._id, (resp) => {
      if (resp) {
        let obj = {
          ...userProfile,
          user: resp,
        };
        dispatch(setUser(obj));
      }
    });
  };
  useEffect(() => {
    dispatch(resetUserProfileSlice());
    userProfileData();
  }, []);
  return (
    <div>
      <section className="steezdesigns-content">
        <div className="container">
          <div className="steezdesigns-flex">
            <div className="steezdesigns-img-text-col">
              <Avatar
                image={
                  userProfile?.user?.profilePic
                    ? userProfile?.user?.profilePic
                    : null
                }
              />
              <div className="steezdesigns-profile-text">
                <h3>
                  {userProfile?.user?.userName?.charAt(0)?.toUpperCase() +
                    userProfile?.user?.userName?.substr(1)}
                </h3>
                <h6>
                  @
                  {userProfile?.user?.role?.charAt(0)?.toUpperCase() +
                    userProfile?.user?.role?.substr(1)}
                </h6>
                <p>{userProfile?.user?.bio}</p>
                {userProfile?.user?.role == "artist" ? (
                  <div class="row">
                    <div class="col p-0">
                      <button
                        onClick={() => setOpenEditModal(true)}
                        className="custom-site-btn-2"
                      >
                        Edit Your Profile
                      </button>
                    </div>
                    <div class="col p-0">
                      <button
                        onClick={() => history.push("/create-collection")}
                        className="custom-site-btn-2"
                      >
                        Create Collection
                      </button>
                    </div>
                  </div>
                ) : (
                  userProfile?.user?.role == "user" && (
                    <div class="row">
                      <div class="col p-0">
                        <button
                          onClick={() => setOpenEditModal(true)}
                          className="custom-site-btn-2"
                        >
                          Edit Your Profile
                        </button>
                      </div>
                    </div>
                  )
                )}

                <div class="row mt-2">
                  <div class="col p-0">
                    <button
                      style={{ width: "98%" }}
                      onClick={() => setOpenNotificationModal(true)}
                      className="custom-site-btn-2"
                    >
                      Notifications
                    </button>
                  </div>
                  {/* <div class="col p-0">
                    <button
                      onClick={() => setOpenSettingModal(true)}
                      className="custom-site-btn-2"
                    >
                      Settings
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
            {userProfile?.user?.role == "artist" && (
              <div className="steezdesigns-followers-col">
                <ul>
                  <li>
                    <h4>{userProfile?.user?.followers?.length}</h4>
                    <h5>Followers</h5>
                  </li>
                  <li>
                    <h4>{userProfile?.user?.following?.length}</h4>
                    <h5>Following</h5>
                  </li>
                  <li>
                    <h4>{userProfile?.user?.collections?.length}</h4>
                    <h5>Collection</h5>
                  </li>
                  <li>
                    <h4>{userProfile?.user?.creations?.length}</h4>
                    <h5>Creations</h5>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        className={`drops-collection-sec drops-collection-favorites-sec ${
          userProfile?.user?.role == "user"
            ? "drops-collection-favorites-user"
            : "drops-collection-favorites-art"
        }  `}
      >
        <div className="container">
          {userProfile?.user?.role == "artist" ? (
            <Tabs onSelect={(index, label) => console.log(label + " selected")}>
              <Tab label="Drops">
                <DropsListTab />
              </Tab>

              <Tab label="Collection">
                <CollectionListTab />
              </Tab>

              {/* <Tab label="Favorites">
                <FavouriteListTab />
              </Tab> */}
            </Tabs>
          ) : userProfile?.user?.role == "user" ? (
            <Tabs onSelect={(index, label) => console.log(label + " selected")}>
              <Tab label="Artworks">
                <DropsListTab />
              </Tab>

              {/* <Tab label="Favorites">
                <FavouriteListTab />
              </Tab> */}
            </Tabs>
          ) : (
            ""
          )}
        </div>
      </section>
      {openEditModal && (
        <EditProfileModal openModal={openEditModal} HideModal={handleCloseEdit}>
          <EditProfileForm closeModal={handleCloseEdit} />
        </EditProfileModal>
      )}
      {openNotificationModal && (
        <EditProfileModal
          openModal={openNotificationModal}
          HideModal={handleCloseNotification}
        >
          <NotificationModal />
        </EditProfileModal>
      )}
      {openSettingModal && (
        <EditProfileModal
          openModal={openSettingModal}
          HideModal={handleCloseSetting}
        >
          <Setting />
        </EditProfileModal>
      )}
    </div>
  );
}

export default EditProfile;
