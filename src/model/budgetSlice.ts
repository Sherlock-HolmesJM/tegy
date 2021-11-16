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
	batches: [batch],
	batchList: [{ id: batch.id, name: batch.name }],
	head: batch.id
};

export const initialState: Budgets = {
	budgets: [budget],
	heads: {
		budget: budget.id,
		batch: budget.head
	},
	budgetList: [{ id: budget.id, name: budget.name }]
};

const budgetSlice = createSlice({
	name: "budgets",

	initialState,

	reducers: {
		stateLoaded: (state, { payload }: PayloadAction<Budgets>) => {
			return payload;
		},

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

		itemRemoved: (state, { payload }: PayloadAction<BudgetItem>) => {
			const { id, type, description, amounts } = payload;
			const amountId = amounts[0].id;

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

		headsUpdated: (state, { payload }: PayloadAction<Heads>) => {
			state.heads = payload;
			getBudget(state).head = payload.batch;
		},

		batchCreated: (state, { payload }: PayloadAction<Batch>) => {
			const budget = getBudget(state);
			budget.batches.push(payload);
			state.heads.batch = payload.id;
			budget.batchList.push({ id: payload.id, name: payload.name });
		},

		batchLoaded: (state, { payload }: PayloadAction<Batch>) => {
			getBudget(state).batches.push(payload);
		},

		budgetCreated: (state, { payload }: PayloadAction<Budget>) => {
			state.budgets.push(payload);

			state.heads = {
				batch: payload.batches[0].id,
				budget: payload.id
			};

			state.budgetList.push({ id: payload.id, name: payload.name });
		},

		budgetLoaded: (state, { payload }: PayloadAction<Budget>) => {
			const { id, head } = payload;

			state.heads = { budget: id, batch: head };
			state.budgets.push(payload);
		}
	}
});

export const {
	itemAdded,
	itemRemoved,
	totalUpdated,
	headsUpdated,
	batchCreated,
	batchLoaded,
	stateLoaded,
	budgetCreated,
	budgetLoaded
} = budgetSlice.actions;

export const selectBatch = (state: RootState) => {
	return getBatch(state.budgets);
};

export const selectItem = (param: ItemFind) => (state: RootState) => {
	return getItem(param, state.budgets);
};

export const selectBatchTotal = (state: RootState) => {
	return getBatch(state.budgets)?.total ?? { income: 0, expense: 0 };
};

export const selectHeads = (state: RootState) => state.budgets.heads;

export const selectBatchList = (state: RootState): SelectOption[] => {
	return (
		getBudget(state.budgets)?.batchList.map(batch => ({
			label: batch.name,
			value: batch.id
		})) ?? []
	);
};

export const selectBudget = (state: RootState) => getBudget(state.budgets);

export const selectBudgetList = (state: RootState) => state.budgets.budgetList;

export default budgetSlice.reducer;
