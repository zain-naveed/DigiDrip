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
import {
  getSingleUserService,
  followUserService,
  UnfollowUserService,
} from "../../shared/services/authService";
import { resetUserProfileSlice } from "../../shared/redux/reducers/userProfileSlice";
import { useDispatch } from "react-redux";
function ViewProfile() {
  const param = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [UserDetail, setUserDetail] = useState({});
  const userProfile = useSelector((state) => state.root.user);
  const getsinleUser = () => {
    getSingleUserService(param.id, (res) => {
      setUserDetail(res);
    });
  };
  useEffect(() => {
    dispatch(resetUserProfileSlice());

    getsinleUser();
  }, []);
  const followUser = () => {
    let obj = {
      otherUserId: param.id,
    };
    followUserService(obj, (bool) => {
      if (bool) {
        let cloneUserDetail = { ...UserDetail };
        cloneUserDetail?.followers?.push(param.id);
      }
    });
  };
  const UnfollowUser = () => {
    let obj = {
      otherUserId: param.id,
    };
    UnfollowUserService(obj, (bool) => {
      if (bool) {
        let cloneUserDetail = { ...UserDetail };
        let findind = cloneUserDetail?.followers?.findIndex(
          (i) => i == param.id
        );
        cloneUserDetail?.followers?.splice(findind, 1);
        setUserDetail(cloneUserDetail);
        // cloneUserDetail?.followers?.push(param.id);
      }
    });
  };
  console.log(userProfile);
  return (
    <div>
      <section className="steezdesigns-content">
        <div className="container">
          <div className="steezdesigns-flex">
            <div className="steezdesigns-img-text-col">
              <Avatar
                image={UserDetail?.profilePic ? UserDetail?.profilePic : null}
              />
              <div className="steezdesigns-profile-text">
                <h3>
                  {UserDetail?.userName?.charAt(0)?.toUpperCase() +
                    UserDetail?.userName?.substr(1)}
                </h3>
                <h6>
                  @
                  {UserDetail?.role?.charAt(0)?.toUpperCase() +
                    UserDetail?.role?.substr(1)}
                </h6>
                <p>{UserDetail?.bio}</p>

                {console.log(
                  userProfile?.user?.following?.findIndex(
                    (i) => i == param.id
                  ) < 0
                )}
                {userProfile?.user && UserDetail?.role == "artist" ? (
                  <div class="row">
                    <div class="col-6 p-0">
                      {userProfile &&
                      userProfile?.user?.following?.findIndex(
                        (i) => i == param.id
                      ) < 0 ? (
                        <button
                          className="custom-site-btn-2"
                          onClick={followUser}
                        >
                          Follow Artist
                        </button>
                      ) : (
                        <button
                          className="custom-site-btn-2"
                          onClick={UnfollowUser}
                        >
                          Unfollow Artist
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {UserDetail?.role == "artist" && (
              <div className="steezdesigns-followers-col">
                <ul>
                  <li>
                    <h4>{UserDetail.followers?.length}</h4>
                    <h5>Followers</h5>
                  </li>
                  <li>
                    <h4>{UserDetail?.following?.length}</h4>
                    <h5>Following</h5>
                  </li>
                  <li>
                    <h4>{UserDetail?.collections?.length}</h4>
                    <h5>Collection</h5>
                  </li>
                  <li>
                    <h4>{UserDetail?.creations?.length}</h4>
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
          UserDetail?.role == "artist"
            ? "drops-collection-favorites-art"
            : UserDetail?.role == "user"
            ? "drops-collection-favorites-user"
            : "drops-collection-favorites-art"
        }  `}
      >
        <div className="container">
          {UserDetail?.role == "artist" ? (
            <Tabs
              onSelect={(index, label) => console.log(label + " selected")}
              style={{ width: "100vw !important" }}
            >
              <Tab label="Drops">
                <DropsListTab />
              </Tab>

              <Tab label="Collection">
                <CollectionListTab />
              </Tab>
            </Tabs>
          ) : UserDetail?.role == "user" ? (
            <Tabs onSelect={(index, label) => console.log(label + " selected")}>
              <Tab label="Drops">
                <DropsListTab />
              </Tab>
            </Tabs>
          ) : (
            <Tabs
              onSelect={(index, label) => console.log(label + " selected")}
              style={{ width: "100vw !important" }}
            >
              <Tab label="Drops">
                <DropsListTab />
              </Tab>

              <Tab label="Collection">
                <CollectionListTab />
              </Tab>
            </Tabs>
          )}
        </div>
      </section>
    </div>
  );
}

export default ViewProfile;
