import React, { useState, useEffect } from "react";
import { EditCover, clientMusic } from "../../../assets";
import Input from "../../../shared/components/common/input";
import TextArea from "../../../shared/components/common/TextArea";
import OptionsModal from "../../../shared/components/modal/optionsModal";
import SaleModal from "../../../shared/components/modal/saleModal";
import "./collectionDetail.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderSlice } from "../../../shared/redux/reducers/LoaderSlice";
import { getSingleArtService } from "../../../shared/services";
import { convertToEther } from "../../../shared/util/dateValid";
export default function EditCollectionArt() {
  const param = useParams();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [OpenSale, setOpenSale] = useState(false);
  const [artDetail, setArtDetail] = useState(null);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const openSaleModal = () => setOpenSale(true);
  const closeSaleModal = () => setOpenSale(false);
  const { user } = useSelector((state) => state.root.user);
  const getSingleArt = () => {
    dispatch(setLoaderSlice({ Loader: true }));
    getSingleArtService(param?.id)
      .then((artresp) => {
        setArtDetail(artresp?.data?.data);
        dispatch(setLoaderSlice({ Loader: false }));
      })
      .catch((err) => {
        dispatch(setLoaderSlice({ Loader: false }));
      });
  };
  useEffect(() => {
    getSingleArt();
  }, []);
  console.log(artDetail);
  return (
    <>
      <div className="pastel-path-content">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4">
               
                {artDetail?.artwork_type == "video" ? (
                  <video
                    style={{
                      width: "inherit",
                      height: "400px",
                      background: "black",
                    }}
                    src={artDetail?.artwork_url}
                    controls
                  ></video>
                ) : artDetail?.artwork_type == "audio" ? (
                  <>
                    <img src={clientMusic} style={{ width: "100%" }} />
                    <audio
                      src={artDetail?.artwork_url}
                      controls
                      style={{ width: "100%", background: "#edf0f1c7" }}
                    ></audio>
                  </>
                ) : (
                  <img
                    src={
                      artDetail && artDetail?.artwork_url
                        ? artDetail?.artwork_url
                        : EditCover
                    }
                  />
                )}
            </div>
            <div className="col-md-6">
              <div className="header">
                <h3>{artDetail?.name}</h3>
                {user && user?._id == artDetail?.owner?._id ? (
                  <div>
                    <a
                      href="javascript:void(0)"
                      className="collection-btn mr-1"
                      onClick={openModal}
                    >
                      Auction
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="collection-btn"
                      onClick={openSaleModal}
                    >
                      Sell Now
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <TextArea
                row={3}
                disabled={true}
                placeholder="Description"
                onChange={(e) => console.log(e.target.value)}
                value={artDetail?.description}
              />
              <div className="collection-container">
                <label className="label">Price</label>
                <div className="collection-inline">
                  <input
                    type="text"
                    value={convertToEther(artDetail?.price)}
                    className="small-input"
                    disabled={true}
                  />
                  {/* <div className="small-input price">$40000</div> */}
                </div>
              </div>
              {/* <div className="collection-container">
                <label className="label">Time</label>
                <div className="collection-inline">
                  <div className="time">
                    <div className="number">19</div>
                    <label className="mins">hrs</label>
                  </div>
                  <div className="time">
                    <div className="number">19</div>
                    <label className="mins">hrs</label>
                  </div>
                  <div className="time">
                    <div className="number">19</div>
                    <label className="mins">hrs</label>
                  </div>
                </div>
              </div> */}
              {/* <div className="collection-container">
                <select className="custom-selection">
                  <option>Select</option>
                </select>
                <select className="custom-selection">
                  <option>Select</option>
                </select>
              </div> */}
            </div>
          </div>
        </div>
        <SaleModal
          openModal={OpenSale}
          HideModal={closeSaleModal}
          artDetail={artDetail}
        />
        <OptionsModal
          openModal={isOpen}
          HideModal={closeModal}
          artDetail={artDetail}
        />
      </div>
    </>
  );
}
