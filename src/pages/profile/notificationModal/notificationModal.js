import React, { useEffect, useState } from "react";
import "./notification.css";
import Notification from "./singleNotification";
import { getAllNotification } from "../../../shared/services/general.service";
import { useSelector } from "react-redux";
import Animation from "../../../shared/components/common/Animation";
import { NotFoundAnim } from "../../../assets";
import { Spinner } from "react-bootstrap";
function NotificationModal() {
  const [page, setPage] = useState({
    pageDet: 0,
    perPage: 15,
  });
  const [loader, setLoader] = useState(false);
  const [listNotify, setListNotify] = useState([]);
  const getNotification = () => {
    getAllNotification(page, (notfy) => {
      setLoader(false);
      let cloneListNotify = [...listNotify];
      if (notfy && notfy?.data && notfy?.data?.length > 0) {
        notfy?.data?.forEach((element) => {
          let findInx = cloneListNotify.findIndex((i) => i._id == element?._id);
          if (findInx < 0) {
            cloneListNotify = [...cloneListNotify, element];
          }
        });
        setListNotify(cloneListNotify);
      }
    });
  };
  useEffect(() => {
    setLoader(true);
    getNotification();
  }, []);
  console.log("list nofiy", listNotify);
  return (
    <div className="login-form" style={{ width: "100%" }}>
      <h4 className="margin">Notifications</h4>

      {loader ? (
        <div className="notification-container overflow-auto">
          <Spinner animation="grow" size="lg" />
        </div>
      ) : listNotify && listNotify.length > 0 ? (
        <div className="notification-container overflow-auto">
          {listNotify.map((ntfy, inx) => {
            return <Notification key={inx} data={ntfy} />;
          })}
        </div>
      ) : (
        <div>
          <Animation Pic={NotFoundAnim} Message={"No Notification Found"} />
        </div>
      )}
    </div>
  );
}

export default NotificationModal;
