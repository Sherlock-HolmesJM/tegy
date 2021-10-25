export const declare = "declare";

declare global {
	interface Window {
		border: (color?: string) => string;
	}
}
