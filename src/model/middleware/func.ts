import log from "../../services/logger";
import { Middleware } from "redux";
import { RootState } from "../store";
import { setLoading } from "../uiSlice";

export const checks: Middleware = store => next => action => {
	try {
		const { dispatch, getState } = store;

		if (typeof action === "function") {
			dispatch(setLoading(1));
			action(dispatch, getState);
			return;
		}

		if (action.type.includes("budgets/")) dispatch(setLoading(0));
		if (action.type.includes("ui/toggledModal"))
			stopLoader(dispatch, getState());

		next(action);
	} catch (error) {
		log.error(error);
	}
};

const stopLoader = (dispatch, state: RootState) => {
	if (state.ui.loading) dispatch(setLoading(0));
};

export default checks;
