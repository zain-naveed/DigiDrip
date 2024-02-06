import React from "react";
import Header from "../../shared/components/includes/Header";
import Footer from "../../shared/components/includes/Footer";
import ProfileBanner from "../../assets/images/pastel-path-img.png";
import ProfileBanner1 from "../../assets/images/transcending-atrist-img6.png";
import Favorite from "../../assets/images/favourite-img.png";
import Eye from "../../assets/images/eye-img.png";

export default function PastelPath() {
  return (
    <div>
      {/* <Header /> */}
      <section className="pastel-path-content">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="pastel-path-col-text">
                <h3>Pastel Path</h3>
                <h6>Edition 1 of 1</h6>
                <p>
                  One of my earliest illustration. When walking in big cities, I
                  like to imagine what they would be like if they were as calm
                  and soothing as my hometown. I like to depict them with a
                  relaxing colour palette hoping it brings comfort to anyone
                  looking at my artworks.
                </p>
                <span>
                  #2D #anim #animation #colour #illustration #japan #pastel
                </span>
                <a href="#" className="custom-site-btn">
                  SIGN UP TO COLLECT
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="pastel-path-col-img">
                <img src={ProfileBanner} alt="pastel-path-img" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="pastel-path-main-list-col">
                <div className="driptivity-transcending-leading-col">
                  <ul>
                    <li>
                      <img
                        src={ProfileBanner1}
                        alt="transcending-atrist-img6"
                      />
                      <div className="driptivity-transcending-text">
                        <h6>@Javajam</h6>
                        <span>15 MINUTES AGO </span>
                      </div>
                    </li>
                    <li>
                      <img
                        src={ProfileBanner1}
                        alt="transcending-atrist-img7"
                      />
                      <div className="driptivity-transcending-text">
                        <h6>@Javajam</h6>
                        <span>15 MINUTES AGO </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="driptivity-transcending-leading-col pastel-path-fav-eye">
                  <ul>
                    <li>
                      <img src={Favorite} alt="favourite-img" />
                      <div className="driptivity-transcending-text">
                        <h6>6</h6>
                        <span>FAVOURITES</span>
                      </div>
                    </li>
                    <li>
                      <img src={Eye} alt="eye-img" />
                      <div className="driptivity-transcending-text">
                        <h6>8</h6>
                        <span>VIEWS</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
}
