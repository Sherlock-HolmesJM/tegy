import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { totalBudget } from "../utils/budget";
import { RootState } from "./store";
import { findBudget } from "../utils/budget";
import { getCurrentBatch, createBatch } from "../utils/batch";
import uid from "../utils/id";

const batch = createBatch("batch 1", { start: new Date(), end: new Date() });
const batch2 = createBatch("batch 2", { start: new Date(), end: new Date() });

const initialState: BudgetSlice = {
	id: uid(),
	name: "nepa_bill",
	selectedBatch: batch.id,
	batches: [batch, batch2]
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

		removedBudget: (state, { payload }: PayloadAction<BudgetRemove>) => {
			const {
				budget: { id, type, description },
				amountId
			} = payload;

			const budget = findBudget({ type, id, description }, state);

			if (budget.amounts.length > 1) {
				budget.amounts = budget.amounts.filter(a => a.id !== amountId);
			} else {
				const batch = getCurrentBatch(state);
				batch[type] = batch[type].filter(b => b.id !== id);
			}
		},

		updatedTotal: (state, { payload }: PayloadAction<BudgetFind>) => {
			const batch = getCurrentBatch(state);

			const { income, expense } = batch;
			batch.total = totalBudget([...income, ...expense]);
		},

		changedBatch: (state, { payload }: PayloadAction<{ batchId: string }>) => {
			state.selectedBatch = payload.batchId;
		},

		createdBatch: (state, { payload }: PayloadAction<Batch>) => {
			state.batches.push(payload);
			state.selectedBatch = payload.id;
		}
	}
});

export const {
	addedBudget,
	removedBudget,
	updatedTotal,
	changedBatch,
	createdBatch
} = budgetSlice.actions;

export const selectBatch = (state: RootState) => {
	return getCurrentBatch(state.budget);
};

export const selectBudget = (param: BudgetFind) => (state: RootState) => {
	return findBudget(param, state.budget);
};

export const selectBatchTotal = (state: RootState) => {
	return getCurrentBatch(state.budget).total;
};

export const selectBatchId = (state: RootState) => state.budget.selectedBatch;

export const selectBatchList = (state: RootState): SelectOption[] => {
	return state.budget.batches.map(batch => ({
		label: batch.name,
		value: batch.id
	}));
};

export default budgetSlice.reducer;
