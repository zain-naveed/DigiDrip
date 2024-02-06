import React, { useState } from "react";
import { CloudImage } from "../../assets";
import { Formik } from "formik";
import { SUBMIT_NFT_SCHEMA } from "../../shared/util/validation";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import {
  SaveArt,
  userDetailMutate,
  updateTokenIdOfArtwork,
  mutateUserDropsAndCollectionArt,
  profileDetailMutate,
} from "../../shared/services";
import { ArtUploadImage } from "../../shared/util/mediaUpload";
import Nftinput from "../../shared/components/common/nftinput";
import {
  mintCollection,
  mintArtwork,
} from "../../shared/services/contract.service";
import { PRODUCTION_DOMAIN } from "../../shared/util/AppEndpoint";
import { toastMessage } from "../../shared/components/common/toast";
import { setLoaderSlice } from "../../shared/redux/reducers/LoaderSlice";
import { convertToWei } from "../../shared/util/dateValid";

function SubmitNftForm({ HideModal, collectionobj, collectnArr }) {
  const { user } = useSelector((state) => state.root.user);

  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const [collectobj, setCollectionobj] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [artUrl, setArtUrl] = useState(null);
  const [mediaType, setMediaType] = useState("image");

  const initialValues = {
    image: null,
    name: "",
    price: "",
    description: "",
  };
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "video/mp4",
    "audio/mp3",
    "video/mov",
    "video/wmv",
    "video/avi",
    "audio/mpeg",
  ];
  const Valid = (obj) => {
    if (!!obj?.collectionId) {
      return true;
    } else {
      setErrorMsg("Please Select the Collection");
      return false;
    }
  };
  const handleSubmit = async (resp) => {
    let obj = {};
    let CollectoinObject = {};

    obj["creater"] = user?._id;

    if (collectobj?._id) {
      obj["collectionId"] = collectobj?._id;
      CollectoinObject = collectobj;
    } else if (collectionobj) {
      obj["collectionId"] = collectionobj?._id;
      CollectoinObject = collectionobj;
    }
    if (SUPPORTED_FORMATS.includes(resp?.image?.type)) {
      obj["artwork_type"] = resp?.image?.type.substr(0, 5);
      obj["image"] = resp?.image;
    }
    obj["name"] = resp?.name;
    obj["description"] = resp?.description;
    obj["price"] = convertToWei(resp?.price);

    let validate = Valid(obj);

    if (validate) {
      dispatch(setLoaderSlice({ Loader: true }));

      if (
        !CollectoinObject?.collectionAddress &&
        CollectoinObject?.artworks?.length == 0
      ) {
        save_artwork(obj, true, CollectoinObject);
      } else {
        save_artwork(obj, false, CollectoinObject);
      }
    }
  };

  const save_artwork = (obj, FirstArt, CollectionObject) => {
    SaveArt(obj)
      .then(async (data) => {
        let cloneRes = { ...data?.data?.updatedArtwork };

        cloneRes["reload"] = true;

        let newRes = {
          ...data?.data,
          updatedArtwork: cloneRes,
        };
        let res = {
          ...data,
          data: newRes,
        };

        userDetailMutate(res?.data?.updatedArtwork);
        profileDetailMutate(true, false, false, res?.data?.updatedArtwork);
        if (FirstArt) {
          let abiParam = {
            collectName: CollectionObject?.name,
            artName: res?.data?.updatedArtwork.name,
            artUrl: `${PRODUCTION_DOMAIN}collection/${CollectionObject?._id}/`,
          };
          await mintCollection(abiParam);
          dispatch(setLoaderSlice({ Loader: false }));
          mutateUserDropsAndCollectionArt(res?.data?.updatedArtwork?._id, true);
          toastMessage(res?.data?.message, "success");
          HideModal();
        } else {
          let params = {
            collectionAddress: CollectionObject.collectionAddress,
            address: user.address,
          };
          let mintResponse = await mintArtwork(params);
          let artworkParams = {
            artworkId: res?.data?.updatedArtwork._id,
            tokenId: mintResponse?.events.Transfer.returnValues?.tokenId,
          };
          updateTokenIdOfArtwork(artworkParams)
            .then((sucs) => {
              mutateUserDropsAndCollectionArt(
                sucs?.data?.data?._id,
                false,
                sucs?.data?.data?.tokenId || false
              );
              dispatch(setLoaderSlice({ Loader: false }));
              toastMessage(res?.data?.message, "success");
              HideModal();
            })
            .catch((error) => {
              dispatch(setLoaderSlice({ Loader: false }));
              toastMessage("Error in minting artwork", "error");
              HideModal();
            });
        }
      })
      .catch((err) => {
        dispatch(setLoaderSlice({ Loader: false }));
        toastMessage(err?.response?.data?.message, "error");
      });
  };

  const ImageUpload = (e) => {
    let files = e.target.files[0];
    ArtUploadImage(e, (bool, type) => {
      console.log("types", type);
      if (bool) {
        if (type == "image") {
          setMediaType(type);
          const fileImage = URL.createObjectURL(files);
          setArtUrl(fileImage);
        } else if (type == "video") {
          setMediaType(type);
          const fileImage = URL.createObjectURL(files);
          setArtUrl(fileImage);
        }
      } else {
        if (type == "audio") {
          setMediaType(type);
          const fileImage = URL.createObjectURL(files);
          setArtUrl(fileImage);
        } else {
          setArtUrl(null);
        }
      }
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        handleSubmit(values);
      }}
      validationSchema={SUBMIT_NFT_SCHEMA}
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
        <form>
          <label
            htmlFor="file"
            className="FileCloud"
            style={{ overflow: "hidden" }}
          >
            <div className="cloud-computing">
              <input
                style={{ display: "none" }}
                id="file"
                type="file"
                onChange={(e) => {
                  ImageUpload(e);
                  setFieldValue("image", e.target.files[0]);
                }}
              />
              {mediaType == "image" ? (
                <img src={artUrl ? artUrl : CloudImage} alt="cloud-computing" />
              ) : mediaType == "video" ? (
                <video src={artUrl}> </video>
              ) : (
                <audio controls src={artUrl}>
                  {" "}
                </audio>
              )}

              {artUrl ? "" : "Submit Your Nft’s"}
            </div>
          </label>

          {errors.image && touched.image && (
            <ErrorMsg errorMsg={errors.image} />
          )}
          <div className="custom-nft-form">
            <Nftinput
              type="text"
              value={values.name}
              placeholder="Full Name"
              onChange={handleChange("name")}
            />
            {errors.name && touched.name && <ErrorMsg errorMsg={errors.name} />}
            <Nftinput
              type="number"
              value={values.price}
              placeholder="Price in Ether"
              onChange={handleChange("price")}
            />
            {errors.price && touched.price && (
              <ErrorMsg errorMsg={errors.price} />
            )}

            {collectnArr && collectnArr?.length ? (
              <div className="input-container">
                <select
                  className="custom-selection"
                  style={{
                    backgroundColor: "rgb(234 237 240 / 39%)",
                    color: "rgb(156 163 170)",
                  }}
                  onChange={(e) => {
                    if (e.target.value == "") {
                      setCollectionobj(null);
                    } else {
                      setCollectionobj(JSON.parse(e.target.value));
                    }
                    setErrorMsg("");
                  }}
                >
                  <option value="">Select Collection</option>
                  {collectnArr?.map((cln, inx) => {
                    return (
                      <option key={inx} value={JSON.stringify(cln)}>
                        {cln?.name}
                      </option>
                    );
                  })}
                </select>
                {errorMsg && errorMsg !== "" && (
                  <ErrorMsg errorMsg={errorMsg} />
                )}
              </div>
            ) : (
              ""
            )}

            <div className="input-container">
              <textarea
                value={values.description}
                placeholder="Description"
                onChange={handleChange("description")}
              ></textarea>
            </div>
            {errors.description && touched.description && (
              <ErrorMsg errorMsg={errors.description} />
            )}
          </div>
          <button
            onClick={handleSubmit}
            disabled={loader}
            className="custom-site-btn"
          >
            {loader ? <Spinner animation="grow" size="sm" /> : "Mint"}
          </button>
        </form>
      )}
    </Formik>
  );
}
const ErrorMsg = ({ errorMsg }) => {
  return (
    <div className="error" style={{ fontSize: "14px" }}>
      {errorMsg}
    </div>
  );
};
export default SubmitNftForm;
