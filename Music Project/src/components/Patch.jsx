import React, { useState, useContext } from "react";
import "./Patch.css";
import Step from "./Step";
import * as Tone from "tone";
import Context from "../context/Context";

const Patch = (props) => {
  const [mute, setMute] = useState(false);
  const { samples, setSamples } = useContext(Context);
  const { sound, url, id } = props;
  const player = new Tone.Player(url).toDestination();
  
  const play = () => {
	Tone.loaded().then(() => player.start());
    player.mute = mute;
  };

  let ind = -1;

  return (
    <div className="patch-body">
      <input
        type="checkbox"
		checked={!mute}
        id="{sound}"
        name="patch"
        value="{sound}"
        onChange={() => {
          setMute(!mute);
          // console.log(mute);
        }}
      />
      <button className="patch" onClick={play}>
        <h1>{sound}</h1>
      </button>
      <div className="step-body">
        {samples[id].StepArray.map((step, index) => {
          // console.log(id)
          ind++;
          return(
          <Step key={index} step={step} id={id} index={ind}/>
        )})}
      </div>
    </div>
  );
};

export default Patch;
