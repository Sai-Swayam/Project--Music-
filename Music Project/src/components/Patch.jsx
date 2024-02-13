import React from "react";
import "./Patch.css"

const Patch = (props) => {
  return (
    <div className="patch-body">
    <input type="radio" id="{props.sound}" name="patch" value="{props.sound}"/>
    <button className="patch">
      <h1>{props.sound}</h1>
    </button>
    </div>
  );
};

export default Patch;
