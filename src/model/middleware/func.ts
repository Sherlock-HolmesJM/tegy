import { PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import { Middleware } from "redux";
import { toggledLoading } from "../uiSlice";
// import { getCurrentUser } from "../../services/authService";
// import { ModalE, toggledLoading, toggledModal } from "../uiSlice";

export const checks: Middleware = store => next => (action: PayloadAction) => {
	// store.dispatch(toggledLoading(''))

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

export default checks;
