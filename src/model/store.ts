import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import budgetReducer from "./budgetSlice";
import uiReducer from "./uiSlice";
import checks from "./middleware/func";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		budgets: budgetReducer,
		ui: uiReducer
	},

	middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(checks)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
