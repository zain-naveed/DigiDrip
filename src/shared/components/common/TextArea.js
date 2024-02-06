import React from "react";
import "./TextArea.css";
function TextArea(props) {
  return <textarea rows={props.row} {...props} className="textarea" />;
}

export default TextArea;
