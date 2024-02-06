import { HTTP_CLIENT } from "../util/intercepter";
import { toastMessage } from "../components/common/toast";
export const getActivities = (params) => {
  return HTTP_CLIENT.get(
    `general/getAppActivity?page=${params.page}&perPage=${params.perPage}`
  );
};

export const handleSearch = (params, obj) => {
  return HTTP_CLIENT.get(
    `general/search?page=${obj.pageDet}&perPage=${obj.limit}${
      Object.keys(params).length > 0
        ? `${params.keyword ? `&keyword=${params.keyword}` : ""}${
            params.min ? `&min=${params.min}` : ""
          }${params.max ? `&max=${params.max}` : ""}${params?.artist ? `&artist=${params?.artist}`:""}`
        : ""
    } `
  );
};

export const getAllNotification = (obj, callback) => {
  HTTP_CLIENT.get(
    `general/getNotifications?page=${obj.pageDet}&perPage=${obj.perPage}`
  )
    .then((res) => {
      callback(res?.data);
    })
    .catch((err) => {
      toastMessage(err?.response?.data?.message, "error");
      callback(false);
    });
};

export const gpostMail = (obj) => {
  return HTTP_CLIENT.post(`general/supportMail`,obj)
    
};
