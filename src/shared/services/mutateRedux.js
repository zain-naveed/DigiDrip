import { setCollectionDetail } from "../redux/reducers/collectionDetail";
import { setUserProfileSlice } from "../redux/reducers/userProfileSlice";
import { store } from "../redux/store";
/**
 *
 * @param {array} apidrop
 * @param {array} apicollection
 * @param {array} apifavoruite
 * @param {objject} dropObj
 */
const profileDetailMutate = (apidrop, apicollection, apifavoruite, dropObj) => {
  const { collection, drops, favoruite } = store.getState().root.userProfile;
  let cloneCollection = [...collection];
  let cloneDrops = [...drops];
  let cloneFavoruite = [...favoruite];

  if (apidrop) {
    if (dropObj) {
      cloneDrops = [...cloneDrops, dropObj];
    } else {
      apidrop?.forEach((element) => {
        let SearchBool = MappingBoolean(cloneDrops, element);
        if (SearchBool) {
          cloneDrops = [...cloneDrops, element];
        }
      });
    }
  }
  if (apicollection) {
    apicollection?.forEach((element) => {
      let SearchBool = MappingBoolean(cloneCollection, element);
      if (SearchBool) {
        cloneCollection = [...cloneCollection, element];
      }
    });
  }
  if (apifavoruite) {
    apifavoruite?.forEach((element) => {
      let SearchBool = MappingBoolean(cloneFavoruite, element);
      if (SearchBool) {
        cloneFavoruite = [...cloneFavoruite, element];
      }
    });
  }
  let obj = {
    collection: cloneCollection,
    drops: cloneDrops,
    favoruite: cloneFavoruite,
  };
  store.dispatch(setUserProfileSlice(obj));
};
const MappingBoolean = (cloneArray, element) => {
  let findInd = cloneArray?.findIndex((i) => element?._id == i?._id);
  if (findInd > -1) {
    return false;
  } else {
    return true;
  }
};
/**
 * @param {object} usrDetail
 */
const userDetailMutate = (usrDetail) => {
  const { collectDetail } = store.getState().root;
  const cloneCollectDetail = { ...collectDetail };
  let CloneArt = [...cloneCollectDetail?.artworks];

  const findInd = CloneArt?.findIndex((i) => i?._id == usrDetail?.id);

  if (findInd > -1) {
  } else {
    CloneArt = [...CloneArt, usrDetail];
  }

  // let obj = {
  //   ...cloneCollectDetail,
  //   artworks: CloneArt,
  // };
  // console.log(obj);

  let obj = {
    ...cloneCollectDetail,
    artworks: CloneArt,
  };

  store.dispatch(setCollectionDetail(obj));
};
const mutateUserDropsAndCollectionArt = (artId, tokenbool, tid) => {
  // -----------------------------user Profile Detail Redux--------------------
  const { collection, drops, favoruite } = store.getState().root.userProfile;
  let cloneCollection = [...collection];
  let cloneDrops = [...drops];
  let cloneFavoruite = [...favoruite];
  let findInd = FindElementAndAuctionOpen(cloneDrops, artId);
  if (findInd > -1) {
    if (tokenbool) {
      let CollartObj = {
        ...cloneDrops[findInd],
      };
      cloneDrops[findInd] = CollartObj;
    } else if (tid) {
      let CollartObj = {
        ...cloneDrops[findInd],
        tokenId: tid,
      };
      cloneDrops[findInd] = CollartObj;
    } else {
      // let CollartObj = {
      //   ...cloneDrops[findInd],
      //   isAuctionOpen: true,
      // };

      cloneDrops.splice(findInd, 1);
    }
  }

  // ------------------------- Collection Detail-------------------------
  const { collectDetail } = store.getState().root;
  const cloneCollectDetail = { ...collectDetail };
  let CloneArt = [...cloneCollectDetail?.artworks];
  let findArtInd = FindElementAndAuctionOpen(CloneArt, artId);
  if (findArtInd > -1) {
    if (tokenbool) {
      let artObj = {
        ...CloneArt[findArtInd],
      };
      CloneArt[findArtInd] = artObj;
    } else if (tid) {
      let artObj = {
        ...CloneArt[findArtInd],
        tokenId: tid,
      };
      CloneArt[findArtInd] = artObj;
    } else {
      // let artObj = {
      //   ...CloneArt[findArtInd],
      //   isAuctionOpen: true,
      // };
      CloneArt.splice(findArtInd, 1);

      // CloneArt[findArtInd] = artObj;
    }
  }
  // ---------------------------- Dispatch Both ------------------------
  let obj = {
    collection: cloneCollection,
    drops: cloneDrops,
    favoruite: cloneFavoruite,
  };

  store.dispatch(setUserProfileSlice(obj));
  let CollectionDetailObj = {
    ...cloneCollectDetail,
    artworks: CloneArt,
  };

  store.dispatch(setCollectionDetail(CollectionDetailObj));
};
const FindElementAndAuctionOpen = (arr, artId) => {
  return arr?.findIndex((i) => i?._id == artId);
};

const deleteArtFromDropsAndCollectionDetail = () => {};
export {
  profileDetailMutate,
  userDetailMutate,
  mutateUserDropsAndCollectionArt,
};
