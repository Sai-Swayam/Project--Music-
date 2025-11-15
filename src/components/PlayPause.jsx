import { useState, useContext, useEffect, useRef } from "react";
import Context from "../context/Context";
import "./PlayPause.css";
import * as Tone from "tone";

const PlayPause = () => {
	const { samples } = useContext(Context);
	const [playing, setPlaying] = useState(true);
	const [tempo, setTempo] = useState(localStorage.getItem("tempo") || 250);
	const tempoRef = useRef(localStorage.getItem("tempo") || 250);
	const loopRef = useRef(null);
	const kick = useRef(null);
	const snare = useRef(null);
	const hihat = useRef(null);
	const tom = useRef(null);

	useEffect(() => {
		kick.current = new Tone.Player("/kick-acoustic01.wav").toDestination();
		snare.current = new Tone.Player("/snare-acoustic01.wav").toDestination();
		hihat.current = new Tone.Player("/hihat-acoustic01.wav").toDestination();
		tom.current = new Tone.Player("/tom-acoustic01.wav").toDestination();
	}, []);

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

	async function playHandler() {
		setPlaying(!playing);
		if (playing) {
			await Tone.start();
			loopRef.current.start(0);
			Tone.getTransport().bpm.value = tempoRef.current;
			Tone.getTransport().start();
		} else {
			Tone.getTransport().stop();
		}
	}

	const handleTempoChange = (event) => {
		let tempoValue = parseFloat(event.target.value);
		setTempo(tempoValue);
		tempoRef.current = tempoValue;
		localStorage.setItem("tempo", tempoValue);
		Tone.getTransport().bpm.value = tempoValue;
	};

	const playPauseButtonRef = useRef(null);
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === " ") { // spacebar
				e.preventDefault(); // prevent page scroll
				playPauseButtonRef.current?.click(); // simulate button click
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<>
			<div className="playpause">
				<button ref={playPauseButtonRef} className="button" onClick={playHandler}>
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
