import uid from "./id";

export const createBatch = (
	name: string,
	date: { start: Date; end: Date }
): Batch => {
	return {
		id: uid(),
		name,
		date: {
			start: date.start.getTime(),
			end: date.end.getTime()
		},
		income: [],
		expense: [],
		total: {
			income: 0,
			expense: 0
		}
	};
};

export const getCurrentBatch = ({ selectedBatch, batches }: BudgetSlice) =>
	batches.find(b => b.id === selectedBatch);
