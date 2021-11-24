import { useEffect } from "react";
import "./App.css";
import { stateLoaded } from "./model/budgetSlice";
import { useAppDispatch } from "./model/hooks";
import { ModalE, toggledModal } from "./model/uiSlice";
import Loader from "./components/common/loader";
import BatchModal from "./components/modal/batchModal";
import Login from "./components/modal/login";
import SignUp from "./components/modal/signUp";
import Tracker from "./components/tracker";
import { onStateChange } from "./services/authService";
import { getState } from "./services/stateService";
import CreateBudget from "./components/modal/createBudget";
import Settings from "./components/settings/settings";
import About from "./components/modal/about";
import AOS from "aos";

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		AOS.init();
	}, []);

	useEffect(() => {
		return onStateChange(user => {
			if (user) {
				dispatch(() => {
					getState(user, budgets => dispatch(stateLoaded(budgets)));
				});
			} else {
				dispatch(toggledModal(ModalE.LOGIN));
			}
		});
	}, [dispatch]);

	return (
		<div className="App">
			<Loader />

			<About />

			<Settings />

			{/* Modals */}
			<Login />
			<SignUp />
			<BatchModal />
			<CreateBudget />

			{/* Page */}
			<Tracker />
		</div>
	);
}

export default App;
