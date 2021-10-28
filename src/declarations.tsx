export const declare = "declare";

declare global {
	interface Window {
		border: (color?: string) => string;
		theme: Theme;
	}

	type ThemeField = "primary" | "secondary";

	interface Theme {
		primary: string;
		secondary: string;
	}

	type BudgetType = "income" | "expense";

	interface Budget {
		id: string;
		description: string;
		type: BudgetType;
		amounts: { amount: number; date: number }[];
	}

	interface SelectBudget {
		id: string;
		type: BudgetType;
	}

	interface BudgetTotal {
		income: number;
		expense: number;
	}

	interface BudgetSlice {
		income: Budget[];
		expense: Budget[];
		total: BudgetTotal;
	}
}
