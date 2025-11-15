import { useState, useContext, useEffect, useRef } from "react";
import Context from "../context/Context";
import "./PlayPause.css";
import * as Tone from "tone";

const PlayPause = () => {
	const { samples, soundMap } = useContext(Context);
	const [playing, setPlaying] = useState(true);
	const [tempo, setTempo] = useState(localStorage.getItem("tempo") || 250);
	const tempoRef = useRef(localStorage.getItem("tempo") || 250);
	const loopRef = useRef(null);

	useEffect(() => {
		let i = 0;
		loopRef.current = new Tone.Loop((time) => {
			if (i === 16) i = 0;

			samples.current.forEach((sample) => {
				if (sample.StepArray[i].mute === 0) {
					Tone.loaded().then(() => soundMap.current[sample.name].start(time));
				}
			});

			i++;
		}, "4n").start(0);

		return () => {
			loopRef.current.dispose();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					max="500"
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
