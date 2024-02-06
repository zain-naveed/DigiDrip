import React, { useState } from "react";
import "./createCollection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";
import FileUpload from "../../assets/images/fileupload.png";
import Input from "../../shared/components/common/input";
import TextArea from "../../shared/components/common/TextArea";
import { ImageUpload } from "../../shared/util/mediaUpload";
import { Avatar } from "../../assets";
import { CreateCollectionSchema } from "../../shared/util/validation";
import { Formik } from "formik";
// import * as Yup from "yup";
import { toast } from "react-toastify";
import { CreateCollectionService } from "../../shared/services";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toastMessage } from "../../shared/components/common/toast";
const CreateCollection = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const [bannerUrl, setBannerUrl] = useState(null);
  const [loader, setLoader] = useState(false);
  const { user } = useSelector((state) => state.root);
  const history = useHistory();
  const CoverProfileImageUpload = (e, type) => {
    const files = e.target.files[0];
    ImageUpload(e, (data) => {
      if (data) {
        const fileImage = URL.createObjectURL(files);
        setImageUrl(fileImage);
      } else {
        setImageUrl(null);
      }
    });
  };

  const CoverBannerImageUpload = (e, type) => {
    const files = e.target.files[0];

    ImageUpload(e, (data) => {
      if (data) {
        const fileImage = URL.createObjectURL(files);
        setBannerUrl(fileImage);
      }
    });
  };
  const initialValues = {
    profileImage: null,
    coverImage: null,
    name: "",
    symbol: "",
    description: "",
  };
  return (
    <div className="container1">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, action) => {
          setLoader(true);
          if (user && user?.user) {
            values["owner"] = user?.user?._id;
          }
          CreateCollectionService(values)
            .then((res) => {
              setLoader(false);
              toastMessage(res?.data?.message, "success");
              action.resetForm();
              setBannerUrl(null);
              setImageUrl(null);
              history.push("/profile");
            })
            .catch((err) => {
              setLoader(false);
              toastMessage(err?.response?.data?.message, "error");
            });
          // action.setSubmitting(true);
          // handleSignUp(values, action);
        }}
        validationSchema={CreateCollectionSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          resetForm,
        }) => (
          <>
            <div className="inner-container">
              <CardHeader
                title="Create your collection"
                description="Create, curate and manage collections of unique NFTs to share and
          sell."
              />
              <CardHeader
                title="Logo image"
                description="The image will also be used for navigation. 350 x 350 recommended"
              />
              <input
                type="file"
                name="profileImage"
                // onChange={handleChange("profileImage")}
                onChange={(e) => {
                  setFieldValue("profileImage", e.target.files[0]);
                  // handleChange();
                  CoverProfileImageUpload(e);
                }}
                id="profileImage"
                style={{ display: "none" }}
              />
              <div
                className="image"
                style={{
                  backgroundImage: `url(${imageUrl ? imageUrl : ""})`,
                }}
              >
                <span className="upload-styles">
                  <label htmlFor="profileImage">
                    <img src={FileUpload} className="image-styles" />
                  </label>
                </span>
              </div>

              {touched.profileImage && errors.profileImage && (
                <ErroMsg msg={errors.profileImage} />
              )}

              <CardHeader
                title="Banner image"
                description="The image will also be used for featuring your collection on the home
          page. 600 x 400 recommended"
              />
              <input
                type="file"
                onChange={(e) => {
                  setFieldValue("coverImage", e.target.files[0]);

                  CoverBannerImageUpload(e);
                }}
                id="file2"
                style={{ display: "none" }}
              />
              <div
                className="banner-image-container"
                style={{
                  backgroundImage: `url(${bannerUrl ? bannerUrl : ""})`,
                }}
              >
                <span className="upload-styles">
                  <label htmlFor="file2">
                    <img src={FileUpload} className="image-styles" />
                  </label>
                </span>
              </div>
              {touched.coverImage && errors.coverImage && (
                <ErroMsg msg={errors.coverImage} />
              )}
              <h5>Collection Name</h5>
              <Input value={values.name} onChange={handleChange("name")} />
              {touched.name && errors.name && <ErroMsg msg={errors.name} />}
              <h5>Collection Symbol</h5>
              <Input
                type="text"
                value={values.symbol}
                onChange={handleChange("symbol")}
              />
              {errors.symbol && touched.symbol && (
                <ErroMsg msg={errors.symbol} />
              )}
              <h5>Description</h5>
              <TextArea
                row={5}
                value={values.description}
                onChange={handleChange("description")}
              />
              {touched.description && errors.description && (
                <ErroMsg msg={errors.description} />
              )}

              <a
                href="javascript:void(0)"
                onClick={handleSubmit}
                className="custom-create-btn"
              >
                {loader ? <Spinner animation="grow" size="sm" /> : " Create"}
              </a>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};
const CardHeader = ({ title, description }) => {
  return (
    <div className="card-container">
      <h5> {title}</h5>
      <p>{description}</p>
    </div>
  );
};
const ErroMsg = ({ msg }) => {
  return <div className="mt-3 text-danger">{msg}</div>;
};
export default CreateCollection;
