import React, { Component, useState, useEffect } from "react";
import Header from "../../shared/components/includes/Header";
import Footer from "../../shared/components/includes/Footer";
import { useHistory } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap-tabs";
import HomeBanner from "../../assets/images/home-img.png";
import HomeBanner1 from "../../assets/images/home-banner.png";
import Image1 from "../../assets/images/vestibulum-lobortis-bg.png";
import Image2 from "../../assets/images/lets-collect-img.png";
import RecentActivity1 from "../../assets/images/recent-activity-img1.png";
import RecentActivity2 from "../../assets/images/recent-activity-img2.png";
import RecentActivity3 from "../../assets/images/recent-activity-img3.png";
import BrainImg from "../../assets/images/brain-img.png";
import HapticImg from "../../assets/images/haptic.png";
import HapticImg1 from "../../assets/images/haptic.png";
import TableImg from "../../assets/images/table-img6.jpg";
import { clientMusic } from "../../assets";
import { getActivities } from "../../shared/services/general.service";
import Web3 from "web3";
import { fromNow } from "../../shared/util/dateValid";
import { HISTORY_TYPE } from "../../shared/util/enums";
import style from "./home.module.scss";
import Transend from "./transend";
import LeadingCollector from "./leadingCollector";
import {Link} from 'react-router-dom'
export default function Home(props) {
  const history = useHistory();
  const [activities, setactivity] = useState([]);
  const [wait, setWait] = useState(false);

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = () => {
    setWait(true);
    let params = {
      page: 0,
      perPage: 3,
    };
    getActivities(params)
      .then((res) => {
        let cloneActivty = [...activities];
        setWait(false);
        if (res && res?.data && res?.data?.data && res?.data?.data.length > 0) {
          res?.data?.data?.forEach((resp) => {
            let checkInd = cloneActivty.findIndex((i) => i._id == resp._id);
            if (checkInd < 0) {
              if (resp && resp?.artwork) {
                cloneActivty = [...cloneActivty, resp];
              }
            }
            console.log(resp);
          });
          setactivity(cloneActivty);
        }

        console.log(res);
      })
      .catch(() => {
        setWait(false);
      });
  };
  const navigate = (path) => {
    history.push({
      pathname: path,
    });
  };
  return (
    <div>
      <section
        className="home-banner"
        style={{ backgroundImage: `url(${HomeBanner1})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="home-text">
                <h5>Collect DigiDrip</h5>
                <h1>
                  Premier Music <span> & Artwork</span>
                </h1>
                <button
                  className="custom-site-btn"
                  onClick={() => history.push("/tour")}
                >
                  Let’s Collect
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="home-img">
                <img src={HomeBanner} alt="home-img" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="vestibulum-lobortis"
        style={{ backgroundImage: `url(${Image1})` }}
      >
        <div className="container">
          <div className="vestibulum-text">
            <h3>Vestibulum lobortis sed arcu quis</h3>
            <p>
              Morbi vitae congue ex Suspendisse nec nunc augue Integer laoreet
              porttitor mollis Donec efficitur, velit eu posuere ornare, leo
              neque dictum nulla fringilla sapien sit amet faucibus venenatis.
            </p>
            <Link to="/work">Learn More About</Link>
          </div>
        </div>
      </section>
      <section className="lets-collect-sec">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="lets-collect-col-img">
                <img src={Image2} alt="lets-collect-img" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="lets-collect-col-text">
                <h3>Vestibulum lobortis sed arcu quis</h3>
                <p>
                  Morbi vitae congue ex Suspendisse nec nunc augue Integer
                  laoreet porttitor mollis Donec efficitur, velit eu posuere
                  ornare, leo neque dictum nulla. Donec fringilla sapien sit
                  amet faucibus venenatis. Sed fermentum tempus ante in
                  fermentum non purus vitae mauris faucibus condimentum.
                </p>
                <p>
                  Morbi vitae congue ex Suspendisse nec nunc augue Integer
                  laoreet porttitor mollis Donec efficitur, velit eu posuere
                  ornare.
                </p>
                <button
                  className="custom-site-btn"
                  onClick={() => history.push("/tour")}
                >
                  Let’s Collect
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="recent-activity">
        <div className="container">
          <h3>Recent Activity</h3>
          {activities && activities?.length > 0 ? (
            <>
              <div className="recent-activity-flex">
                {activities.map((activity) => {
                  let ethers = null;
                  if (activity.type == HISTORY_TYPE.BID_PLACED)
                    ethers = Web3.utils.fromWei(
                      `${activity?.bid?.bid_amount}`,
                      "ether"
                    );
                  return (
                    <div className="recent-activity-col">
                    <div className={`recent-activity-img homi  ${activity?.artwork?.artwork_type ==  'audio' ? 'whte':'activity-image'} `}>
                        {activity?.artwork?.artwork_type == "image" ? (
                          <img
                            onClick={() =>
                              navigate(`/Art/${activity?.artwork?._id}`)
                            }
                            className={style.image}
                            src={activity?.artwork?.artwork_url}
                            alt="recent-activity-img1"
                          />
                        ) : activity?.artwork?.artwork_type == "video" ? (<>
                          {
                            console.log("videos",activity?.artwork?.artwork_url)
                          }
                          <video
                          preload="auto"
                          className={style.image}
                            controls
                            src={activity?.artwork?.artwork_url}
                            style={{ background: "black" }}
                            loading="lazy"
                            onClick={() =>
                              navigate(`/Art/${activity?.artwork?._id}`)
                            }
                          ></video>
                          </>
                        ) : activity?.artwork?.artwork_type == "audio" ? (
                          <img
                            onClick={() =>
                              navigate(`/Art/${activity?.artwork?._id}`)
                            }
                            className={style.image}
                            src={clientMusic}
                            alt="recent-activity-img1"
                          />
                        ):""}
                      </div>
                      <div className="recent-activity-text">
                        {activity.type == HISTORY_TYPE.BID_PLACED ? (
                          <>
                            <span>{fromNow(activity.bid.createdAt)} </span>
                            <h6>
                              <span
                                className={style.pointer}
                                onClick={() =>
                                  navigate(
                                    `/viewProfile/${activity?.bid?.bidder?._id}`
                                  )
                                }
                              >{`@${activity.bid.bidder.userName}`}</span>{" "}
                              made an bid of about{" "}
                              {`${parseFloat(ethers).toFixed(2)} Ether`} on{" "}
                              <span>{`${activity.artwork?.name} artwork`}</span>
                            </h6>
                          </>
                        ) : null}
                        {activity.type == HISTORY_TYPE.ARTWORK_CREATED ? (
                          <>
                            <span>{fromNow(activity.createdAt)} </span>
                            <h6>
                              <span
                                className={style.pointer}
                                onClick={() =>
                                  navigate(
                                    `/viewProfile/${activity?.owner?._id}`
                                  )
                                }
                              >{`@${activity.owner.userName}`}</span>{" "}
                              created an action of artwork{" "}
                              <span>{`${activity?.artwork?.name}`}</span>
                            </h6>
                          </>
                        ) : null}
                        <a
                          href="javascript:void(0)"
                          onClick={() =>
                            navigate(`/viewProfile/${activity?.owner?._id}`)
                          }
                        >
                          Learn More About
                        </a>
                      </div>
                    </div>
                  );
                })}

                {/* <div className="recent-activity-col">
                    <div className="recent-activity-img">
                      <img src={RecentActivity2} alt="recent-activity-img2" />
                    </div>
                    <div className="recent-activity-text">
                      <span>3 HOURS AGO </span>
                      <h6>
                        <span>@eux</span> made an offer for about $227 on{" "}
                        <span>Tora</span>
                      </h6>
                      <a href="#">Learn More About</a>
                    </div>
                  </div>
                  <div className="recent-activity-col">
                    <div className="recent-activity-img">
                      <img src={RecentActivity3} alt="recent-activity-img3" />
                    </div>
                    <div className="recent-activity-text">
                      <span>3 HOURS AGO </span>
                      <h6>
                        <span>@eux</span> made an offer for about $227 on{" "}
                        <span>Tora</span>
                      </h6>
                      <a href="#">Learn More About</a>
                    </div>
                  </div> */}
              </div>
              <div className="recent-activity-btn">
                <a
                  href="javascript:void(0)"
                  onClick={() => navigate("/driptivity")}
                  className="custom-site-btn"
                >
                  View all Activities
                </a>
              </div>
            </>
          ) : (
            <h6 className={"noactivity"}>No recent activity yet</h6>
          )}
        </div>
      </section>
      <section className="what-nf">
        <div className="container">
          <h3>NF What? Tools to create your own NFT</h3>
          <div className="row">
            <div className="col-md-4">
              <div className="what-nf-col">
                <div className="what-nf-img">
                  <img src={HapticImg1} alt="haptic" />
                </div>
                <div className="what-nf-text">
                  <h5>15.9 ETH ($30,494.77 USD)</h5>
                  <span className="what-nf-bar"></span>
                  <p>
                    Praesent et enim id sapien sagittis facilisis et enim id
                    sapien sagittis facilisis.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="what-nf-col">
                <div className="what-nf-img">
                  <img src={HapticImg} alt="haptic" />
                </div>
                <div className="what-nf-text">
                  <h5>7,922</h5>
                  <span className="what-nf-bar"></span>
                  <p>Donec fringilla sapien sit amet faucibus venenatis.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="what-nf-col">
                <div className="what-nf-img">
                  <img src={BrainImg} alt="haptic" />
                </div>
                <div className="what-nf-text">
                  <h5>123.8KΞ ($237.44M)</h5>
                  <span className="what-nf-bar"></span>
                  <p>The range of functions available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="nft-market-sec">
        <div className="container">
          <h3>Who’s Who: Climbing The NFT Market</h3>
          <Tabs onSelect={(index, label) => console.log(label + " selected")}>
            <Tab label="Transcending Artists">
              <Transend />
            </Tab>
            <Tab label="Leading Collectors">
              <LeadingCollector />
              {/* <div className="transcending-artists=content table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>COLLECTOR</th>
                      <th>WORKS COLLECTED</th>
                      <th>Works owned</th>
                      <th>Avg. Purchase Price</th>
                      <th>Total Purchases</th>
                      <th>Biggest Purchase</th>
                      <th>Works Resold</th>
                      <th>Avg. Resale Price</th>
                      <th>Total Resales </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="collector-flex">
                          <img src={TableImg} alt="revolution" />
                          <a href="#">@krybharat</a>
                        </div>
                      </td>
                      <td>24</td>
                      <td>70</td>
                      <td>$29,131</td>
                      <td>$699,155</td>
                      <td>$175,319</td>
                      <td>0</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="collector-flex">
                          <img src={TableImg} alt="rightwrong" />
                          <a href="#">@colborn</a>
                        </div>
                      </td>
                      <td>19</td>
                      <td>103</td>
                      <td>$3,217</td>
                      <td>$61,140</td>
                      <td>$33,242</td>
                      <td>0</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="collector-flex">
                          <img src={TableImg} alt="emir-kaya" />
                          <a href="#">@emirkaya</a>
                        </div>
                      </td>
                      <td>15</td>
                      <td>20</td>
                      <td>$11,697</td>
                      <td>$175,458</td>
                      <td>$27,530</td>
                      <td>0</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="collector-flex">
                          <img src={TableImg} alt="man" />
                          <a href="#">@batsoupyum</a>
                        </div>
                      </td>
                      <td>10</td>
                      <td>17</td>
                      <td>$71,968</td>
                      <td>$719,682</td>
                      <td>$418,164</td>
                      <td>3</td>
                      <td>$2,953</td>
                      <td>$8,859</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="collector-flex">
                          <img src={TableImg} alt="table-img5" />
                          <a href="#">@rudy</a>
                        </div>
                      </td>
                      <td>9</td>
                      <td>255</td>
                      <td>$4,210</td>
                      <td>$37,894</td>
                      <td>$17,225</td>
                      <td>0</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="collector-flex">
                          <img src={TableImg} alt="table-img6" />
                          <a href="#">@caktux</a>
                        </div>
                      </td>
                      <td>8</td>
                      <td>43</td>
                      <td>$16,592</td>
                      <td>$132,738</td>
                      <td>$60,720</td>
                      <td>0</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div> */}
            </Tab>
            {/* <Tab label="Largest Collections"></Tab> */}
          </Tabs>
        </div>
      </section>
    </div>
  );
}
