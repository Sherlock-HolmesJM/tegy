import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toBudgetList, totalBudget } from "../utils/budget";
import { RootState } from "./store";

const initialState: BudgetSlice = {
	income: [],
	expense: [],
	total: {
		income: 0,
		expense: 0
	}
};

const budgetSlice = createSlice({
	name: "budget",

	initialState,

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

		updatedTotal: (state, { payload }: PayloadAction<SelectBudget>) => {
			const budget = findBudget(payload, state);

			const { income, expense } = state;

			state.total = totalBudget(
				budget ? toBudgetList(budget) : [...income, ...expense]
			);
		}
	}
});

const findBudget = (param: SelectBudget, budget: BudgetSlice) =>
	budget[param?.type]?.find(b => b.id === param.id);

export const { addedBudget, updatedTotal } = budgetSlice.actions;

export const selectBudgets = (state: RootState) => state.budget;

export const selectBudget = (param: SelectBudget) => (state: RootState) =>
	findBudget(param, state.budget);

export const selectBudgetTotal = (state: RootState) => state.budget.total;

// export const selectBudget = (budget: SelectBudget) => (state: RootState) => {
// 	return state.budget[budget.type].find(
// 		b => b.description === budget.description
// 	);
// };

export default budgetSlice.reducer;
