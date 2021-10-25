import "./App.css";
import Tracker from "./components/tracker";

function App() {
	window.border = (color = "red") => `border: 1px solid ${color};`;

	return (
		<div className="App">
			<Tracker />
		</div>
	);
}

export default App;
