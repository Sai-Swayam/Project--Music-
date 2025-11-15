import { useRef } from "react";
import Context from "./Context";

const ContextProvider = ({ children }) => {
	const initSamples = [
		{
			id: 0,
			name: "kick",
			url: "/kick-acoustic01.wav",
			instance: null,
			StepArray: Array(16).fill(0)
		},
		{
			id: 1,
			name: "snare",
			url: "/snare-acoustic01.wav",
			instance: null,
			StepArray: Array(16).fill(0)
		},
		{
			id: 2,
			name: "hihat",
			url: "/hihat-acoustic01.wav",
			instance: null,
			StepArray: Array(16).fill(0)
		},
		{
			id: 3,
			name: "tom",
			url: "/tom-acoustic01.wav",
			instance: null,
			StepArray: Array(16).fill(0)
		}
	];

	const soundMap = useRef(() => {
		return initSamples.reduce((acc, sample) => {
			acc[sample.name] = null;
			return acc;
		}, {});
	});

	const getInitialSamples = () => {
		const localStorageSamples = localStorage.getItem("samples");
		return localStorageSamples ? JSON.parse(localStorageSamples) : initSamples;
	}

	const samples = useRef(getInitialSamples());

	const modifyStepArray = (id, index) => {
		let tempSample = JSON.parse(JSON.stringify(samples.current));
		tempSample[id].StepArray[index].mute ^= 1;
		samples.current = tempSample;

		//TODO instead of repeatedly setting to local storage, set only when asked.
		localStorage.setItem("samples", JSON.stringify(samples.current));

		return tempSample[id].StepArray[index].mute;
	}

	return (
		<Context.Provider value={{ samples, soundMap, modifyStepArray }}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;
