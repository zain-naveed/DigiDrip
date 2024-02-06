import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Tabs, Tab } from "react-bootstrap-tabs";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import { NotFoundAnim } from "../../assets";
import OfferBanner from "../../assets/images/driptivity-banner.png";
import Animation from "../../shared/components/common/Animation";
// import "./tab.css";
import TourCard from "../../shared/components/common/TourCard";
import { getAllAuctions, getAllSales } from "../../shared/services";
import { AUCTION_FILTERS } from "../../shared/util/enums";
import Filter from "./filter/filter";
import AuctionList from "./auction/auctionList";
import MarketList from "./market/Market";

export default function Tour() {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [marketQuery, setMarketQuer] = useState("");
  const [selectTab, setselectTab] = useState("Auction");
  const [loader, setLoader] = useState(true);
  const [pageDetail, setPage] = useState({
    page: 0,
    limit: 10,
  });
  const [tourArr, setTourArr] = useState([]);
  const [filter, setFilter] = useState(null);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  // const getSales = () => {
  //   let cloneArts = [...tourArr];
  //   getAllSales(pageDetail, filter ? filter : "")
  //     .then(({ data }) => {
  //       setLoader(false);
  //       if (data?.status && data?.data?.length > 0) {
  //         console.log(data);
  //       }
  //     })
  //     .catch((err) => {
  //       setLoader(false);
  //     });
  // };

  const handleFilterSelect = (type, value) => {
    switch (type) {
      case "new":
        setFilter(AUCTION_FILTERS.NEW);
        break;
      case "hasOffer":
        setFilter(AUCTION_FILTERS.HAS_OFFER);
        break;

      case "min":
        setMin(value);
        break;

      case "max":
        setMax(value);
        break;

      default:
        setFilter(AUCTION_FILTERS.NEW);
    }
  };

  useEffect(() => {
    // getAllArts();
    // getSales();
  }, []);
  const resetState = () => {
    let obj = {
      page: 0,
      limit: 10,
    };
    setPage({
      ...pageDetail,
      ...obj,
    });
  };
  const applyFilter = () => {
    resetState();
    setLoader(true);
    let query = `${filter ? `&filter=${filter}` : ""}${
      min ? `&min=${min}` : ""
    }${max ? `&max=${max}` : ""} `;
    let Martquery = `${min ? `&min=${min}` : ""}${max ? `&max=${max}` : ""} `;
    setQuery(query);
    setMarketQuer(Martquery);
  };

  return (
    <div>
      <section
        className="driptivity-banner"
        style={{ backgroundImage: `url(${OfferBanner})` }}
      >
        <div className="driptivity-text">
          <h2>Tour</h2>
        </div>
      </section>
      <section className="driptivity-content driptivity-content-tour">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Filter
                handleFilterSelect={handleFilterSelect}
                filter={filter}
                applyFilter={applyFilter}
                selectTab={selectTab}
                min={min}
                max={max}
              />
            </div>
            <div className="col-md-9" style={{ minHeight: "500px" }}>
              <div
                className={`drops-collection-sec drops-collection-favorites-sec drops-collection-favorites-art ${
                  tourArr?.length <= 0
                    ? "justify-content-center"
                    : loader
                    ? "justify-content-center"
                    : ""
                }`}
              >
                <Tabs
                  style={{ width: "100vw !important" }}
                  onSelect={(index, label) => {
                    setLoader(true);
                    resetState();
                    setselectTab(label);
                    setQuery("");
                    setMarketQuer("");
                    setMin(null);
                    setMax(null);
                    console.log(label + " selected");
                  }}
                >
                  <Tab label="Auction">
                    <AuctionList
                      loader={loader}
                      setLoader={setLoader}
                      query={query}
                      pageDetail={pageDetail}
                      setPage={setPage}
                    />
                  </Tab>
                  <Tab label="Marketplace">
                    <MarketList
                      loader={loader}
                      setLoader={setLoader}
                      query={marketQuery}
                      pageDetail={pageDetail}
                      setPage={setPage}
                    />
                    {/* <Animation Pic={NotFoundAnim} Message={"No item Found"} /> */}
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
