import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export enum Modal {
	BATCH = 0,
	SIGN_UP,

	// Note, let CLOSE always be the last
	CLOSE
}

const uiSlice = createSlice({
	name: "ui",

	initialState: {
		modal: new Array(Object.keys(Modal).length / 2).fill(false)
	},

	reducers: {
		toggledModal: (state, { payload }: PayloadAction<Modal>) => {
			if (payload === Modal.CLOSE)
				state.modal = state.modal.map(value => false);
			else state.modal[payload] = !state.modal[payload];
		}
	}
});

export const { toggledModal } = uiSlice.actions;

export const selectModal = (modal: Modal) => (state: RootState) =>
	state.ui.modal[modal];

export default uiSlice.reducer;
