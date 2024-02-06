import React, { useEffect, useState } from "react";
import { GetAllOpentCollection } from "../../shared/services";
import { toastMessage } from "../../shared/components/common/toast";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./openCollection.css";
function OpenCollection() {
  const [collectionList, setCollectionList] = useState([]);
  const getAllOpenCollection = () => {
    GetAllOpentCollection()
      .then((res) => {
        setCollectionList(res?.data?.data);
        // toastMessage(res?.data?.message, "success");
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.message, "error");
      });
  };
  useEffect(() => {
    getAllOpenCollection();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="font center">#</th>
              <th colSpan="4" className="font">
                {" "}
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {collectionList && collectionList?.length > 0 ? (
              collectionList?.map((colc, inx) => {
                return (
                  <tr key={inx}>
                    <td className="font center">{inx + 1}</td>
                    <td className="font">
                      {" "}
                      <NavLink to={`artworks/${colc?._id}`} className="blue">
                        {colc?.collectionAddress}{" "}
                      </NavLink>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="font">
                  No Collection Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default OpenCollection;
