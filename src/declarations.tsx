export const declare = "declare";

declare global {
	interface Window {
		border: (color?: string) => string;
		color: Theme;
	}

	interface Theme {
		primary: string;
		secondary: string;
	}
}
