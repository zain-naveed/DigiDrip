import React from "react";
import { fromNow } from "../../shared/util/dateValid";
import { ProfilePlaceHolder, clientMusic } from "../../assets/";
import { useHistory } from "react-router-dom";
import DriptivityImage from "../../assets/images/driptivity-img1.png";
function DripCard({ drp }) {
  const history = useHistory();
  const Navigation = (id) => {
    history.push(`/viewProfile/${id}`);
  };
  return (
    <>
    {
       drp?.artwork?.artwork_url  && <div className="recent-activity-col">
       <div className={`recent-activity-img  ${drp?.artwork?.artwork_type ==  'audio' ? 'whte':'activity-image'} `}>
         {drp?.artwork?.artwork_type == "image" ? (
           <img
             // onClick={() => history.push(`/Art/${drp?.artwork?._id}`)}
             style={{ width: "100%" }}
             src={
               drp?.artwork?.artwork_url
                 ? drp?.artwork?.artwork_url
                 : DriptivityImage
             }
             alt="driptivity-img1"
           />
         ) : drp?.artwork?.artwork_type == "video" ? (
           <>
             <video
               style={{ width: "100%" }}
               preload="auto"
               src={drp?.artwork?.artwork_url}
               controls
               // onClick={() => history.push(`/Art/${drp?.artwork?._id}`)}
             ></video>
           </>
         ) :  (<>
           <img
             // onClick={() => history.push(`/Art/${drp?.artwork?._id}`)}
             style={{ width: "80%",height:"80%" }}
             src={clientMusic}
             alt="driptivity-img1"
           />
           
           </>
         )}
         
         <div className="info-icon-styles" >
           <svg
             xmlns="http://www.w3.org/2000/svg"
             width="16"
             height="16"
             fill="currentColor"
             class="bi bi-info-circle-fill"
             viewBox="0 0 16 16"
             style=  {{color :  drp?.artwork?.artwork_type ==  'audio' ?  'black' :'white'}}
             onClick={() => history.push(`/Art/${drp?.artwork?._id}`)}
           >
             <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
           </svg>
         </div>
         <div className="audio-contrl">
         {
         drp?.artwork?.artwork_type == "audio" && <audio
         src={drp?.artwork?.artwork_url}
         controls
         style={{ width: "100%", background: "#edf0f1c7" }}
       ></audio>
       }
         </div>
     
       </div>
     
       
       <div className="recent-activity-text">
         <div
           className="tour-avatar"
           onClick={() => Navigation(drp?.owner?._id)}
         >
           <img
             style={{ height: "37px", width: "100px", borderRadius: "100px" }}
             src={
               drp?.owner?.profilePic
                 ? drp?.owner?.profilePic
                 : ProfilePlaceHolder
             }
             alt="author-img"
           />
         </div>
         <div className="driptivity-person-text">
           <h6>
             <span
               style={{ cursor: "pointer" }}
               onClick={() => Navigation(drp?.owner?._id)}
             >
               @{drp?.owner?.userName}
             </span>
             {drp?.message?.replace(drp?.owner?.userName, "")}{" "}
             <span>{drp?.artwork?.name}</span>
           </h6>
           <span className="time-driptivity">{fromNow(drp?.createdAt)}</span>
         </div>
       </div>
     </div>
    }
      
    </>
  );
}

export default DripCard;
