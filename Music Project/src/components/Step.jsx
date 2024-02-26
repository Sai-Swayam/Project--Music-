import React, { useState, useEffect } from "react";
import "./Step.css";

const Step = (props) => {
  const [mute, setMute] = useState(props.mute);
  // console.log(props.mute);

  const toggleMute = () => {
    if (mute === 0) {
      setMute(1);
      console.log("unmuted");
    } else {
      setMute(0);
      console.log("muted");
    }
  };


  return (
    <>
      <button
        className={(mute ? "step torq" : "step mute")}
        onClick={() => toggleMute()}
      ></button>
    </>
  );
};

export default Step;
