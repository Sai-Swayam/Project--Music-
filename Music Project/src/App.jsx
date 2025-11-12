import "./App.css";
import PlayPause from "./components/PlayPause";
import Rack from "./components/Rack";
import ContextProvider from "./context/ContextProvider";
// import * as Tone from 'tone'

function App() {
	return (
		<ContextProvider>
			<div className="blur-vignette"></div>
			<Rack />
			<PlayPause />
		</ContextProvider>
	);
}

export default App;
