export const totalBudget = (budgets: Budget[]) => {
	return budgets.reduce(
		(acc, { type, amounts }) => ({
			...acc,
			[type]: acc[type] + amounts.reduce((acc, next) => acc + next.amount, 0)
		}),
		{ income: 0, expense: 0 }
	);
};
