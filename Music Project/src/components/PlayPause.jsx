import React from "react";
import { useState, useContext } from "react";

import Context from "../context/Context";

import "./PlayPause.css";
import * as Tone from "tone";

const PlayPause = () => {
  const { samples, setSamples } = useContext(Context);
  const [toneStarted, setToneStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [setup, setSetup] = useState(false);

  async function goHandler(event) {
    if (!toneStarted) await Tone.start();
    setToneStarted(true);
    setPlaying(!playing);
    if (playing) return Tone.Transport.stop();

    if (!setup) {
      var kick = new Tone.Player("/kick-acoustic01.wav").toDestination();
      var snare = new Tone.Player("/snare-acoustic01.wav").toDestination();
      await Tone.loaded();

      // play a note every quarter-note
      new Tone.Loop((time) => {
        kick.start(time);
      }, "4n").start(0);

      // play another note every off quarter-note, by starting it "8n"
      new Tone.Loop((time) => {
        snare.start(time);
      }, "4n").start("8n");

      // Tone.Transport.bpm.rampTo(50, 0.2);
      setSetup(true);
    }

    Tone.Transport.bpm.value = 150;
    Tone.Transport.start();
  }

  return (
    <div className="playpause">
      <button className="button" onClick={goHandler}>
        {playing ? "STOP" : "PLAY"}
      </button>
    </div>
  );
};

export default PlayPause;
