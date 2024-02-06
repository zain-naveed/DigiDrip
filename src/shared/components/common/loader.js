import React from "react";
import { LoaderAnim, LoaderImage } from "../../../assets";
import Animation from "./Animation";
import "./loader.css";
function Loader() {
  return (
    <div className="loader">
      <div style={{ height: "369px", marginTop: "37vh", position: "fixed" }}>
        <Animation Pic={LoaderAnim} />
      </div>
    </div>
  );
}

export default Loader;
