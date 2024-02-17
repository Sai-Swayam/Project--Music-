import React, { useState, useEffect } from "react";
import "./Patch.css";
import Step from "./Step";
// import * as Tone from 'tone'

const Patch = (props) => {
  // const synth = new Tone.Synth().toDestination();
  // synth.triggerAttackRelease("C4");

  const [mute, setMute] = useState(false);
  const stepArray = new Array(16);
  for (let i = 0; i < 16; ++i) stepArray[i] = 0;
  const [steps, setSteps] = useState(stepArray);

  // useEffect(() => {
  //   console.log("Buttons Created");
  // }, []);

  // // Empty dependency array means this effect runs only on mount and cleanup

  // useEffect(() => {
  //   if (mute) console.log("Muted");
  //   else console.log("Unmuted");
  // }, [mute]);

  const muteUnmute = () => {
    setMute(!mute);
    // console.log(mute);
  };

  const toggleMute = (index) => {
    const newSteps = [...steps];
    newSteps[index] = !newSteps[index];
    setSteps(newSteps);
  };

  return (
    <div className="patch-body">
      <input
        type="checkbox"
        id="{props.sound}"
        name="patch"
        value="{props.sound}"
        onClick={muteUnmute}
      />
      <button className="patch">
        <h1>{props.sound}</h1>
      </button>
      {steps.map((step, index) => (
        <Step key={index} mute={step} onClick={toggleMute}/>
      ))}
    </div>
  );
};

export default Patch;
