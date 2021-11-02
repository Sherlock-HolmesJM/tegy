import { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import { ModalE, toggledModal } from "./app/uiSlice";
import Loader from "./components/common/loader";
import CreateBatch from "./components/modal/createBatch";
import Login from "./components/modal/login";
import SignUp from "./components/modal/signUp";
import Tracker from "./components/tracker";
import { onStateChange } from "./services/authService";

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		onStateChange(user => {
			if (!user) dispatch(toggledModal(ModalE.LOGIN));
		});
		// eslint-disable-next-line
	}, []);

	return (
		<div className="App">
			<Loader />

			{/* Modals */}
			<Login />
			<SignUp />
			<CreateBatch />

			{/* Page */}
			<Tracker />
		</div>
	);
}

export default App;
