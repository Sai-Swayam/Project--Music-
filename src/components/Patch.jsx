import { useState, useContext, useEffect } from "react";
import "./Patch.css";
import Step from "./Step";
import * as Tone from "tone";
import Context from "../context/Context";

const Patch = (props) => {
	const [mute, setMute] = useState(false);
	const { samples, soundMap } = useContext(Context);
	const { sound, id } = props;

	const play = () => {
		Tone.loaded().then(() => {
			soundMap.current[sound].mute = mute;
			soundMap.current[sound].start()
		});
	};

	useEffect(() => {
		Tone.loaded().then(() => {
			soundMap.current[sound].mute = mute;
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mute]);

	let ind = -1;

	return (
		<div className="patch-body">
			<input
				type="checkbox"
				checked={!mute}
				id="{sound}"
				name="patch"
				value="{sound}"
				onChange={() => {
					setMute(!mute);
				}}
			/>
			<button className="patch" onClick={play}>
				<h1>{sound}</h1>
			</button>
			<div className="step-body">
				{samples.current[id].StepArray.map((step, index) => {
					ind++;
					return (
						<Step key={index} step={step} id={id} index={ind} />
					)
				})}
			</div>
		</div>
	);
};

export default Patch;
