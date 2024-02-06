import interceptor, { HTTP_CLIENT } from "../util/intercepter";
import { toastMessage } from "../components/common/toast";
import { store } from "../redux/store";
import { setUser } from "../redux/reducers/userSlice";
const LogInUser = (obj) => {
  return HTTP_CLIENT.post("auth/login", obj);
};

const RegisterUser = (obj) => {
  return HTTP_CLIENT.post("auth/register", obj);
};
const updateUser = (id, obj) => {
  let FormBody = new FormData();
  Object.keys(obj).forEach((res) => {
    FormBody.append(`${res}`, obj[res]);
  });

  return HTTP_CLIENT.put(`/users/${id}`, FormBody);
};
const getSingleUserService = (userId, callback) => {
  HTTP_CLIENT.get(`/users/${userId}`)
    .then((res) => {
      // toastMessage(res?.data?.message, "success");
      callback(res?.data?.user);
    })
    .catch((err) => {
      toastMessage(err?.response?.data?.message, "error");
    });
};

const followUserService = (obj, callback) => {
  HTTP_CLIENT.post(`users/followUser`, obj)
    .then(({ data }) => {
      let UserWithToken = store.getState().root.user;
      let cloneUser = { ...UserWithToken?.user };
      let following = [...cloneUser?.following];
      following.push(obj.otherUserId);
      let res = {
        ...UserWithToken,
        token: UserWithToken?.token,
        user: {
          ...cloneUser,
          following: following,
        },
      };
      callback(true);
      store.dispatch(setUser(res));
    })
    .catch((err) => {
      callback(false);
      toastMessage(err.response.data.message, "error");
    });
};
const UnfollowUserService = (obj, callback) => {
  HTTP_CLIENT.post(`users/unfollowUser`, obj)
    .then(({ data }) => {
      let UserWithToken = store.getState().root.user;
      let cloneUser = { ...UserWithToken?.user };
      let following = [...cloneUser?.following];
      let ind = following.findIndex((i) => i == obj.otherUserId);
      following.splice(ind, 1);
      let res = {
        ...UserWithToken,
        token: UserWithToken?.token,
        user: {
          ...cloneUser,
          following: following,
        },
      };
      callback(true);
      store.dispatch(setUser(res));
      callback(data);
    })
    .catch((err) => {
      callback(false);
      toastMessage(err.response.data.message, "error");
    });
};
const GetallArtist = (query) => {
  return HTTP_CLIENT.get(
    `users${query ? `?userName=${query}`: ""  }${ query ? "&":"?"}role=artist&limit=5&page=0`
  );
};
const GetUserStatistics = (id) => {
  return HTTP_CLIENT.get(`users/getUserStatistics/${id}`);
};
export {
  LogInUser,
  RegisterUser,
  updateUser,
  getSingleUserService,
  followUserService,
  UnfollowUserService,
  GetallArtist,
  GetUserStatistics,
};
