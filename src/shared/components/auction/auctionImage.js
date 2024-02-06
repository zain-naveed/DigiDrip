import React from "react";
import { RecentActivity2, clientMusic} from "../../../assets";

function AuctionImage({ singleArtwork }) {
  return (
    <>
      <div className="col-md-6 col-lg-4">
        <div className="pastel-path-col-img">
          {singleArtwork?.artwork?.artwork_type == "image" ? (
            <img
              src={singleArtwork?.artwork?.artwork_url || RecentActivity2}
              alt="pastel-path-img"
            />
          ) : singleArtwork?.artwork?.artwork_type == "video" ? (
            <video
              controls
              src={singleArtwork?.artwork?.artwork_url}
              style={{ background: "black" }}
              height="380px"
              width="100%"
              loading="lazy"
            ></video>
          ) : (
            <>
              <img src={clientMusic} style={{ width: "100%" }} />
              <audio
                src={singleArtwork?.artwork?.artwork_url}
                controls
                style={{ width: "100%", background: "#edf0f1c7" }}
              ></audio>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AuctionImage;
