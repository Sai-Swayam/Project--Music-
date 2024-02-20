import React, { useState } from "react";
import "./Patch.css";
import Step from "./Step";

const Patch = (props) => {
  
  const stepArray = new Array(16);
  for (let i = 0; i < 16; ++i) stepArray[i] = 1;
  const [steps, setSteps] = useState(stepArray);

  return (
    <div className="patch-body">
      <input
        type="checkbox"
        id="{props.sound}"
        name="patch"
        value="{props.sound}"
      />
      <button className="patch">
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
