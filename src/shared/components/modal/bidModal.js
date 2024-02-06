import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Bidding } from "../../../assets";
import styles from "../../../pages/tour/auction/pastel.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { placeBidService } from "../../services";
import { toastMessage } from "../../components/common/toast";
import { setLoaderSlice } from "../../redux/reducers/LoaderSlice";
import { placeBid } from "../../services/contract.service";
import { convertToEther, convertToWei } from "../../util/dateValid";

import Web3 from "web3";
function BidModal({ showModal, handleToggleModal, artDetail, confirmMessage }) {
  const { user } = useSelector((state) => state.root.user);
  const [balance, setBalance] = useState(0);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (price == 0) {
      toastMessage("Amount is required", "error");
    } else if (convertToWei(price) > artDetail?.initialPrice) {
      if (price > balance) {
        toastMessage("Your account balance is insufficient", "error");
        return;
      }
      dispatch(setLoaderSlice({ Loader: true }));
      let params = {
        auctionId: artDetail.contractAucId,
        amount: convertToWei(price),
      };
      await placeBid(params);
      dispatch(setLoaderSlice({ Loader: false }));
      window.location.reload();
    } else {
      toastMessage("Amount Must Be Greater than base price", "error");
    }
  };
  const getBalance = async () => {
    if (window.ethereum) {
      if (user?.address) {
        let web3Instance = await new Web3(window.ethereum);
        let bal = await web3Instance.eth.getBalance(user?.address);
        let ether = await web3Instance.utils.fromWei(bal, "ether");
        setBalance(Number(ether).toFixed(2));
      }
    }
  };
  useEffect(() => {
    getBalance();
  }, []);

  return (
    <Modal
      show={showModal}
      backdrop="static"
      onHide={handleToggleModal}
      size="xl"
      centered
    >
      <div className={styles.buttonContainer}>
        <button
          type="button"
          className={styles.closeModalIcon}
          onClick={handleToggleModal}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body modal-body-flex">
        <div className={styles.placeBidImage}>
          <img
            src={artDetail?.artwork_url ? artDetail?.artwork_url : Bidding}
            alt="login-background"
          />
        </div>
        <div className="login-form">
          <h4>Place your bid on Amazing art</h4>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Place your bid in Ether"
              />
            </div>
            <div className={styles.inputFooter}>
              {/* <div className={styles.flex1}>You must bid at least</div> */}
              {/* <div className={styles.flex2}>1.2 ETH ($12.1541)</div> */}
            </div>
            <div className={styles.balance}>
              <div className={styles.balanceCard}>
                <p className={styles.balanceLeft}>Your balance</p>
                <p className={styles.flex2}>{balance} ETH </p>
              </div>
              <div className={styles.balanceCard}>
                <p className={styles.balanceLeft}>Base Price</p>
                <p className={styles.flex2}>
                  {convertToEther(artDetail?.initialPrice)}
                </p>
              </div>
            </div>
            <input
              type="submit"
              value="Submit bid"
              className={styles.submitStyles}
            />
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default BidModal;
