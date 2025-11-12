import React from "react";
import { useState, useContext, useEffect, useRef } from "react";

import Context from "../context/Context";

import "./PlayPause.css";
import * as Tone from "tone";

const PlayPause = () => {
	const { samples } = useContext(Context);
	const [playing, setPlaying] = useState(true);
	const [tempo, setTempo] = useState(250);
	const tempoRef = useRef(250);
	const loopRef = useRef(null);
	const kick = useRef(new Tone.Player("/kick-acoustic01.wav").toDestination());
	const snare = useRef(new Tone.Player("/snare-acoustic01.wav").toDestination());
	const hihat = useRef(new Tone.Player("/hihat-acoustic01.wav").toDestination());
	const tom = useRef(new Tone.Player("/tom-acoustic01.wav").toDestination());


	useEffect(() => {
		let i = 0;
		loopRef.current = new Tone.Loop((time) => {
			if (i === 16) i = 0;

			samples.current[0].StepArray[i].mute === 0 ? Tone.loaded().then(() => kick.current.start(time)) : "";
			samples.current[1].StepArray[i].mute === 0 ? Tone.loaded().then(() => snare.current.start(time)) : "";
			samples.current[2].StepArray[i].mute === 0 ? Tone.loaded().then(() => hihat.current.start(time)) : "";
			samples.current[3].StepArray[i].mute === 0 ? Tone.loaded().then(() => tom.current.start(time)) : "";

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
			Tone.getTransport().bpm.value = tempoRef.current;
			console.log(tempo)
			Tone.getTransport().start();
		} else {
			Tone.getTransport().stop();
		}
	}

	const handleTempoChange = (event) => {
		setTempo(event.target.value);
		tempoRef.current = tempo;
		Tone.getTransport().bpm.value = tempoRef.current;
		console.log("rerender")
	};

	return (
		<>
			<div className="playpause">
				<button className="button" onClick={playHandler}>
					{playing ? "Play" : "Pause"}
				</button>
				<input
					type="range"
					min="0"
					max="300"
					step="1"
					defaultValue={tempo}
					onChange={handleTempoChange}
					className="tempo-slider"
				/>
				<p>Tempo: {tempo}</p>
			</div>
		</>

	);
};

export default PlayPause;
