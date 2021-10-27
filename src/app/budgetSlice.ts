import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

const budgetSlice = createSlice({
	name: "budget",

	initialState: {
		income: [] as Budget[],
		expense: [] as Budget[],
		selectedBudget: { amounts: [] } as Budget
	},

	reducers: {
		addedBudget: (state, { payload }: PayloadAction<Budget>) => {
			const { type, description, amounts } = payload;

			const index = state[payload.type].findIndex(
				b => b.description.toLowerCase() === description.toLowerCase()
			);

			if (index === -1) {
				state[type].push(payload);
			} else {
				const budget = state[type][index];

				state[type][index].amounts = [...budget.amounts, ...amounts];
			}
		},

		changedSelectedBudget: (state, { payload }: PayloadAction<Budget>) => {
			state.selectedBudget = payload;
		}
	}
});

export const { addedBudget, changedSelectedBudget } = budgetSlice.actions;

export const selectBudgets = (state: RootState) => state.budget;

export const selectBudget = (param: SelectBudget) => (state: RootState) =>
	param.type
		? state.budget[param.type].find(b => b.id === param.id)
		: undefined;

// export const selectBudget = (budget: SelectBudget) => (state: RootState) => {
// 	return state.budget[budget.type].find(
// 		b => b.description === budget.description
// 	);
// };

export default budgetSlice.reducer;
