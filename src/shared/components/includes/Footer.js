import React from "react";
import FacebookIcon from "../../../assets/images/facebook-icon.png";
import TwitterIcon from "../../../assets/images/twitter-icon.png";
import linkdinIcon from "../../../assets/images/linkdin-icon.png";
import InstagramIcon from "../../../assets/images/instagram-icon.png";
import FooterLogo from "../../../assets/images/footer-logo.png";
import { Link, Route } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="footer-top-flex">
            <div className="footer-logo">
              <Link to="/Home">
                <img src={FooterLogo} alt="footer-logo" />
              </Link>
            </div>
            <div className="quick-links">
              <h5>COMMUNITY</h5>
              <p>Sitemaps and content inventory</p>
            </div>
            <div className="quick-links">
              <h5>FOR ARTISTS</h5>
              <p>Precise visual layout and design of product</p>
            </div>
            <div className="quick-links">
              <h5>LEGAL</h5>
              <p>Prototypes for interactive simulation</p>
            </div>
          </div>
          <div className="footer-bottom-flex">
            <div className="privacy-col">
              <ul>
                <li>
                  <a href="#">Privacy policy</a>
                </li>
                <li>
                  <a href="#">Term of service</a>
                </li>
                {/* <li>
                  <a href="#">Language</a>
                </li> */}
              </ul>
            </div>
            <p className="copywrite-text">© 2021 DigiDrip</p>
            <div className="footer-social-icons">
              <ul>
                <li>
                  <a href="#">
                    <img src={FacebookIcon} alt="facebook-icon" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={TwitterIcon} alt="twitter-icon" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={linkdinIcon} alt="linkdin-icon" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={InstagramIcon} alt="instagram-icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
