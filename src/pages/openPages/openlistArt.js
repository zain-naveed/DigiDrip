import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toastMessage } from "../../shared/components/common/toast";
import { getOpenArtWorkList } from "../../shared/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEye } from "@fortawesome/free-solid-svg-icons";
import "./openCollection.css";
function OpenlistArt() {
  const params = useParams();
  const [listArt, setListArt] = useState([]);

  const getAllOpenArts = () => {
    getOpenArtWorkList(params?.id)
      .then((res) => {
        setListArt(res?.data?.data);
        // toastMessage(res?.data?.message, "success");
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.message, "error");
      });
  };
  useEffect(() => {
    getAllOpenArts();
  }, []);

  return (
    <div className="container mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="font center">#</th>
            <th className="font center"> Art</th>
            <th className="font center"> Name</th>
            <th className="font center"> Action</th>
          </tr>
        </thead>
        <tbody>
          {listArt && listArt?.length > 0 ? (
            listArt?.map((art, inx) => {
              return (
                <tr key={inx}>
                  <td className="font center">{inx + 1}</td>
                  <td className="font center d-flex justify-content-center tabl">
                    <img
                      className="rounded-circle text-center"
                      height="60px"
                      width="60px"
                      src={art?.artwork_url}
                    />
                  </td>
                  <td className="font center">{art?.name}</td>
                  <td className="font center">
                    <a href={`${art?.meta_url}`} target="_blank">
                      <FontAwesomeIcon icon={faEye} />
                    </a>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className="font">
                No Arts Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default OpenlistArt;
