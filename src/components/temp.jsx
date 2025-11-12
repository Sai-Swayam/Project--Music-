import React, { useState, useContext, useEffect } from "react";
import "./Patch.css";
import Step from "./Step";
import * as Tone from "tone";
import Context from "../context/Context";

const Patch = (props) => {
  const [mute, setMute] = useState(true);
  // const stepArray = new Array(16);
  // for (let i = 0; i < 16; ++i)
  //   stepArray[i] = {
  //     mute: 1,
  //     index: i,
  //   };
  // const [steps, setSteps] = useState(stepArray);
  // const { steps, setSteps } = useContext(Context);


  const play = () => {
    const player = new Tone.Player(props.url).toDestination();
    player.autostart = true;
    console.log(playing);
    console.log(mute);
  };

  return (
    <div className="patch-body">
      <input
        type="checkbox"
        id="{props.sound}"
        name="patch"
        value="{props.sound}"
        onChange={() => {
          setMute(!mute);
          // console.log(mute);
        }}
      />
      <button className="patch" onClick={play}>
        <h1>{props.sound}</h1>
      </button>
      <div className="step-body">
        {steps.map((step, index) => (
          <Step key={index} step={step} />
        ))}
      </div>
    </div>
  );
};

export default Patch;
