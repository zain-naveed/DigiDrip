import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { NotFoundAnim } from "../../../assets";
import TourCard from "../../../shared/components/common/TourCard";
import { getAllAuctions, getAllSales } from "../../../shared/services";
import Animation from "../../../shared/components/common/Animation";
function AuctionList({ loader, setLoader, query }) {
  const [tourArr, setTourArr] = useState([]);
  // const [loader, setLoader] = useState(true);
  const [pageDetail, setPage] = useState({
    page: 0,
    limit: 10,
  });
  const getAllArts = () => {
    let cloneArts = [...tourArr];
    getAllAuctions(pageDetail, query ? query : "")
      .then(({ data }) => {
        setLoader(false);
        if (data?.status && data?.data?.length > 0) {
          setPage({
            ...pageDetail,
            page: pageDetail.page + 1,
          });

          data.data.forEach((element) => {
            let tourFindIndx = cloneArts.findIndex(
              (i) => i?._id == element?._id
            );
            if (tourFindIndx < 0) {
              cloneArts = [...cloneArts, element];
            }
          });
          setTourArr(cloneArts);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  useEffect(() => {
    getAllArts();
  }, [loader]);

  return (
    <InfiniteScroll
      dataLength={tourArr?.length}
      next={getAllArts}
      hasMore={true}
      loader={<h4>{tourArr.length > 0 ? "" : ""} </h4>}
    >
      {loader ? (
        <div className="center-text">
          <Spinner animation="grow" size="lg" />
        </div>
      ) : tourArr && tourArr?.length > 0 ? (
        <>
          <div className="recent-activity-flex">
            {tourArr?.map((tour, inx) => {
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

export default AuctionList;
