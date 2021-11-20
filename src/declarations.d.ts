export const declare = "declare";

declare global {
	interface Window {
		border: (color?: string) => string;
		theme: Theme;
	}

	interface Callback {
		success?: (value?: T) => void;
		error?: () => void;
	}

	interface Theme {
		primary: string;
		secondary: string;
		gray: string;
	}

	type ThemeField = "primary" | "secondary";

	type Writer = {
		set: (object: any, pathSegments: string[]) => any;
		update: (object: any, pathSegments: string[]) => any;
		delete: (pathSegments: string[]) => any;
		commit: () => Promise<void>;
	};

	type Heads = {
		budget: string;
		batch: string;
	};

	interface CdBudgets {
		budgetList: { id: string; name: string }[];
		heads: Heads;
	}

	interface Budgets extends CdBudgets {
		budgets: Budget[];
	}

	interface CdBudget {
		id: string;
		name: string;
		batchList: { id: string; name: string }[];
		head: string; // id of the current batch -> as in, head batch
	}

	interface Budget extends CdBudget {
		batches: Batch[];
	}

	interface CdBatch {
		id: string;
		name: string;
		total: BatchTotal;
		date: {
			start: number;
			end: number;
		};
	}

	interface Batch extends CdBatch {
		income: BudgetItem[];
		expense: BudgetItem[];
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
