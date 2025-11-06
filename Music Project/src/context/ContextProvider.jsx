import React from "react";
import { useState } from "react";
import Context from "./Context";

const ContextProvider = ({ children }) => {
  const stepArray = new Array(16);
  for (let i = 0; i < 16; ++i)
    stepArray[i] = {
      mute: 1,
      index: i,
    };

  const [samples, setSamples] = useState([
    {
      id: 0,
      name: "kick",
      url: "/kick-acoustic01.wav",
      StepArray: [...stepArray],
    },
    {
      id: 1,
      name: "hihat",
      url: "/hihat-acoustic01.wav",
      StepArray: [...stepArray],
    },
    {
      id: 2,
      name: "snare",
      url: "/snare-acoustic01.wav",
      StepArray: [...stepArray],
    },
    {
      id: 3,
      name: "tom",
      url: "/tom-acoustic01.wav",
      StepArray: [...stepArray],
    },
  ]);

  return (
    <Context.Provider value={{ samples, setSamples }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
