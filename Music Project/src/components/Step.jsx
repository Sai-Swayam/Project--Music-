import React, { useState, useContext } from "react";
import Context from "../context/Context";
import "./Step.css";

const Step = (props) => {
  const { id, index } = props;
  const { samples, setSamples } = useContext(Context);
  const [mute, setMute] = useState(
    samples[id].StepArray[index].mute
  );

  const toggleMute = () => {
    // Create a deep copy of the samples array
    let tempSample = JSON.parse(JSON.stringify(samples));

    // Toggle the mute value of the desired step
    tempSample[id].StepArray[index].mute ^= 1;

    // Update the state
    setSamples(tempSample);

    // Update the local mute state
    setMute(tempSample[id].StepArray[index].mute);
  };

  return (
    <>
      <button
        className={mute ? "step mute" : "step torq"}
        onClick={() => toggleMute()}
      ></button>
    </>
  );
};

export default Step;
