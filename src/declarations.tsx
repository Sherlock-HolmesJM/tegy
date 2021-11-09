export const declare = "declare";

declare global {
	interface Window {
		border: (color?: string) => string;
		theme: Theme;
	}

	interface Callback {
		success?: () => void;
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

	interface Budgets {
		budgets: Budget[];
		budgetList: { id: string; name: string }[];
		heads: Heads;
	}

	type Heads = {
		budget: string;
		batch: string;
	};

	interface Budget {
		id: string;
		name: string;
		batches: Batch[];
		batchList: { id: string; name: string }[];
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
