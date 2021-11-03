import { getBatch } from "./batch";

export const getItem = (param: ItemFind, budgets: Budgets, batch?: Batch) => {
	const b = batch ? batch : getBatch(budgets);

	const { type, description, id } = param;

	const list = b[type] ?? [];

	return id
		? list.find(b => b.id === id)
		: description
		? list.find(b => b.description === description)
		: undefined;
};

export const toBudgetList = (budget: BudgetItem): BudgetItem[] => {
	budget = JSON.parse(JSON.stringify(budget));

	return budget.amounts
		.sort((a, b) => b.amount - a.amount)
		.map(amount => ({
			...budget,
			amounts: [amount]
		}));
};

export const sumItem = (item: BudgetItem[]): BatchTotal => {
	return item.reduce(
		(acc, { type, amounts }) => ({
			...acc,
			[type]: acc[type] + amounts.reduce((acc, next) => acc + next.amount, 0)
		}),
		{ income: 0, expense: 0 }
	);
};