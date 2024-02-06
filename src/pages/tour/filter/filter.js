import React from "react";
import AuthoreImg1 from "../../../assets/images/transcending-atrist-img6.png";

function Filter({
  handleFilterSelect,
  filter,
  applyFilter,
  selectTab,
  min,
  max,
}) {
  return (
    <div className="tour-filter-col">
      {selectTab == "Acution" ? (
        <div className="tour-filter-contai">
          <h4>Status</h4>
          {/* <label className="label-container">
          Buy Now
          <input type="checkbox" defaultChecked />
          <span className="checkmark"></span>
        </label> */}
          {/* <label className="label-container">
          On Auction
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label> */}
          <label className="label-container">
            New
            <input
              type="checkbox"
              checked={filter == "new" ? "checked" : ""}
              onClick={() => handleFilterSelect("new")}
            />
            <span className="checkmark"></span>
          </label>
          <label className="label-container">
            Has Offer
            <input
              type="checkbox"
              checked={filter == "hasOffer" ? "checked" : ""}
              onClick={() => handleFilterSelect("hasOffer")}
            />
            <span className="checkmark"></span>
          </label>
        </div>
      ) : (
        ""
      )}

      <div className="tour-filter-contai">
        <h4>Price</h4>
        {/* <select>
          <option>United States Dollar (USD)</option>
        </select> */}
        {console.log(min)}
        <div className="min-max-value">
          <input
            type="number"
            value={min ? min : ""}
            placeholder="Min"
            onChange={(e) => handleFilterSelect("min", e.target.value)}
          />
          <input
            type="number"
            value={max ? max : ""}
            placeholder="Max"
            onChange={(e) => handleFilterSelect("max", e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Apply"
          onClick={applyFilter}
          className="custom-site-btn"
        />
      </div>
      {/* <div className="tour-filter-contai">
        <h4>Collections</h4>
        <div className="input-search">
          <input type="search" placeholder="Filter" />
        </div>
        <div className="filter-list">
          <ul>
            <li>
              <img src={AuthoreImg1} alt="transcending-atrist-img6" />
              <div className="driptivity-transcending-text">
                <h6>@Javajam</h6>
                <span>15 MINUTES AGO </span>
              </div>
            </li>
            <li>
              <img src={AuthoreImg1} alt="transcending-atrist-img7" />
              <div className="driptivity-transcending-text">
                <h6>@Javajam</h6>
                <span>15 MINUTES AGO </span>
              </div>
            </li>
            <li>
              <img src={AuthoreImg1} alt="transcending-atrist-img8" />
              <div className="driptivity-transcending-text">
                <h6>@Javajam</h6>
                <span>15 MINUTES AGO </span>
              </div>
            </li>
            <li>
              <img src={AuthoreImg1} alt="transcending-atrist-img9" />
              <div className="driptivity-transcending-text">
                <h6>@Javajam</h6>
                <span>15 MINUTES AGO </span>
              </div>
            </li>
            <li>
              <img src={AuthoreImg1} alt="transcending-atrist-img10" />
              <div className="driptivity-transcending-text">
                <h6>@Javajam</h6>
                <span>15 MINUTES AGO </span>
              </div>
            </li>
          </ul>
        </div>
      </div> */}
      {/* <div className="tour-filter-contai">
        <h4>Chain</h4>
        <label className="label-container">
          Ethereum
          <input type="checkbox" checked="checked" />
          <span className="checkmark"></span>
        </label>
        <label className="label-container">
          Matic
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
        <label className="label-container">
          Klaytn
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
      </div> */}
      {/* <div className="tour-filter-contai">
        <h4>On Sale In</h4>
        <div className="input-search">
          <input type="search" placeholder="Filter" />
        </div>
        <label className="label-container">
          ETH
          <input type="checkbox" checked="checked" />
          <span className="checkmark"></span>
        </label>
        <label className="label-container">
          WETH
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
        <label className="label-container">
          0xBTC
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
        <label className="label-container">
          1337
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
        <label className="label-container">
          1 MT
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
      </div> */}
    </div>
  );
}

export default Filter;
