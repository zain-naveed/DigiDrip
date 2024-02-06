import interceptor, { HTTP_CLIENT } from "../util/intercepter";
import { store } from "../redux/store";
import { setUser } from "../redux/reducers/userSlice";
import { setLoaderSlice } from "../redux/reducers/LoaderSlice";
import { toastMessage } from "../components/common/toast";
import { mutateUserDropsAndCollectionArt } from ".";
const GetAllUserArts = (obj) => {
  return HTTP_CLIENT.get(
    `artwork/getUserArtworks?page=${obj.page}&perPage=${obj.limit}&userId=${obj.userId}`
  );
};
const GetAllUserArtFavourite = (obj) => {
  return HTTP_CLIENT.get(
    `artwork/getFavouriteArtworks?page=${obj.page}&perPage=${obj.limit}&userId=${obj.userId}`
  );
};
const SaveArt = (obj) => {
  let FormBody = new FormData();
  if (Object.keys(obj).length > 0) {
    Object.keys(obj).forEach((res) => {
      FormBody.append(`${res}`, obj[res]);
    });
    return HTTP_CLIENT.post(`artwork/saveArtwork`, FormBody);
  }
};
const getSingleArtService = (artId) => {
  return HTTP_CLIENT.get(`artwork/getSingleArtwork?artworkId=${artId}`);
};
const increaseViewCountService = (artworkId) => {
  return HTTP_CLIENT.post(`artwork/increaseViewCount`, { artworkId });
};
const updateTokenIdOfArtwork = (params) => {
  return HTTP_CLIENT.post(`artwork/updateTokenId`, params);
};
const startAuctionService = (obj) => {
  return HTTP_CLIENT.post("artwork/openArtworkAuction", obj);
};
const mintAuction = (params) => {
  return HTTP_CLIENT.post("artwork/changeAuctionStatus", params);
};
const placeBidService = (obj) => {
  return HTTP_CLIENT.post("artwork/placeBid", obj);
};
const IncreaseViewCountArt = () => {
  return HTTP_CLIENT.post("artwork/increaseViewCount");
};
const getAllAuctions = (obj, filter) => {
  return HTTP_CLIENT.get(
    `auction/getAuctionListing?page=${obj.page}&perPage=${obj.limit}${
      filter && filter
    }`
  );
};
const getAllSales = (obj, filter) => {
  return HTTP_CLIENT.get(
    `sales/getSaleListing?page=${obj.page}&perPage=${obj.limit}${
      filter && filter
    }`
  );
};
const getSaleDetail = (saleId) => {
  return HTTP_CLIENT.get(
    `sales/getSaleDetails/?saleId=${saleId}
    `
  );
};
const getAuctionDetail = (aucId) => {
  return HTTP_CLIENT.get(
    `auction/getAuctionDetails/?aucId=${aucId}
    `
  );
};
const getOpenArtWorkList = (collectionId) => {
  return HTTP_CLIENT.get(
    `artwork/getCollectionArtworks?collectionId=${collectionId}`
  );
};
const AddFavouriteArtService = (obj) => {
  HTTP_CLIENT.get(`artwork/addToFavourite`, obj)
    .then((res) => {
      let UserWithToken = store.getState().root.user;
      let cloneUser = { ...UserWithToken?.user };
      let artwork = [...cloneUser?.artworks];
      artwork.push(obj.artworkId);
      let obj = {
        ...UserWithToken,
        token: UserWithToken?.token,
        user: {
          ...cloneUser,
          artworks: artwork,
        },
      };
      store.dispatch(setUser(obj));
      store.dispatch(setLoaderSlice({ Loader: false }));
      toastMessage(res?.data?.message, "success");
    })
    .catch((err) => {
      store.dispatch(setLoaderSlice({ Loader: false }));
      toastMessage(err?.response?.data?.message, "error");
    });
};
const deleteArtService = (obj, callback) => {
  HTTP_CLIENT.post("artwork/deleteArtwork", obj)
    .then((res) => {
      mutateUserDropsAndCollectionArt(obj.artworkId, false, false);
      toastMessage(res?.data?.message, "success");
      callback(true);
    })
    .catch((err) => {
      toastMessage(err?.response?.data?.message, "error");
      callback(false);
    });
};
const claimNftService = (obj, callback) => {
  HTTP_CLIENT.get(
    `artwork/getClosedAuctions?page=${obj.page}&perPage=${obj.limit}`
  )
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      toastMessage(err?.response?.data?.message, "error");
      callback(false);
    });
};
const claimSaleService = (obj, callback) => {
  HTTP_CLIENT.get(
    `artwork/getSoldAuctions?page=${obj.page}&perPage=${obj.limit}`
  )
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      toastMessage(err?.response?.data?.message, "error");
      callback(false);
    });
};

const getTimedOutAuctions = (obj, callback) => {
  return HTTP_CLIENT.get(
    `artwork/getTimeoutAuctions?page=${obj.page}&perPage=${obj.limit}`
  );
};

const artHistoryService = (obj, callback) => {
  HTTP_CLIENT.get(
    `artwork/getArtworkHistory?artworkId=${obj.artwork}&page=${obj.page}&perPage=${obj.limit}`
  )
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      toastMessage(err?.response?.data?.message, "error");
      callback(false);
    });
};
const auctionHistoryService = (auctId, callback) => {
  HTTP_CLIENT.get(`artwork/getAuctionBids?auctionId=${auctId}`)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      toastMessage(err?.response?.data?.message, "error");
      callback(false);
    });
};
const getTransendingArtist = () => {
  return HTTP_CLIENT.get(`general/getTranscendingArtists`);
};
const getLeadingCollectors = () => {
  return HTTP_CLIENT.get(`general/getLeadingCollectors`);
};
export {
  GetAllUserArts,
  GetAllUserArtFavourite,
  SaveArt,
  getSingleArtService,
  startAuctionService,
  placeBidService,
  IncreaseViewCountArt,
  updateTokenIdOfArtwork,
  getAllAuctions,
  getOpenArtWorkList,
  increaseViewCountService,
  mintAuction,
  AddFavouriteArtService,
  deleteArtService,
  claimNftService,
  claimSaleService,
  artHistoryService,
  auctionHistoryService,
  getTimedOutAuctions,
  getAllSales,
  getSaleDetail,
  getAuctionDetail,
  getTransendingArtist,
  getLeadingCollectors,
};
