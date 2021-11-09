import { store } from "../model/store";
import { getBudget } from "../utils/budget";
import strip from "../utils/striper";
import { getCurrentUser } from "./authService";
import { get, getList, getPathSegments, getWriter } from "./httpService";
import log from "./logger";

export const getBatch = async () => {
	const { heads } = store.getState().budgets;
	const paths = getPathSegments(heads);
	const batch = await get<Batch>(...paths);
	const income = await getList<BudgetItem>(...paths, "income");
	const expense = await getList<BudgetItem>(...paths, "expense");

	return { ...batch, income, expense };
};

export const createBatch = async (batch: Batch, cb: Callback) => {
	try {
		const state = store.getState().budgets;
		const budget = getBudget(state);
		const writer = getWriter();

		const heads = { ...state.heads, batch: batch.id };
		const batchList = [...budget.batchList, { id: batch.id, name: batch.name }];

		writer.update({ heads }, [getCurrentUser().uid]);
		writer.update({ batchList }, getPathSegments({ budget: heads.budget }));
		writer.set(strip(batch, ["income", "expense"]), getPathSegments(heads));

		await writer.commit();
		cb.success();
	} catch (error) {
		log(error);
	}
};

const batchService = { createBatch, getBatch };

export default batchService;
