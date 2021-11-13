import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export enum ModalE {
	LOGIN = 0,
	SIGN_UP,
	BATCH,
	BUDGET,
	SETTING,
	CLOSE
}

const uiSlice = createSlice({
	name: "ui",

	initialState: {
		modal: [],
		loading: 0
	},

	reducers: {
		toggledModal: (state, { payload }: PayloadAction<ModalE>) => {
			const close = (key = -1) => {
				state.modal = state.modal.map((value, index) =>
					index === key ? value : false
				);
			};

			if (payload === ModalE.CLOSE) {
				close();
			} else {
				close(payload);
				state.modal[payload] = !state.modal[payload];
			}
		},

		setLoading: (state, action: PayloadAction<1 | 0>) => {
			state.loading = action.payload;
		}
	}
});

export const { toggledModal, setLoading } = uiSlice.actions;

export const selectModal = (modal: ModalE) => (state: RootState) =>
	state.ui.modal[modal];

export const selectLoading = (state: RootState) => state.ui.loading;

export default uiSlice.reducer;
