import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap-tabs";
import OfferBanner from "../../assets/images/offer-bg.png";
import UpArrows from "../../assets/images/up-arrow.png";
import Salenft from "./sale/salenft";
import { GetUserStatistics } from "../../shared/services";
import { convertToEther } from "../../shared/util/dateValid";
import Web3 from "web3";
import { useSelector } from "react-redux";

export default function Offers() {
  const [balance, setBal] = useState(0);
  const [activeTab, setActiveTab] = useState("ntf");
  const [stat, setStat] = useState({});
  const user = useSelector((state) => state.root.user);

  const getBalance = async () => {
    if (window.ethereum) {
      if (user?.user?.address) {
        let web3Instance = await new Web3(window.ethereum);
        let bal = await web3Instance.eth.getBalance(user?.user?.address);
        let ether = await web3Instance.utils.fromWei(bal, "ether");
        setBal(Number(ether).toFixed(5));
      }
    }
  };

  useEffect(() => {
    getBalance();
  });
  useEffect(() => {
    getUserStat();
  }, []);
  const getUserStat = () => {
    GetUserStatistics(user?.user?._id).then(({ data }) => {
      setStat(data?.stats);
    });
  };

  const tabChanged = (index, label) => {
    if (index == 0) setActiveTab("ntf");
    else if (index == 1) setActiveTab("sale");
    else if (index == 2) setActiveTab("timedout");
  };

  return (
    <div>
      <section className="offers-sec">
        <div className="container">
          <div
            className="offers-sec-text"
            style={{ backgroundImage: `url(${OfferBanner})` }}
          >
            <div className="octagonWrap">
              <div className="octagon">
                <div className="octagon-text">
                  <h1>{balance}</h1>
                  {/* <h5>Total Balance</h5> */}
                </div>
              </div>
            </div>
            <div className="send-receive-flex">
              <ul>
                <li>
                  <a href="javascript:void(0)">
                    <img src={UpArrows} alt="up-arrow" />
                    Send
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <img src={UpArrows} alt="up-arrow" />
                    Receive
                  </a>
                </li>
              </ul>
            </div>
            <div className="total-sales-flex">
              <ul>
                <li>
                  <h3>{stat?.soldArts}</h3>
                  <h5>Total #Sales</h5>
                </li>
                <li>
                  <h3>
                    {stat?.totalSoldAmount
                      ? convertToEther(stat?.totalSoldAmount)
                      : 0}{" "}
                    <span>ETH</span>
                  </h3>
                  <h5>Total Sales Value</h5>
                </li>
                {/* <li>
                  <h3>0</h3>
                  <h5>3. Songs/Pieces Collected</h5>
                </li> */}
                <li>
                  <h3>{stat?.purchasedArts}</h3>
                  <h5>Total Collected</h5>
                </li>
                <li>
                  <h3>
                    {stat?.totalPurchasesAmount
                      ? convertToEther(stat?.totalPurchasesAmount)
                      : 0}
                  </h3>
                  <h5>Total Collected Value</h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="drops-collection-sec drops-collection-favorites-sec ">
        <div className="container">
          <Tabs activeKey={activeTab} onSelect={tabChanged}>
            <Tab label="Claim NFT"></Tab>
            <Tab label="Claim Sale"></Tab>
            <Tab label="Claim Back"></Tab>
          </Tabs>
          {activeTab == "ntf" ? <Salenft type={"nft"} /> : null}
          {activeTab == "sale" ? <Salenft type={"sale"} /> : null}
          {activeTab == "timedout" ? <Salenft type={"timedout"} /> : null}
        </div>
      </section>
    </div>
  );
}
