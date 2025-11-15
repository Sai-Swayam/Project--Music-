import { useState, useContext } from "react";
import Context from "../context/Context";
import "./Step.css";

const Step = (props) => {
	const { id, index } = props;
	const { samples, modifyStepArray } = useContext(Context);
	const [mute, setMute] = useState(
		samples.current[id].StepArray[index].mute
	);

	return (
		<>
			<button
				className={mute ? "step mute" : "step torq"}
				onClick={() => setMute(modifyStepArray(id, index))}
			></button>
		</>
	);
};

export default Step;
