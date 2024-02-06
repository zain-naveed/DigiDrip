import { store } from "../redux/store";
import axios from "axios";
import { BASE_URL, EndPoint } from "./AppEndpoint";
import { resetUser } from "../redux/reducers/userSlice";
export const HTTP_CLIENT = axios.create({
  baseURL: BASE_URL,
});

HTTP_CLIENT.interceptors.request.use(
  (config) => {
    const { user } = store.getState().root;

    if (user && user?.token) {
      config.headers.Authorization = `Bearer ${user?.token}`;
    }

    return config;
  },
  (err) => {
    if (err?.response?.status === 401) {
      //place your reentry code
    }
    Promise.reject(err);
  }
);

export const AuthenticationError = (err) => {
  // if (err.response.status == 401) {
  //   store.dispatch(resetUser());
  // }
};
