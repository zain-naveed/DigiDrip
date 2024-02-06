import React, { useState, useEffect } from "react";
import Project from "../../../assets/images/drops-img9.png";
import Project1 from "../../../assets/images/drops-img5.png";
import Project2 from "../../../assets/images/drops-img6.png";
import Project3 from "../../../assets/images/drops-img7.png";
import Project4 from "../../../assets/images/drops-img8.png";
import CardImage from "../../../shared/components/common/CardImage";
import {
  claimSaleService,
  getTimedOutAuctions,
  claimNftService
} from "../../../shared/services";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { NotFoundAnim } from "../../../assets";
import { Spinner } from "react-bootstrap";
import Animation from "../../../shared/components/common/Animation";
import { setLoaderSlice } from "../../../shared/redux/reducers/LoaderSlice";
import {
  claimSaleFromContract,
  claimNft,
  claimBackFromContract
} from "../../../shared/services/contract.service";
import { useDispatch } from "react-redux";
import { toastMessage } from "../../../shared/components/common/toast";

function Salenft({ type }) {
  const [pageDetail, setPage] = useState({
    page: 0,
    limit: 5,
  });
  const [loader, setLoader] = useState(false);
  const [claimList, setClaimList] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setLoader(true);
    getAllSaleClaim();
  }, []);

  // useEffect(() => {
  //   getAllSaleClaim();
  // }, [type]);

  const getAllSaleClaim = () => {
    if (type == "sale") {
      claimSaleService(pageDetail, manipulateResponse);
    } else if (type == "timedout") {
      console.log("timed out");
      getTimedOutAuctions(pageDetail)
        .then(manipulateResponse)
        .catch((err) => {
          toastMessage(err?.response?.data?.message, "error");
        });
    } else if (type == 'nft') {
      claimNftService(pageDetail, manipulateResponse);
    }
  };

  const manipulateResponse = (res) => {
    setLoader(false);
    setPage({
      ...pageDetail,
      page: pageDetail.page + 1,
    });
    if (res && res?.data && res?.data?.data?.length > 0) {
      let cloneRespond = [...claimList];
      res?.data?.data?.forEach((clm) => {
        let findInx = cloneRespond.findIndex((i) => i?._id == clm?._id);
        if (findInx < 0) {
          cloneRespond = [...cloneRespond, clm];
        }
      });
      setClaimList(cloneRespond);
    }
  };

  const claimSale = (item) => {
    dispatch(setLoaderSlice({ Loader: true }));
    let params = {
      auctionId: item.contractAucId,
    };
    claimSaleFromContract(params)
      .then((sucs) => {
        dispatch(setLoaderSlice({ Loader: false }));
        toastMessage('Claiming sale from contract in progress...', "success");
        history.push('/profile');
      })
      .catch((err) => {
        dispatch(setLoaderSlice({ Loader: false }));
        console.log(err);
      });
  };

  const claimBack = (item) => {
    dispatch(setLoaderSlice({ Loader: true }));
    let params = {
      auctionId: item.contractAucId,
    };
    claimBackFromContract(params)
      .then((sucs) => {
        dispatch(setLoaderSlice({ Loader: false }));
        toastMessage('Claiming artwork back from timed out auctions...', "success");
        history.push('/profile');
      })
      .catch((err) => {
        dispatch(setLoaderSlice({ Loader: false }));
        toastMessage('There was an error in claiming artwork back.', "error");
        console.log(err);
      });
  };

  const claimNFT = (item) => {
    dispatch(setLoaderSlice({ Loader: true }));
    let params = {
      auctionId: item.contractAucId,
    };
    claimNft(params)
      .then((sucs) => {
        dispatch(setLoaderSlice({ Loader: false }));
        toastMessage('Claiming artwork in progress...', "success");
        history.push('/profile');
      })
      .catch((err) => {
        dispatch(setLoaderSlice({ Loader: false }));
        console.log(err);
      });
  };

  const handleClaim = (item) => {
    if (type == 'sale')
      claimSale(item);
    else if (type == 'timedout')
      claimBack(item);
    else if (type == 'nft')
      claimNFT(item);
  }

  return (
    <InfiniteScroll
      dataLength={claimList?.length}
      next={getAllSaleClaim}
      hasMore={true}
      loader={<h4>{claimList.length > 0 ? "" : ""} </h4>}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div
              className={`recent-activity-flex grid-height ${claimList.length ? "" : "justify-content-center"
                } `}
            >
              {loader ? (
                <div className="center-text">
                  <Spinner animation="grow" size="lg" />
                </div>
              ) : claimList && claimList.length ? (
                claimList?.map((item, index) => {
                  return (
                    <div className="recent-activity-col pb-2">
                      <CardImage
                        key={index}
                        src={item?.artwork?.artwork_url}
                        name={item?.artwork?.name}
                        type={"success"}
                        subtype={type}
                        handleClaim={() => handleClaim(item)}
                      />
                    </div>
                  );
                })
              ) : (
                <Animation Pic={NotFoundAnim} Message={"No Claim Nft Found"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </InfiniteScroll>
  );
}

export default Salenft;
