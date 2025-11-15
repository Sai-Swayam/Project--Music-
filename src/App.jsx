import { useEffect, useContext, } from "react";
import "./App.css";
import PlayPause from "./components/PlayPause";
import Rack from "./components/Rack";
import Context from "./context/Context"
import * as Tone from 'tone'

function App() {
	const { samples, soundMap } = useContext(Context);

	useEffect(() => {
		samples.current.forEach(sample => {
			soundMap.current[sample.name] = new Tone.Player(sample.url).toDestination();
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="blur-vignette"></div>
			<Rack />
			<PlayPause />
		</>
	);
}

export default App;
