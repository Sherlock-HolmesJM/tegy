import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const uiSlice = createSlice({
	name: "ui",

	initialState: {
		modal: { batch: false }
	},

	reducers: {
		toggledBatch: (state, { payload }: PayloadAction<boolean>) => {
			state.modal.batch = !state.modal.batch;
		}
	}
});

export const { toggledBatch } = uiSlice.actions;

export const selectCreateBatch = (state: RootState) => state.ui.modal.batch;

export default uiSlice.reducer;
