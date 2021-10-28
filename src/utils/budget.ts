export const toBudgetList = (budget: Budget): Budget[] => {
	budget = JSON.parse(JSON.stringify(budget));

	return budget.amounts
		.sort((a, b) => b.amount - a.amount)
		.map(amount => ({
			...budget,
			amounts: [amount]
		}));
};

export const totalBudget = (budgets: Budget[]): BudgetTotal => {
	return budgets.reduce(
		(acc, { type, amounts }) => ({
			...acc,
			[type]: acc[type] + amounts.reduce((acc, next) => acc + next.amount, 0)
		}),
		{ income: 0, expense: 0 }
	);
};
