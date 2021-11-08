import { store } from "../model/store";
import { setLoading } from "../model/uiSlice";
import strip from "../utils/striper";
import { getCurrentUser } from "./authService";
import { get, getList, getPathSegments, getWriter } from "./httpService";

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
		const writer = getWriter();

		const heads = { ...state.heads, batch: batch.id };
		const batchList = [...state.batchList, { id: batch.id, name: batch.name }];

		writer.set(strip(batch, ["income", "expense"]), getPathSegments(heads));
		writer.update({ heads, batchList }, [getCurrentUser().uid]);

		await writer.commit();
		cb.onSuccess();
	} catch (error) {
		console.log(error.message);
		store.dispatch(setLoading(0));
	}
};

const batchService = { createBatch, getBatch };

export default batchService;
