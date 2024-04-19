import React, { useState, useContext } from "react";
import Patch from "./Patch";
import "./Rack.css";
import Context from "../context/Context";

const Rack = () => {
  const { samples, setSamples } = useContext(Context);

  return (
    <>
      <div className="rack-body">
        {samples.map((sound, index) => {
          return <Patch sound={sound.name} url={sound.url} key={index} id={sound.id}/>;
        })}
      </div>
    </>
  );
};

export default Rack;
