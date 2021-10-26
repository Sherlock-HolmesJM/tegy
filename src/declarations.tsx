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

	type BudgetType = "inc" | "exp";
}
