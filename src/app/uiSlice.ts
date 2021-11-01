import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export enum ModalE {
	SIGN_UP = 0,
	BATCH,
	CLOSE
}

const uiSlice = createSlice({
	name: "ui",

	initialState: {
		modal: []
	},

	reducers: {
		toggledModal: (state, { payload }: PayloadAction<ModalE>) => {
			if (payload === ModalE.CLOSE)
				state.modal = state.modal.map(value => false);
			else state.modal[payload] = !state.modal[payload];
		}
	}
});

export const { toggledModal } = uiSlice.actions;

export const selectModal = (modal: ModalE) => (state: RootState) =>
	state.ui.modal[modal];

export default uiSlice.reducer;
