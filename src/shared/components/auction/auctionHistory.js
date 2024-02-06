import React, { useState, useEffect } from "react";
import moment from "moment";
import Avatar from "../common/Avatar";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
function AuctionHistory({ history }) {
  const Userhistory = useHistory();
  const user = useSelector((state) => state.root.user);
  const navigateUser = (navId) => {
    if (user?.token) {
      if (navId == user?.user?._id) {
        Userhistory.push({
          pathname: `/profile`,
        });
      } else {
        Userhistory.push({
          pathname: `/viewProfile/${navId}`,
        });
      }
    } else {
      Userhistory.push({
        pathname: `/viewProfile/${navId}`,
      });
    }
  };
  return (
    <>
      {history && history?.length > 0 && (
        <section className="pastel-path-histroy">
          <div className="container">
            <div className="pastel-path-histroy-flex">
              <div className="driptivity-transcending-leading-col">
                <h3>History</h3>
                <ul>
                  {history && history?.length > 0
                    ? history.map((hs, inx) => {
                        return (
                          <li key={inx}>
                            <Avatar image={hs?.bidder?.profilePic} />

                            <div className="driptivity-transcending-text">
                              <h6 onClick={() => navigateUser(hs?.bidder?._id)}>
                                @{hs?.bidder?.userName}
                              </h6>
                              <span>
                                {" "}
                                {moment(hs?.createdAt).fromNow().toUpperCase()}
                              </span>
                            </div>
                          </li>
                        );
                      })
                    : ""}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default AuctionHistory;
