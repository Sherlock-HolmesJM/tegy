import { useEffect } from "react";
import AOS from "aos";
import { descriptionsLoaded, stateLoaded } from "./model/budgetSlice";
import { useAppDispatch } from "./model/hooks";
import { ModalE, toggledModal } from "./model/uiSlice";
import Loader from "./components/common/loader";
import BatchModal from "./components/modal/batchModal";
import Login from "./components/modal/login";
import SignUp from "./components/modal/signUp";
import Tracker from "./components/tracker";
import { onStateChange } from "./services/authService";
import { getDescriptions, getState } from "./services/stateService";
import BudgetModal from "./components/modal/budgetModal";
import Settings from "./components/settings/settings";
import About from "./components/modal/about";
import "./App.css";

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		AOS.init();
	}, []);

	useEffect(() => {
		return onStateChange(user => {
			if (!user) {
				dispatch(toggledModal(ModalE.LOGIN));
				return;
			}

			// dispatch a function for auto-spin pipeline
			dispatch(() => {
				getState(user, {
					success: (budgets: Budgets) => {
						dispatch(stateLoaded(budgets));

						getDescriptions({
							success: (res: string[]) => dispatch(descriptionsLoaded(res))
						});
					}
				});
			});
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
			<BudgetModal />

			{/* Page */}
			<Tracker />
		</div>
	);
}

export default App;
