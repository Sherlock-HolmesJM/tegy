export const getBudget = (budgets: Budgets) => {
	return budgets.budgets.find(b => b.id === budgets.selectedBudget);
};
