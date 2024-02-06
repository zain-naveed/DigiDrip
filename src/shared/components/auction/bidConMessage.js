import React from "react";
import { Bidding } from "../../../assets";
import styles from "../../../pages/tour/auction/pastel.module.scss";
function BidConMessage({ handleToggleModal2 }) {
  return (
    <>
      <div className="row main-ctn">
        <div className="col-sm-5">
          <img src={Bidding} alt="login-background" className="confirm-image" />
        </div>
        <div className="col-sm-7">
          <p className="confirm-purchase">Confirm Purchase of Amazing Art</p>
          <div className={styles.bidFooter}>
            <p className={styles.titleLeft}>Last Sale Price:</p>
            <p className={styles.priceRight}>4.12 ($10.545)</p>
          </div>
          <input
            type="submit"
            value="Confirm"
            className="confirm-button"
            onClick={handleToggleModal2}
          />
        </div>
      </div>
    </>
  );
}

export default BidConMessage;
