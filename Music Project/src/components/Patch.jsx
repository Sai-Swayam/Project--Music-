import React, { useState } from "react";
import "./Patch.css";
import Step from "./Step";
import * as Tone from "tone";

const Patch = (props) => {
  const stepArray = new Array(16);
  for (let i = 0; i < 16; ++i) stepArray[i] = 1;
  const [steps, setSteps] = useState(stepArray);
  const play = () => {
    const player = new Tone.Player(props.url).toDestination();
    player.autostart = true;
    console.log("audio is ready");
  };

  return (
    <div className="patch-body">
      <input
        type="checkbox"
        id="{props.sound}"
        name="patch"
        value="{props.sound}"
      />
      <button className="patch" onClick={play}>
        <h1>{props.sound}</h1>
      </button>
      <div className="step-body">
        {steps.map((step, index) => (
          <Step key={index} mute={step} />
        ))}
      </div>
    </div>
  );
};

export default Patch;
