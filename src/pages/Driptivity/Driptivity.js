import React, { useState, useEffect } from "react";
import BannerImage from "../../assets/images/driptivity-banner.png";
import {
  getActivities,
  getTransendingArtist,
  getLeadingCollectors,
} from "../../shared/services";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderSlice } from "../../shared/redux/reducers/LoaderSlice";
import { toastMessage } from "../../shared/components/common/toast";
import Animation from "../../shared/components/common/Animation";
import { ArtAnimation } from "../../assets";
import InfiniteScroll from "react-infinite-scroll-component";
import ArtistList from "./artistList";
import CollectorList from "./collectorList";
import DripCard from "./dripCard";
export default function Driptivity() {
  const [page, setPage] = useState({
    page: 0,
    perPage: 10,
  });
  const [drip, setDripList] = useState([]);
  const [TranArtist, setTranArtist] = useState([]);
  const [LeadArtist, setLeadArtist] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const getAllActvy = () => {
    getActivities(page)
      .then((res) => {
        dispatch(setLoaderSlice({ Loader: false }));
        setLoader(false);
        setPage({
          ...page,
          perPage: page.perPage + 10,
        });
        if (res && res?.data?.data && res?.data?.data?.length > 0) {
          let dripClone = [...drip];
          res?.data?.data.forEach((element) => {
            let drininx = dripClone.findIndex((i) => i._id == element?._id);
            if (drininx < 0) {
              dripClone = [...dripClone, element];
            }
          });
          setDripList(dripClone);
        }
      })
      .catch((err) => {
        setLoader(false);
        toastMessage(err?.response?.data?.message, "error");
        dispatch(setLoaderSlice({ Loader: false }));
      });
  };
  useEffect(() => {
    setLoader(true);
    dispatch(setLoaderSlice({ Loader: true }));
    getAllActvy();
    getTransendingArt();
    getLeadingArt();
  }, []);
  const getTransendingArt = () => {
    getTransendingArtist()
      .then(({ data }) => {
        if (data?.data.length > 0) {
          setTranArtist(data?.data);
        }
      })
      .catch((err) => {
        setLoader(false);
        toastMessage(err?.response?.data?.message, "error");
        dispatch(setLoaderSlice({ Loader: false }));
      });
  };
  const getLeadingArt = () => {
    getLeadingCollectors()
      .then(({ data }) => {
        if (data?.data.length > 0) {
          setLeadArtist(data?.data);
        }
      })
      .catch((err) => {
        setLoader(false);
        toastMessage(err?.response?.data?.message, "error");
        dispatch(setLoaderSlice({ Loader: false }));
      });
  };

  console.log(TranArtist);
  return (
    <>
      <InfiniteScroll
        dataLength={drip?.length}
        next={getAllActvy}
        hasMore={true}
        loader={<h4>{drip.length > 0 ? "" : ""} </h4>}
      >
        <div>
          <section
            className="driptivity-banner"
            style={{ backgroundImage: `url(${BannerImage})` }}
          >
            <div className="driptivity-text">
              <h2>Driptivity</h2>
            </div>
          </section>
          <section className="driptivity-content">
            <div className="container">
              <div
                className={`row ${
                  drip?.length == 0 ? "justify-content-center" : ""
                }`}
              >
                {loader ? (
                  <div style={{ minHeight: "500px" }}></div>
                ) : drip && drip?.length > 0 ? (
                  <>
                    <div className="col-md-9">
                      <div className="recent-activity-flex">
                        {drip.map((drp, inx) => {
                          return <DripCard key={inx} drp={drp} />;
                        })}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="driptivity-transcending-leading-col">
                        <h3>Transcending Atrist</h3>
                        <ArtistList TranArtist={TranArtist} />
                      </div>
                      <div className="driptivity-transcending-leading-col">
                        <h3>Leading Collectors</h3>
                        {/* <CollectorList /> */}
                        <ArtistList TranArtist={LeadArtist} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Animation
                      Pic={ArtAnimation}
                      Message={"No Activity Found"}
                    />
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </InfiniteScroll>
    </>
  );
}
