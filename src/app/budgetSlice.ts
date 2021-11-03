import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getItem, sumItem } from "../utils/budgetItem";
import { getBatch, createBatch, getTotal } from "../utils/batch";
import uid from "../utils/id";
import { getBudget } from "../utils/budget";

const batch = createBatch("batch 1", { start: new Date(), end: new Date() });

const budget: Budget = {
	id: uid(),
	name: "default",
	batches: [batch],
	selectedBatch: batch.id
};

export const initialState: Budgets = {
	budgets: [budget],
	selectedBudget: budget.id
};

const budgetSlice = createSlice({
	name: "budgets",

	initialState,

	reducers: {
		itemAdded: (state, { payload }: PayloadAction<BudgetItem>) => {
			const batch = getBatch(state);

			if (!batch) return state;

			const { type, description, amounts } = payload;

			const item = getItem({ type, description }, state, batch);

			if (item) {
				item.amounts = [...item.amounts, ...amounts];
			} else {
				batch[type].push(payload);
			}

			batch.total = getTotal(batch);
		},

		itemRemoved: (state, { payload }: PayloadAction<ItemRemove>) => {
			const {
				budget: { id, type, description },
				amountId
			} = payload;

			const batch = getBatch(state);

			if (!batch) return state;

			const item = getItem({ type, id, description }, state, batch);

			if (item.amounts.length > 1) {
				item.amounts = item.amounts.filter(a => a.id !== amountId);
			} else {
				batch[type] = batch[type].filter(b => b.id !== id);
			}

			batch.total = getTotal(batch);
		},

		totalUpdated: (state, { payload }: PayloadAction<ItemFind>) => {
			const batch = getBatch(state);
			batch.total = sumItem([getItem(payload, state, batch)]);
		},

		batchChanged: (state, { payload }: PayloadAction<{ batchId: string }>) => {
			getBudget(state).selectedBatch = payload.batchId;
		},

		batchCreated: (state, { payload }: PayloadAction<Batch>) => {
			const budget = getBudget(state);
			budget.batches.push(payload);
			budget.selectedBatch = payload.id;
		}
	}
});

export const {
	itemAdded,
	itemRemoved,
	totalUpdated,
	batchChanged,
	batchCreated
} = budgetSlice.actions;

export const selectBatch = (state: RootState) => {
	return getBatch(state.budgets);
};

export const selectItem = (param: ItemFind) => (state: RootState) => {
	return getItem(param, state.budgets);
};

export const selectBatchTotal = (state: RootState) => {
	return getBatch(state.budgets).total;
};

export const selectBatchId = (state: RootState) => getBatch(state.budgets).id;

export const selectBatchList = (state: RootState): SelectOption[] => {
	return getBudget(state.budgets).batches.map(batch => ({
		label: batch.name,
		value: batch.id
	}));
};

export default budgetSlice.reducer;
