import React, { useState, useContext, useEffect } from "react";
import Context from "../context/Context";
import "./Step.css";

const Step = (props) => {
  // useEffect(() => {});

  // ----------------------------------------------------------

  const { samples, setSamples } = useContext(Context);
  const [mute, setMute] = useState(
    samples[props.id].StepArray[props.index].mute
  );

  // console.log(props.id);

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

  // const toggleMute = () => {
  //   if (samples[props.id].StepArray[props.index].mute === 0) {
  //     // console.log(samples[props.id].StepArray[props.index]);
  //     let tempSample = [...samples];
  //     tempSample[props.id].StepArray[props.index].mute = 1;
  //     setSamples(tempSample);
  //     setMute(1);
  //     // console.log("muted " + props.index);

  //     // console.log(samples[props.id].StepArray[props.index]);
  //   } else {
  //     // console.log(samples[props.id].StepArray[props.index]);
  //     let tempSample = [...samples];
  //     tempSample[props.id].StepArray[props.index].mute = 0;
  //     setSamples(tempSample);
  //     setMute(0);
  //     // console.log("unmuted " + props.index);

  //     // console.log(samples[props.id].StepArray[props.index]);
  //   }
  // };

  //-----------------------------------------------------------

  /*
  you might be dealing with a common issue in JavaScript related to how objects and arrays are handled. When you assign an object or array to a new variable, it doesn't create a new copy of that object or array. Instead, it creates a reference to the original. This means that if you modify the new variable, you're actually modifying the original object or array.

  In your case, it seems like all elements in the samples array might be referencing the same stepArray. So when you modify one, it modifies them all.
  
  To avoid this, you need to create a deep copy of the stepArray when you're assigning it to a new variable. Here's an example of how you might do this with the map function:
  */

  
  const toggleMute = () => {
    // Create a deep copy of the samples array
    let tempSample = JSON.parse(JSON.stringify(samples));

    // Toggle the mute value of the desired step
    tempSample[props.id].StepArray[props.index].mute ^= 1;

    // Update the state
    setSamples(tempSample);

    // Update the local mute state
    setMute(tempSample[props.id].StepArray[props.index].mute);
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
