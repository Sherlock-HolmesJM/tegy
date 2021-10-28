import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { totalBudget } from "../utils/budget";
import { RootState } from "./store";
import { findBudget, getCurrentBatch } from "../utils/budgetSlice";

const batch: Batch = {
	id: Date.now() + "",
	name: "batch1",
	income: [],
	expense: [],
	total: {
		income: 0,
		expense: 0
	}
};

const initialState: BudgetSlice = {
	id: Date.now() + "",
	name: "nepa_bill",
	currentBatchId: batch.id,
	batches: [batch]
};

const budgetSlice = createSlice({
	name: "budget",

	initialState,

	reducers: {
		addedBudget: (state, { payload }: PayloadAction<Budget>) => {
			const { type, description, amounts } = payload;

			const budget = findBudget({ type, description }, state);

			if (budget) {
				budget.amounts = [...budget.amounts, ...amounts];
			} else {
				getCurrentBatch(state)[type].push(payload);
			}
		},

		updatedTotal: (state, { payload }: PayloadAction<BudgetFind>) => {
			const batch = getCurrentBatch(state);

			const { income, expense } = batch;
			batch.total = totalBudget([...income, ...expense]);
		}
	}
});

export const { addedBudget, updatedTotal } = budgetSlice.actions;

export const selectBatch = (state: RootState) => {
	return getCurrentBatch(state.budget);
};

export const selectBudget = (param: BudgetFind) => (state: RootState) => {
	return findBudget(param, state.budget);
};

export const selectBatchTotal = (state: RootState) => {
	return getCurrentBatch(state.budget).total;
};

// export const selectBudget = (budget: SelectBudget) => (state: RootState) => {
// 	return state.budget[budget.type].find(
// 		b => b.description === budget.description
// 	);
// };

export default budgetSlice.reducer;
