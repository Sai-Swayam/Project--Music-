import React, { useState } from "react";
import Patch from "./Patch";
import "./Rack.css";

const Rack = () => {
  const [samples, setSamples] = useState([
    { name: "kick", url: "/kick-acoustic01.wav" },
    { name: "hihat", url: "/hihat-acoustic01.wav" },
    { name: "snare", url: "/snare-acoustic01.wav" },
    { name: "tom", url: "/tom-acoustic01.wav" },
  ]);

  return (
    <>
      <div className="rack-body">
        {samples.map((sound, index) => {
          return <Patch sound={sound.name} url={sound.url} key={index} />;
        })}
      </div>
    </>
  );
};

export default Rack;
