import interceptor, { HTTP_CLIENT } from "../util/intercepter";
const CreateCollectionService = (obj) => {
  let FormBody = new FormData();
  if (Object.keys(obj).length > 0) {
    Object.keys(obj).forEach((res) => {
      FormBody.append(`${res}`, obj[res]);
    });
    // console.log(obj);
    // ;
    return HTTP_CLIENT.post("collection/createCollection", FormBody);
  }
};
const UpdateCollectionService = (obj) => {
  let FormBody = new FormData();
  if (Object.keys(obj).length > 0) {
    Object.keys(obj).forEach((res) => {
      FormBody.append(`${res}`, obj[res]);
    });

    return HTTP_CLIENT.post("collection/updateCollection", FormBody);
  }
};
const GetAllCollection = (obj) => {
  return HTTP_CLIENT.get(
    `collection/getUserCollections?page=${obj.page}&perPage=${obj.limit}&userId=${obj.userId}`
  );
};
const GetCollectionDetail = (userId) => {
  return HTTP_CLIENT.get(
    `collection/getCollectionDetails?collectionId=${userId}`
  );
};
const GetUserAllCollection = (userId) => {
  return HTTP_CLIENT.get(`collection/getAllUserCollections?userId=${userId}`);
};
const GetAllOpentCollection = () => {
  return HTTP_CLIENT.get("collection/getAllCollections");
};
export {
  CreateCollectionService,
  GetAllCollection,
  GetCollectionDetail,
  UpdateCollectionService,
  GetUserAllCollection,
  GetAllOpentCollection,
};
