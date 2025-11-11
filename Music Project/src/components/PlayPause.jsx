import React from "react";
import { useState, useContext, useEffect, useRef } from "react";

import Context from "../context/Context";

import "./PlayPause.css";
import * as Tone from "tone";

const PlayPause = () => {
	const { samples } = useContext(Context);
	const [playing, setPlaying] = useState(true);
	const loopRef = useRef(null);
	const kick = useRef(new Tone.Player("/kick-acoustic01.wav").toDestination());
	const snare = useRef(new Tone.Player("/snare-acoustic01.wav").toDestination());
	const hihat = useRef(new Tone.Player("/hihat-acoustic01.wav").toDestination());
	const tom = useRef(new Tone.Player("/tom-acoustic01.wav").toDestination());


	useEffect(() => {
		let i = 0;
		loopRef.current = new Tone.Loop((time) => {
			if (i === 16) i = 0;

			samples[0].StepArray[i].mute === 0 ? Tone.loaded().then(() => kick.current.start(time)) : "";
			samples[1].StepArray[i].mute === 0 ? Tone.loaded().then(() => snare.current.start(time)) : "";
			samples[2].StepArray[i].mute === 0 ? Tone.loaded().then(() => hihat.current.start(time)) : "";
			samples[3].StepArray[i].mute === 0 ? Tone.loaded().then(() => tom.current.start(time)) : "";

			i++;
		}, "4n").start(0);

		return () => {
			loopRef.current.dispose();
		};
	}, [playing]);

	// play/pause
	async function playHandler() {
		setPlaying(!playing);
		if (playing) {
			await Tone.start();
			loopRef.current.start(0);
			Tone.getTransport().bpm.value = 250;
			Tone.getTransport().start();
		} else {
			Tone.getTransport().stop();
		}
	}

	return (
		<div className="playpause">
			<button className="button" onClick={playHandler}>
				{playing ? "Play" : "Pause"}
			</button>
		</div>
	);
};

export default PlayPause;
