import "./App.css";
import CreateBatch from "./components/modal/createBatch";
import SignUp from "./components/modal/signUp";
import Tracker from "./components/tracker";

function App() {
	return (
		<div className="App">
			{/* Modals */}
			<SignUp />
			<CreateBatch />

			{/* Page */}
			<Tracker />
		</div>
	);
}

export default App;
