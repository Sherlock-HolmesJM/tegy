import strip from "../utils/striper";
import { getPathSegments, getWriter } from "./httpService";

const createBatch = async (
	batch: Batch,
	state: Budgets,
	onSuccess: () => void,
	onError: () => void
) => {
	try {
		const writer = getWriter();

		const heads = { ...state.heads, batch: batch.id };

		writer.set(strip(batch, ["income", "expense"]), getPathSegments(heads));
		writer.update({ heads }, getPathSegments({ budget: heads.budget }));

		await writer.commit();
		onSuccess();
	} catch (error) {
		console.log(error.message);
		onError();
	}
};

const batchService = { createBatch };

export default batchService;
