import React from "react";
import { Tabs, Tab } from "react-bootstrap-tabs";
import Header from "../shared/components/includes/Header";
import Footer from "../shared/components/includes/Footer";
import Project from "../assets/images/drops-img9.png";
import Project1 from "../assets/images/drops-img5.png";
import Project2 from "../assets/images/drops-img6.png";
import Project3 from "../assets/images/drops-img7.png";
import Project4 from "../assets/images/drops-img8.png";
import OfferBanner from "../assets/images/steezdesigns-profile-img.png";
import UpArrows from "../assets/images/up-arrow.png";

export default function SteezDesigns() {
  const array = [{value :" Once our DigiDrip Innovations page is accessed, please go to the top right hand of our homepage and create an account."},
{value:"Next, you will need to link your MetaMask wallet to your created account on DigiDrip." },
{value:"If you do not have a wallet, you can click the 'create wallet' link on our Connect Wallet page or go to metamask.io."},
{value:"You will need to purchase Ethereum (ETH), the cryptocurrency. This allows you to mint your own NFT's as well as buy music and art pieces on our site." },
{value:"Once your wallet is created and linked, send the purchased Ethereum to your MetaMask's ETH wallet address." },
{value:"This will allow you to have the necessary access needed to upload or transfer a piece of work on our site in order to bid, sell, and collect through your account at DigiDrip." },
{value:"Once you have created your account, and have a wallet connected, you can next upload an NFT or transfer one on to our site. Through your account, click “Submit NFT” to upload a piece of work that you wish to post for sale." },
{value:"After your NFT is minted and set for sale, sit back and watch DigiDrip work it's magic! It is our job to provide a safe and sound marketplace for your work to gain recognition." },
{value:"In order to be trasnparent with our customers; there will be a 2.5% brokerage fee at the time of sale." },
{value:"Please email us with any questions at support@digidrip.net." },


];
  return (
    <div className="container exti">
     

     <span className="spani"> DIGIDRIP How It Works-</span>
<div className="listing">
<ul>
{
  array.map((item)=>{
    return(<li className="innlist">{item.value}</li>
    
    )


  })
}
</ul>

</div>


{/* 1. Once our DigiDrip Innovations page is accessed, please go to the top right hand of our homepage and create an account.

2. Next, you will need to link your MetaMask wallet to your created account on DigiDrip. 

3. If you do not have a wallet, you can click the "create wallet" link on our Connect Wallet page or go to metamask.io.

4. You will need to purchase Ethereum (ETH), the cryptocurrency. This allows you to mint your own NFT's as well as buy music and art pieces on our site. 

5. Once your wallet is created and linked, send the purchased Ethereum to your MetaMask's ETH wallet address.  

6. This will allow you to have the necessary access needed to upload or transfer a piece of work on our site in order to bid, sell, and collect through your account at DigiDrip.

7. Once you have created your account, and have a wallet connected, you can next upload an NFT or transfer one on to our site. Through your account, click “Submit NFT” to upload a piece of work that you wish to post for sale.

8. After your NFT is minted and set for sale, sit back and watch DigiDrip work it's magic! It is our job to provide a safe and sound marketplace for your work to gain recognition.

9. In order to be trasnparent with our customers; there will be a 2.5% brokerage fee at the time of sale.  

10. Please email us with any questions at support@digidrip.net.  */}


      {/* <Header /> */}
      {/* <section className="steezdesigns-content">
        <div className="container">
          <div className="steezdesigns-flex">
            <div className="steezdesigns-img-text-col">
              <div className="steezdesigns-profile-img">
                <img src={OfferBanner} alt="steezdesigns-profile-img" />
              </div>
              <div className="steezdesigns-profile-text">
                <h3>SteezDesigns</h3>
                <h6>@steezdesign</h6>
                <p>
                  One of my earliest illustration. When walking in big cities I
                  like to imagine what they would be like if they were as calm.
                </p>
                <span>
                  <i className="fa fa-map-marker" aria-hidden="true"></i>Spokane
                </span>
                <a href="#" className="custom-site-btn">
                  SIGN UP TO COLLECT
                </a>
              </div>
            </div>
            <div className="steezdesigns-followers-col">
              <ul>
                <li>
                  <h4>192</h4>
                  <h5>Followers</h5>
                </li>
                <li>
                  <h4>498</h4>
                  <h5>Following</h5>
                </li>
                <li>
                  <h4>0</h4>
                  <h5>Collection</h5>
                </li>
                <li>
                  <h4>27</h4>
                  <h5>Creations</h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="drops-collection-sec drops-collection-favorites-sec offers-tabs">
        <div className="container">
          <Tabs onSelect={(index, label) => console.log(label + " selected")}>
            <Tab label="Drops">
              <div className="recent-activity-flex">
                <div className="recent-activity-col drops-img-col">
                  <img src={Project} alt="drops-img1" />
                </div>
                <div className="recent-activity-col drops-img-col">
                  <img src={Project1} alt="drops-img2" />
                </div>
                <div className="recent-activity-col drops-img-col">
                  <img src={Project2} alt="drops-img3" />
                </div>
                <div className="recent-activity-col drops-img-col">
                  <img src={Project3} alt="drops-img4" />
                </div>
                <div className="recent-activity-col drops-img-col">
                  <img src={Project4} alt="drops-img5" />
                </div>
                <div className="recent-activity-col drops-img-col">
                  <img src={Project2} alt="drops-img6" />
                </div>
                <div className="recent-activity-col drops-img-col">
                  <img src={Project1} alt="drops-img7" />
                </div>
                <div className="recent-activity-col drops-img-col">
                  <img src={Project2} alt="drops-img8" />
                </div>
                <div className="recent-activity-col drops-img-col">
                  <img src={Project3} alt="drops-img9" />
                </div>
              </div>
            </Tab>
            <Tab label="Collection">
              <div className="recent-activity-flex">
                <div className="recent-activity-col drops-img-col">
                  <img src={Project2} alt="drops-img6" />
                </div>
                <div className="recent-activity-col drops-img-col">
                  <img src={Project1} alt="drops-img1" />
                </div>
                <div className="recent-activity-col drops-img-col">
                  <img src={Project} alt="drops-img2" />
                </div>
                <div className="recent-activity-col drops-img-col">
                  <img src={Project3} alt="drops-img3" />
                </div>
                <div className="recent-activity-col drops-img-col">
                  <img src={Project4} alt="drops-img4" />
                </div>
                <div className="recent-activity-col drops-img-col">
                  <img src={Project} alt="drops-img5" />
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </section> */}
      {/* <Footer /> */}
    </div>
  );
}
