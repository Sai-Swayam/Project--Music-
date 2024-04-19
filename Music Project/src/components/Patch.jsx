import React, { useState, useContext } from "react";
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
  const { samples, setSamples } = useContext(Context);

  const play = () => {
    const player = new Tone.Player(props.url).toDestination();
    player.autostart = true;
    // console.log("audio is ready");
    // console.log(steps)
    console.log(mute);
    player.mute = mute;
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
        {samples[props.id].StepArray.map((step, index) => (
          <Step key={index} step={step} id={props.id} index={step.index}/>
        ))}
      </div>
    </div>
  );
};

export default Patch;
