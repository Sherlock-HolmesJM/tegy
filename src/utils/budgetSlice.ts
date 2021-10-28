export const getCurrentBatch = ({ currentBatchId, batches }: BudgetSlice) =>
	batches.find(b => b.id === currentBatchId);

export const findBudget = (param: BudgetFind, budgetSlice: BudgetSlice) => {
	const batch = getCurrentBatch(budgetSlice);

	const { id, type, description } = param;

	const list = batch[type] ?? [];

	return description
		? list.find(b => b.description === description)
		: id
		? list.find(b => b.id === id)
		: undefined;
};
