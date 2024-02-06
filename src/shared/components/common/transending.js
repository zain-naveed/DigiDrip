import React from "react";
import { Link } from "react-router-dom";
import { convertToEther } from "../../util/dateValid";
import { ProfilePlaceHolder } from "../../../assets";
function Transending({ TranArtist }) {
  return (
    <div className="transcending-artists=content table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>COLLECTOR</th>
            <th>WORKS COLLECTED</th>
            <th>Works owned</th>
            <th>Avg. Purchase Price</th>
            <th>Total Purchases</th>
            <th>Biggest Purchase</th>
            {/* <th>Works Resold</th> */}
            <th>Works Sold</th>
            <th>Avg. Sale Price</th>
            <th>Total Sale </th>
          </tr>
        </thead>
        <tbody>
          {TranArtist && TranArtist?.length > 0 ? (
            TranArtist.map((tran, inx) => {
              return (
                <tr>
                  <td>
                    <div className="collector-flex">
                      <img src={ProfilePlaceHolder} alt="revolution" />
                      <Link to="/">@{tran?.user?.userName}</Link>
                    </div>
                  </td>
                  <td>{tran?.purchasedArts}</td>
                  <td>{tran?.ownedArts}</td>
                  <td>
                    {tran?.totalPurchasesAmount
                      ? convertToEther(
                          tran?.totalPurchasesAmount / tran?.purchasedArts
                        )
                      : 0}
                    Eth
                  </td>
                  <td>
                    {tran?.totalPurchasesAmount
                      ? convertToEther(tran?.totalPurchasesAmount) + "Eth"
                      : 0}
                  </td>
                  <td>
                    {tran?.biggestPurchase
                      ? convertToEther(tran?.biggestPurchase) + "Eth"
                      : 0}
                  </td>
                  <td>{tran?.soldArts}</td>
                  <td>
                    {tran?.totalSoldAmount
                      ? convertToEther(tran?.totalSoldAmount)
                      : 0}
                    Eth
                  </td>
                  <td>
                    {tran?.totalSoldAmount
                      ? convertToEther(tran?.totalSoldAmount)
                      : 0}
                    Eth
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={9}>Transending Artist Not Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Transending;
