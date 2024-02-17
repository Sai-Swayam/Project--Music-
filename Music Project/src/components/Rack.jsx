import React, { useState } from "react";
import Patch from "./Patch";
import Step from "./Step";
import "./Rack.css";

const Rack = () => {
  const [sounds, setSound] = useState(["Kick", "Snare", "Clap", "Hat"]);

  return (
    <>
      <div className="rack-body">
        {sounds.map((sound, index) => {
          return <Patch sound={sound} key={index} />;
        })}
      </div>
    </>
  );
};

export default Rack;
