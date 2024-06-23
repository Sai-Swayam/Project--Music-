import React from "react";
import { useState, useContext, useEffect, useRef } from "react";

import Context from "../context/Context";

import "./PlayPause.css";
import * as Tone from "tone";

const PlayPause = () => {
  // index
  let i = 0;

  // states
  const { samples, setSamples } = useContext(Context);
  const [toneStarted, setToneStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [setup, setSetup] = useState(false);

  //useRef
  const loopRef = useRef(null);

  //useEffect
  useEffect(() => {
    // i = 0;
    // console.log(i);

    let kick = new Tone.Player("/kick-acoustic01.wav").toDestination();
    let hihat = new Tone.Player("/hihat-acoustic01.wav").toDestination();
    let snare = new Tone.Player("/snare-acoustic01.wav").toDestination();
    let tom = new Tone.Player("/tom-acoustic01.wav").toDestination();

    loopRef.current = new Tone.Loop((time) => {
      // kick.start(time);
      if (i === 16) i = 0;

      samples[0].StepArray[i].mute === 0 ? kick.start(time) : "";
      samples[1].StepArray[i].mute === 0 ? hihat.start(time) : "";
      samples[2].StepArray[i].mute === 0 ? snare.start(time) : "";
      samples[3].StepArray[i].mute === 0 ? tom.start(time) : "";

      i++;
    }, "4n").start(0);

    return () => {
      loopRef.current.dispose();
    };
  }, [playing]);

  // play/pause
  async function goHandler(event) {
    // -------------
    console.log(samples);
    // -------------
    if (!toneStarted) await Tone.start();
    setToneStarted(true);
    setPlaying(!playing);
    if (playing) return Tone.Transport.stop();

    if (!setup) {
      // let kick = new Tone.Player("/kick-acoustic01.wav").toDestination();
      // let hihat = new Tone.Player("/hihat-acoustic01.wav").toDestination();
      // let snare = new Tone.Player("/snare-acoustic01.wav").toDestination();
      // let tom = new Tone.Player("/tom-acoustic01.wav").toDestination();

      // let toneArray = [kick, hihat, snare, tom];

      await Tone.loaded();

      // play a note every quarter-note
      loopRef.current.start(0);

      // Tone.Transport.bpm.rampTo(50, 0.2);
      setSetup(true);
    }

    Tone.Transport.bpm.value = 250;
    Tone.Transport.start();
  }

  return (
    <div className="playpause">
      <button className="button" onClick={goHandler}>
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default PlayPause;
