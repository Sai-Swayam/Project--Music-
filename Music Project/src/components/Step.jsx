import React, { useState, useContext } from "react";
import Context from "../context/Context";
import "./Step.css";


const Step = (props) => {
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
    if(samples[props.id].StepArray[props.index] === 0)
      {
        let tempSample = samples;
        tempSample[props.id].StepArray[props.index] = 1;
        setMute(tempSample);
        console.log("unmuted " + props.index);
      }
      else{
        let tempSample = samples;
        tempSample[props.id].StepArray[props.index] = 0;
        setMute(tempSample);
        console.log("muted " + props.index); 
      }
  }

  // console.log(samples[props.id].StepArray[props.index]);

  return (
    <>
      <button
        className={mute ? "step torq" : "step mute"}
        onClick={() => toggleMute()}
      ></button>
    </>
  );
};

export default Step;
