import React, { useState, useEffect } from "react";
import {
  RecentActivity,
  RecentActivity2,
  RecentActivity3,
} from "../../../assets";
import { useParams } from "react-router-dom";
import { GetAllUserArts } from "../../services";

function RelatedArts() {
  const param = useParams();
  const [pageDetail, setPage] = useState({
    page: 0,
    limit: 3,
    userId: param?.id,
  });
  const [listart, setListArt] = useState([]);
  const getAllrelatedArt = () => {
    GetAllUserArts(pageDetail)
      .then(({ data }) => {
        if (data?.data?.length) {
          setListArt(data?.data);
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getAllrelatedArt();
  }, []);
  return (
    <>
      {listart.length > 0 && (
        <section className="recent-activity recent-activity-pastel-path">
          <div className="container">
            <h3>
              MORE WORKS BY <span>Pastel Path</span>
            </h3>
            <div className="recent-activity-flex">
              <div className="recent-activity-col">
                <div className="recent-activity-img">
                  <img src={RecentActivity} alt="recent-activity-img1" />
                </div>
                <div className="recent-activity-text">
                  <span>3 HOURS AGO </span>
                  <h6>
                    <span>@eux</span> made an offer for about $227 on{" "}
                    <span>Tora</span>
                  </h6>
                  <a href="#">Learn More About</a>
                </div>
              </div>
              <div className="recent-activity-col">
                <div className="recent-activity-img">
                  <img src={RecentActivity3} alt="recent-activity-img2" />
                </div>
                <div className="recent-activity-text">
                  <span>3 HOURS AGO </span>
                  <h6>
                    <span>@eux</span> made an offer for about $227 on{" "}
                    <span>Tora</span>
                  </h6>
                  <a href="#">Learn More About</a>
                </div>
              </div>
              <div className="recent-activity-col">
                <div className="recent-activity-img">
                  <img src={RecentActivity2} alt="recent-activity-img3" />
                </div>
                <div className="recent-activity-text">
                  <span>3 HOURS AGO </span>
                  <h6>
                    <span>@eux</span> made an offer for about $227 on{" "}
                    <span>Tora</span>
                  </h6>
                  <a href="#">Learn More About</a>
                </div>
              </div>
            </div>
            <div className="recent-activity-btn">
              <a href="#" className="custom-site-btn">
                View all Activities
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default RelatedArts;
