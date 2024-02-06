import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./cardImage.css";
import { useHistory, useParams } from "react-router-dom";
import OptionsModal from "../modal/optionsModal";
import SaleModal from "../modal/saleModal";
import EditProfileModal from "../modal/editProfileModal";
import { clientMusic } from "../../../assets";

function CardImage({
  src,
  name,
  dropType,
  type,
  response,
  navigate,
  subtype,
  saleIt,
  claimNft,
  handleClaim,
}) {
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);
  const [saleOpen, setSaleOpen] = useState(false);

  const openModal = () => setOpen(true);
  const openSaleModal = () => setSaleOpen(true);
  const closeModal = () => setOpen(false);
  const closeSaleModal = () => setSaleOpen(false);

  return (
    <>
      {src && (
        <div>
          <div className="conImage">
            {dropType == "image" ? (
              <img
                src={src}
                alt="drops-img1"
                // className="image"
                height="380px"
                width="100%"
                onClick={navigate}
                loading="lazy"
              />
            ) : dropType == "video" ? (
              <video
                src={src}
                height="380px"
                width="100%"
                style={{ background: "black" }}
                onClick={navigate}
                loading="lazy"
              ></video>
            ) : (
              <img
                src={clientMusic}
                alt="drops-img1"
                // className="image"
                height="380px"
                width="100%"
                onClick={navigate}
                loading="lazy"
              />
            )}

            <div
              className={`${
                type == "success"
                  ? "overlay"
                  : type == "failed"
                  ? "dangerOverlay"
                  : type == "dropfailed"
                  ? "dangerOverlay"
                  : "overlay"
              }`}
            >
              <div
                className={`${
                  type == "success"
                    ? "text"
                    : type == "failed"
                    ? "danger"
                    : type == "dropfailed"
                    ? "danger"
                    : "text"
                }`}
              >
                {name}
              </div>
            </div>
          </div>
          {type == "success" ? (
            <div className="contBody">
              {subtype == "nft" ? (
                <button className="contbutt" onClick={handleClaim}>
                  Claim NFT
                </button>
              ) : null}
              {subtype == "sale" ? (
                <button onClick={handleClaim} className=" contbutt">
                  Claim Sale
                </button>
              ) : null}
              {subtype == "timedout" ? (
                <button onClick={handleClaim} className=" contbutt">
                  Claim Back
                </button>
              ) : null}

              {!subtype && (
                <>
                  <button className="mx-1 contbutt" onClick={() => openModal()}>
                    Auction
                  </button>
                  <button className="contbutt" onClick={() => openSaleModal()}>
                    Sell Now
                  </button>
                </>
              )}
            </div>
          ) : type == "Wait" ? (
            <div className="contBody">
              <button
                className="contbutt"
                onClick={() => window.location.reload()}
              >
                Minting in progress, Please reload
              </button>
            </div>
          ) : type == "failed" ? (
            <div className="contBody">Mint Failed</div>
          ) : (
            ""
          )}
        </div>
      )}

      {response && (
        <OptionsModal
          openModal={isOpen}
          HideModal={closeModal}
          artDetail={response}
        />
      )}

      {response && (
        <SaleModal
          openModal={saleOpen}
          HideModal={closeSaleModal}
          artDetail={response}
        />
      )}
    </>
  );
}

export default CardImage;
