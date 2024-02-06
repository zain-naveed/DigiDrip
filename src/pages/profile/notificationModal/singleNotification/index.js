import React from "react";
import "./styles.css";
import { NOTIFICATION_TYPE } from "../../../../shared/util/enums";
import { convertToEther } from "../../../../shared/util/dateValid";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
function Notification({ data }) {
  const history = useHistory();
  const { user } = useSelector((state) => state.root);
  console.log(user?.user?._id);
  return (
    <div className="main_container">
      <div className="notify_container">
        <p
          className="bold_text"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (data?.receiver?._id == user?.user?._id) {
              console.log("zain", user?.user?._id, data?.receiver?._id);
              history.push("/profile");
            } else if (user?.user?._id != data?.receiver?._id) {
              history.push(`/viewProfile/${data?.receiver?._id}`);
            }
          }}
        >
          {data?.receiver?.userName}{" "}
        </p>
        <p className="simple_text ml-1">
          {NOTIFICATION_TYPE.NFT_BUY == data?.type ? (
            <>
              {" "}
              {`has Buy NFT  ${convertToEther(
                data?.extraData?.sale?.price
              )} Ether on `}
              <span
                className="bold_text ml-1"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`/Art/${data?.extraData?.sale?.artwork?._id}`);
                }}
              >
                {data?.extraData?.sale?.artwork?.name}
              </span>
            </>
          ) : (
            ""
          )}
        </p>

        <p className="minutes_text">{moment(data?.createdAt).fromNow()}</p>
      </div>
      <div className="divider" />
    </div>
  );
}

export default Notification;
