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
		modal: [],
		loading: false
	},

	reducers: {
		toggledModal: (state, { payload }: PayloadAction<ModalE>) => {
			if (payload === ModalE.CLOSE)
				state.modal = state.modal.map(value => false);
			else state.modal[payload] = !state.modal[payload];
		},

		toggledLoading: (state, action) => {
			state.loading = !state.loading;
		}
	}
});

export const { toggledModal, toggledLoading } = uiSlice.actions;

export const selectModal = (modal: ModalE) => (state: RootState) =>
	state.ui.modal[modal];

export const selectLoading = (state: RootState) => state.ui.loading;

export default uiSlice.reducer;
