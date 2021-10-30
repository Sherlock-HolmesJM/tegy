import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { totalBudget } from "../utils/budget";
import { RootState } from "./store";
import { findBudget, getCurrentBatch } from "../utils/budgetSlice";
import uid from "../utils/id";

const batch: Batch = {
	id: Date.now() + "",
	name: "batch 1",
	income: [],
	expense: [],
	total: {
		income: 0,
		expense: 0
	},
	date: {
		start: Date.now(),
		end: Date.now()
	}
};

const batch2: Batch = {
	id: uid(),
	name: "batch 2",
	income: [],
	expense: [],
	total: {
		income: 0,
		expense: 0
	},
	date: {
		start: Date.now(),
		end: Date.now()
	}
};

const initialState: BudgetSlice = {
	id: uid(),
	name: "nepa_bill",
	currentBatchId: batch.id,
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

		updatedTotal: (state, { payload }: PayloadAction<BudgetFind>) => {
			const batch = getCurrentBatch(state);

			const { income, expense } = batch;
			batch.total = totalBudget([...income, ...expense]);
		},

		changedBatch: (state, { payload }: PayloadAction<{ batchId: string }>) => {
			state.currentBatchId = payload.batchId;
		},

		createdBatch: (state, { payload }: PayloadAction<Batch>) => {
			state.batches.push(payload);
			state.currentBatchId = payload.id;
		}
	}
});

export const { addedBudget, updatedTotal, changedBatch, createdBatch } =
	budgetSlice.actions;

export const selectBatch = (state: RootState) => {
	return getCurrentBatch(state.budget);
};

export const selectBudget = (param: BudgetFind) => (state: RootState) => {
	return findBudget(param, state.budget);
};

export const selectBatchTotal = (state: RootState) => {
	return getCurrentBatch(state.budget).total;
};

export const selectCurrentBatchId = (state: RootState) =>
	state.budget.currentBatchId;

export const selectBatchList = (state: RootState): SelectOption[] => {
	return state.budget.batches.map(batch => ({
		label: batch.name,
		value: batch.id
	}));
};

export default budgetSlice.reducer;
