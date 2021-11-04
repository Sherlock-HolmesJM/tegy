import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getItem, sumItem } from "../utils/budgetItem";
import { getBatch, createBatch, getTotal } from "../utils/batch";
import { getBudget } from "../utils/budget";

const batch = createBatch(
	"batch 1",
	{ start: new Date(), end: new Date() },
	"u18882929838383id"
);

const budget: Budget = {
	id: "u93838938838383id",
	name: "default",
	batches: [batch]
};

export const initialState: Budgets = {
	budgets: [budget],
	heads: {
		budget: budget.id,
		batch: batch.id
	}
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
			state.heads.batch = payload.batchId;
		},

		createdBatch: (state, { payload }: PayloadAction<Batch>) => {
			const budget = getBudget(state);
			budget.batches.push(payload);
			state.heads.batch = payload.id;
		}
	}
});

export const {
	itemAdded,
	itemRemoved,
	totalUpdated,
	batchChanged,
	createdBatch
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

export const selectBatchId = (state: RootState) => state.budgets.heads.batch;

export const selectBatchList = (state: RootState): SelectOption[] => {
	return getBudget(state.budgets).batches.map(batch => ({
		label: batch.name,
		value: batch.id
	}));
};

export default budgetSlice.reducer;
