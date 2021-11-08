// import { toast } from "react-toastify";
import { Middleware } from "redux";
import { RootState } from "../store";
import { setLoading } from "../uiSlice";
// import { getCurrentUser } from "../../services/authService";
// import { ModalE, toggledLoading, toggledModal } from "../uiSlice";

export const checks: Middleware = store => next => action => {
	const { dispatch, getState } = store;

	if (typeof action === "function") {
		dispatch(setLoading(1));
		action(dispatch, getState);
		return;
	}

	if (action.type.includes("budgets/")) dispatch(setLoading(0));
	if (action.type.includes("ui/toggledModal")) stopLoader(dispatch, getState());

	next(action);

	// if (!getCurrentUser()) {
	// 	if (!action?.type?.includes("ui/"))
	// 		toast.warn("Please login to perform this action.");

	// 	next(toggledModal(ModalE.LOGIN));
	// } else {
	// 	store.dispatch(toggledLoading(1));
	// 	next(action);
	// }
};

const stopLoader = (dispatch, state: RootState) => {
	if (state.ui.loading) dispatch(setLoading(0));
};

export default checks;
