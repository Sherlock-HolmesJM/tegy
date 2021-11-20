import { store } from "../model/store";
import { getBudget } from "../utils/budget";
import strip from "../utils/striper";
import { getCurrentUser } from "./authService";
import { get, getList, getPathSegments, getWriter } from "./httpService";
import log from "./logger";

export const getBatch = async (heads?: Heads): Promise<Batch> => {
	heads = heads ?? store.getState().budgets.heads;

	const paths = getPathSegments(heads);
	const batch = await get<CdBatch>(...paths);
	const income = await getList<BudgetItem>(...paths, "income");
	const expense = await getList<BudgetItem>(...paths, "expense");

	return { ...batch, income, expense };
};

export const createBatch = async (batch: Batch, cb: Callback) => {
	try {
		const state = store.getState().budgets;
		const { batchList } = getBudget(state);
		const writer = getWriter();
		const { heads } = state;

		writer.update({ heads }, [getCurrentUser().uid]);
		writer.update({ batchList }, getPathSegments({ budget: heads.budget }));
		writer.set(strip(batch, ["income", "expense"]), getPathSegments(heads));

		await writer.commit();
		cb.success && cb.success();
	} catch (error) {
		log.error(error);
		cb.error && cb.error();
	}
};

const batchService = { createBatch, getBatch };

export default batchService;
