import React, { useState, useEffect } from "react";
import Footer from "../../shared/components/includes/Footer";
import Header from "../../shared/components/includes/Header";
import { SearchSubmit } from "../../assets";
import { handleSearch } from "../../shared/services/general.service";
import { SEARCH_FILTERS } from "../../shared/util/enums";
import SearchCard from "./searchCard";
import { convertToWei } from "../../shared/util/dateValid";
import { toastMessage } from "../../shared/components/common/toast";
import { Spinner } from "react-bootstrap";
import Animation from "../../shared/components/common/Animation";
import { NotFoundAnim } from "../../assets";
import InfiniteScroll from "react-infinite-scroll-component";
import { GetallArtist } from "../../shared/services/index";
import styles from "../../styles/search.module.scss";
export default function SearchPage() {
  // const [selectedFilter, setSelectedFilter] = useState(SEARCH_FILTERS.ARTWORKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropToggle, setDropToggle] = useState(false);
  const [artistSearch, setArtistSearch] = useState("");
  const [artUserlist, setArtUserList] = useState([]);
  const [selectDrop, setSelectDrop] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [selectSearch, setSearch] = useState("artwork");
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [pageDetail, setPageDetail] = useState({
    pageDet: 0,
    limit: 10,
  });
  const [loader, setLoader] = useState(false);
  const reSetPage = () => {
    let obj = {
      pageDet: 0,
      limit: 10,
    };
    setPageDetail({
      ...pageDetail,
      ...obj,
    });
  };
  const search = () => {
    let params = {};
    if (searchQuery) {
      params["keyword"] = searchQuery;
    }
  
    if (min != null && min != "") {
      params["min"] = convertToWei(min);
    }
    if (max && max != "") {
      params["max"] = convertToWei(max);
    }
    if(selectDrop ){
      params["artist"] =selectDrop?.id
    }
    
    // if (selectedFilter) {
    //   params["filter"] = selectedFilter;
    // }
    handleSearch(params, pageDetail)
      .then(
        ({
          data: {
            data: { artworks },
          },
        }) => {
          setLoader(false);
          setSearchData(artworks);
        }
      )
      .catch((err) => toastMessage(err?.response?.data?.message, "error"));

    // handleSearch(params, pageDetail)
    //   .then((res) => {
    //     setLoader(false);

    //     if (
    //       res &&
    //       res?.data &&
    //       res?.data?.data &&
    //       Object.keys(res?.data?.data).length > 0
    //     ) {
    //       if (selectedFilter == SEARCH_FILTERS.ARTWORKS) {
    //         if (
    //           searchData.collection.length > 0 ||
    //           searchData.user.length > 0
    //         ) {
    //           reSetPage();
    //           setSearchData({
    //             ...searchData,
    //             user: [],
    //             collection: [],
    //           });
    //         }
    //         let key = null;
    //         Object.keys(res?.data?.data).forEach((keyre) => {
    //           key = keyre;
    //         });
    //         setPageDetail({
    //           ...pageDetail,
    //           pageDet: pageDetail.pageDet + 1,
    //         });
    //         setSearch("artwork");
    //         SwitchState("artwork", res?.data?.data[key], infinitebool);
    //       } else if (selectedFilter == SEARCH_FILTERS.COLLECTIONS) {
    //         if (searchData.artwork.length > 0 || searchData.user.length > 0) {
    //           reSetPage();
    //           setSearchData({
    //             ...searchData,
    //             user: [],
    //             artwork: [],
    //           });
    //         }

    //         let key = null;
    //         Object.keys(res?.data?.data).forEach((keyre) => {
    //           key = keyre;
    //         });
    //         setPageDetail({
    //           ...pageDetail,
    //           pageDet: pageDetail.pageDet + 1,
    //         });
    //         setSearch("collection");
    //         SwitchState("collection", res?.data?.data[key], infinitebool);
    //       } else if (selectedFilter == SEARCH_FILTERS.USERS) {
    //         if (
    //           searchData.artwork.length > 0 ||
    //           searchData.collection.length > 0
    //         ) {
    //           reSetPage();
    //         }

    //         let key = null;
    //         Object.keys(res?.data?.data).forEach((keyre) => {
    //           key = keyre;
    //         });
    //         setPageDetail({
    //           ...pageDetail,
    //           pageDet: pageDetail.pageDet + 1,
    //         });
    //         setSearch("user");
    //         SwitchState("user", res?.data?.data[key], infinitebool);
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     toastMessage(err?.response?.data?.message, "error");
    //   });
  };

  const SwitchState = (stateKey, arr, bool) => {
    if (bool) {
      let stateArr = searchData[stateKey];
      let CloneArr = [...stateArr];
      arr.forEach((element) => {
        let findInd = CloneArr.findIndex((i) => i.id == element.id);
        if (findInd < 0) {
          CloneArr = [...CloneArr, element];
        }
      });
      setSearchData({
        ...searchData,
        [stateKey]: CloneArr,
      });
    } else {
      setSearchData({
        ...searchData,
        [stateKey]: arr,
      });
    }
  };
  const findSearchGeneral = () => {
    setLoader(true);
    reSetPage();
    search();
  };
  let ResetSearchData = () => {
    setSearchData({
      ...searchData,
      artwork: [],
      collection: [],
      user: [],
    });
  };
  useEffect(() => {
    search();
  }, []);
  useEffect(() => {
    artistList();
  }, [artistSearch]);
  const artistList = () => {
    GetallArtist(artistSearch)
      .then(({ data }) => {
        if (data && data?.results && data?.results?.length > 0) {
          setArtUserList(data?.results);
        } else {
          setArtUserList([]);
        }
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.message, "error");
      });
  };
  return (
    <>
      <section className="search-content-sec">
        <div className="container">
          <div className="search-here">
            <input
              type="search"
              placeholder="SEARCH HERE"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  findSearchGeneral();
                }
              }}
              onChange={(res) => {
                setSearchQuery(res.target.value);
              }}
            />
            <button
              onClick={() => {
                findSearchGeneral();
              }}
            >
              <img src={SearchSubmit} alt="search-submit" />
            </button>
          </div>
          <div className="sort-by">
            <h4>Sort By:</h4>

            <div className="sort-by-flex">
              <div className="mr-2" style={{ marginTop: "3px" }}>
                <h6 className={styles.font}>Artist Name</h6>
                <div className="dropdown ">
                  <button
                    className={`btn btn-secondary dropdown-toggle ${styles.search_filter_artist}`}
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onClick={() => setDropToggle(!dropToggle)}
                  >
                    {selectDrop ?  selectDrop?.userName?.charAt(0)?.toUpperCase() +
                      selectDrop?.userName?.substr(1)?.toLowerCase():"Select"}
                  </button>
                  <div
                    className={`dropdown-menu ${dropToggle ? "show" : ""} `}
                    aria-labelledby="dropdownMenuButton"
                    style={{
                      height: "300px",
                      overflowY: "scroll",
                      border: "none",
                      boxShadow: "0px 5px 5px grey",
                    }}
                  >
                    <input
                      className="dropdown-item form-control"
                      placeholder="Search Artist"
                      value={artistSearch}
                      onChange={(e) => setArtistSearch(e.target.value)}
                      style={{ border: "2px solid rgb(186 173 173 / 98%)" }}
                      type="text"
                    />
                    {artUserlist && artUserlist?.length > 0 ? (
                      artUserlist.map((art, inx) => {
                        return (
                          <a
                            className="dropdown-item"
                            href="javascript:void(0)"
                            key={inx}
                            style={{ borderBottom: "1px solid #8080805c" }}
                            onClick={() => {
                              setSelectDrop(art);
                              setDropToggle(!dropToggle);
                            }}
                          >
                            {art?.userName?.charAt(0)?.toUpperCase() +
                              art?.userName?.substr(1)?.toLowerCase()}
                          </a>
                        );
                      })
                    ) : (
                      <a
                        className="dropdown-item"
                        href="javascript:void(0)"
                        style={{ borderBottom: "1px solid #8080805c" }}
                      >
                        No Artist Found!
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* <div className="sort-seclect-col">
                <h6>Genre</h6>
                <select>
                  <option>@Javajam</option>
                </select>
              </div> */}
              <div className="sort-seclect-col">
                <h6 style={{ position: "relative", top: "6px" }}>
                  Purchase Price
                </h6>
                <div className="d-flex justify-content-between">
                  <input
                    type="number"
                    placeholder="Min Eth"
                    onChange={(e) => setMin(e.target.value)}
                    style={{ marginRight: "10px" }}
                  />
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    placeholder="Max Eth"
                  />
                </div>
              </div>
            </div>
            {/* <div className="radio-containers">
              <label className="label-container">
                Newest
                <input type="radio" name="radio" />
                <span className="checkmark"></span>
              </label>
              <label className="label-container">
                Oldest
                <input type="radio" name="radio" />
                <span className="checkmark"></span>
              </label>
            </div> */}
          </div>

          <InfiniteScroll
            dataLength={searchData.length}
            next={() => search(true)}
            hasMore={true}
            style={{ overflow: "visible" }}
            className={`grid-height ${
              loader ? "d-flex justify-content-center " : ""
            }`}
            loader={<h4>{searchData.length > 0 ? "" : ""} </h4>}
          >
            {loader ? (
              <div className="center-text">
                <Spinner animation="grow" size="lg" />
              </div>
            ) : searchData && searchData.length > 0 ? (
              <div className="recent-activity-flex">
                {searchData.map((res, inx) => {
                  return (
                    <div className="recent-activity-col" key={inx}>
                      <SearchCard respon={res} type={selectSearch} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <Animation
                Pic={NotFoundAnim}
                Message={`No ${
                  selectSearch.charAt(0).toUpperCase() + selectSearch.slice(1)
                } Found`}
              />
            )}
          </InfiniteScroll>
        </div>
      </section>
    </>
  );
}

const UserSearchItem = (data) => {
  return <div></div>;
};
