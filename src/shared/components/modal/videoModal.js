import React from "react";
import ModalVideo from "react-modal-video";
function VideoModal({ isOPen, CloseOpen, url }) {
  return (
    <ModalVideo
      channel="custom"
      url={url}
      autoplay
      isOpen={isOPen}
      videoId="L61p2uyiMSo"
      onClose={CloseOpen}
    />
  );
}

export default VideoModal;
