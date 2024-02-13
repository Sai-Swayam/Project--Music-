import React, { useState } from "react";
import Patch from "./Patch";
import "./Rack.css";

const Rack = () => {
  const [sounds, setSound] = useState(["Kick", "Snare", "Clap", "Hat"]);

  return (
    <>
      <div className="rack-body">
        {sounds.map((sound) => {
          return <Patch sound={sound} />;
        })}
      </div>
    </>
  );
};

export default Rack;
