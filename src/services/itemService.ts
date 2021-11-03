export const itemPath = (
	userId: string,
	budgetId: string,
	batchId: string,
	itemId: string
) => `/users/${userId}/budgets/${budgetId}/batches/${batchId}/items/${itemId}`;
