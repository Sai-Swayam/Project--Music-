import React, { useState, useContext, useEffect } from "react";
import Context from "../context/Context";
import "./Step.css";

const Step = (props) => {
  useEffect(() => {});

  // ----------------------------------------------------------

  const [mute, setMute] = useState(props.step.mute);
  const { samples, setSamples } = useContext(Context);

  // console.log(props.mute);
  //-----------------------------------------------------------
  // const toggleMute = () => {
  //   if (mute === 0) {
  //     setMute(1);
  //     console.log("unmuted " + props.step.index);
  //   } else {
  //     setMute(0);
  //     console.log("muted " + props.step.index);
  //   }
  // };
  //-----------------------------------------------------------

  const toggleMute = () => {
    if (samples[props.id].StepArray[props.index] === 0) {
      console.log(samples[props.id].StepArray[props.index]);
      let tempSample = samples;
      tempSample[props.id].StepArray[props.index] = 1;
      setSamples(tempSample);
      setMute(1);
      console.log("muted " + props.index);

      console.log(samples[props.id].StepArray[props.index]);
    } else {
      console.log(samples[props.id].StepArray[props.index]);
      let tempSample = samples;
      tempSample[props.id].StepArray[props.index] = 0;
      setSamples(tempSample);
      setMute(0);
      console.log("unmuted " + props.index);

      console.log(samples[props.id].StepArray[props.index]);
    }
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
