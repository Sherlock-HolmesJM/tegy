export const declare = "declare";

declare global {
	interface Window {
		border: (color?: string) => string;
		theme: Theme;
	}
	interface Theme {
		primary: string;
		secondary: string;
	}

	type ThemeField = "primary" | "secondary";

	interface Budgets {
		budgets: Budget[];
		selectedBudget: string;
	}

	interface Budget {
		id: string;
		name: string;
		batches: Batch[];
		selectedBatch: string;
	}

	interface Batch {
		id: string;
		name: string;
		income: BudgetItem[];
		expense: BudgetItem[];
		total: BatchTotal;
		date: {
			start: number;
			end: number;
		};
	}

	interface BatchTotal {
		income: number;
		expense: number;
	}

	interface BudgetItem {
		id: string;
		description: string;
		type: ItemType;
		amounts: { amount: number; date: number; id: string }[];
	}

	type ItemType = "income" | "expense";

	interface ItemRemove {
		budget: BudgetItem;
		amountId: string;
	}

	interface ItemFind {
		type: ItemType;
		id?: string;
		description?: string;
	}

	interface SelectOption {
		value: string;
		label: string;
	}
}
