import { getBudget } from "./budget";
import { sumItem } from "./budgetItem";
import uid from "./id";

export const getBatch = (budgets: Budgets) => {
	const budget = getBudget(budgets);

	if (!budget) return undefined;

	const { batches } = budget;
	return batches.find(b => b.id === budgets.heads.batch);
};

export const getTotal = (batch: Batch) => {
	const { income, expense } = batch;
	return sumItem([...income, ...expense]);
};

export const createBatch = (
	name: string,
	date: { start: Date; end: Date },
	id?: string
): Batch => {
	return {
		id: id || uid(),
		name,
		date: {
			start: date.start.getTime(),
			end: date.end.getTime()
		},
		income: [],
		expense: [],
		total: {
			income: 0,
			expense: 0
		}
	};
};
