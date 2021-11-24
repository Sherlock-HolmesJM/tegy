export const getBudget = (budgets: Budgets) => {
	return budgets.budgets.find(b => b.id === budgets.heads.budget);
};

const budgetUtil = { getBudget };

export default budgetUtil;
