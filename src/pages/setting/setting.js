import React from "react";
import "./styles.css";

function Setting() {
  return (
    <div className="settings-main" style={{ width: "100%" }}>
      <h4 className="margin">Settings</h4>
      <div className="settings-ctn">
        <p className="settings-heading">Email Notifications</p>
        <EmailNotification
          text="Transaction-based notifications"
          id="1"
        ></EmailNotification>
        <EmailNotification
          text="New follower notifications"
          id="2"
        ></EmailNotification>
        <EmailNotification
          text="New artwork notifications"
          id="3"
        ></EmailNotification>
        <EmailNotification
          text="New likes notifications"
          id="4"
        ></EmailNotification>
      </div>
      {/* <div className="settings-ctn">
        <p className="settings-heading">Minimum Bid</p>
        <div>
          <p className="bid-text">Require incoming bid to be atleast</p>
          <p className="bid-amount">0 ETH</p>
        </div>
      </div>
      <div className="settings-ctn">
        <p className="settings-heading">Transaction History</p>
        <p className="underline">
          <u>Download transaction history</u>
        </p>
      </div> */}
      <button className="custom-site-btn-sm">Save</button>
    </div>
  );
}

function EmailNotification(params) {
  return (
    <div className="email-notify">
      <p className="bid-text">{params.text}</p>
      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input"
          id={params.id}
        />
        <label className="custom-control-label" for={params.id}></label>
      </div>
    </div>
  );
}
export default Setting;
