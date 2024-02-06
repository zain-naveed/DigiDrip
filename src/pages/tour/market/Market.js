import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { NotFoundAnim } from "../../../assets";
import TourCard from "../../../shared/components/common/TourCard";
import { getAllSales } from "../../../shared/services";
import Animation from "../../../shared/components/common/Animation";
function MarketList({ loader, setLoader, query }) {
  const [marketArr, setmarketArr] = useState([]);
  // const [loader, setLoader] = useState(false);
  const [pageDetail, setPage] = useState({
    page: 0,
    limit: 10,
  });

  const getSales = (filter) => {
    let clonemarket = [...marketArr];
    getAllSales(pageDetail, filter ? filter : "")
      .then(({ data }) => {
        setLoader(false);
        if (data?.status && data?.data?.length > 0) {
          setPage({
            ...pageDetail,
            page: pageDetail.page + 1,
          });
          data.data.forEach((element) => {
            let tourFindIndx = clonemarket.findIndex(
              (i) => i?._id == element?._id
            );
            if (tourFindIndx < 0) {
              clonemarket = [...clonemarket, element];
            }
          });
          setmarketArr(clonemarket);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  useEffect(() => {
    getSales(query);
  }, [loader]);
  console.log(marketArr);

  return (
    <InfiniteScroll
      dataLength={marketArr?.length}
      next={getSales}
      hasMore={true}
      loader={<h4>{marketArr.length > 0 ? "" : ""} </h4>}
    >
      {loader ? (
        <div className="center-text">
          <Spinner animation="grow" size="lg" />
        </div>
      ) : marketArr && marketArr?.length > 0 ? (
        <>
          <div className="recent-activity-flex">
            {marketArr?.map((tour, inx) => {
              return (
                <div className="recent-activity-col">
                  <TourCard resp={tour} key={inx} />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <Animation Pic={NotFoundAnim} Message={"No Auction Found"} />
        </>
      )}
    </InfiniteScroll>
  );
}

export default MarketList;
