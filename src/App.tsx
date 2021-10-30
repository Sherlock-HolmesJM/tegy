import "./App.css";
import CreateBatch from "./components/modal/createBatch";
import Tracker from "./components/tracker";

function App() {
	return (
		<div className="App">
			{/* Modals */}
			<CreateBatch />

			{/* Page */}
			<Tracker />
		</div>
	);
}

export default App;
