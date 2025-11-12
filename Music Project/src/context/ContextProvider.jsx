import React from "react";
import { useState, useRef } from "react";
import Context from "./Context";

const ContextProvider = ({ children }) => {
	const initStepArray = new Array(16);
	for (let i = 0; i < 16; ++i)
		initStepArray[i] = {
			mute: 1,
			index: i,
		};

	const initSamples = [
		{
			id: 0,
			name: "kick",
			url: "/kick-acoustic01.wav",
			StepArray: [...initStepArray],
		},
		{
			id: 1,
			name: "snare",
			url: "/snare-acoustic01.wav",
			StepArray: [...initStepArray],
		},
		{
			id: 2,
			name: "hihat",
			url: "/hihat-acoustic01.wav",
			StepArray: [...initStepArray],
		},
		{
			id: 3,
			name: "tom",
			url: "/tom-acoustic01.wav",
			StepArray: [...initStepArray],
		}
	];

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
		<Context.Provider value={{ samples, modifyStepArray }}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;
