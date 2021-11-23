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

export const postBatch = async (batch: Batch, cb: Callback) => {
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

export const patchBatch = async (batch: Batch, cb: Callback) => {
	try {
		const state = store.getState().budgets;
		const { batchList } = getBudget(state);
		const writer = getWriter();
		const { heads } = state;

		writer.update({ batchList }, getPathSegments({ budget: heads.budget }));
		writer.update(strip(batch, ["income", "expense"]), getPathSegments(heads));

		await writer.commit();

		cb.success && cb.success();
	} catch (error) {
		cb.error && cb.error();
		log.error(error);
	}
};

export const removeBatch = async (batch: Batch, cb: Callback) => {
	try {
		const state = store.getState().budgets;
		const { heads } = state;
		const { batchList, head } = getBudget(state);
		const writer = getWriter();

		const path = getPathSegments({ ...heads, batch: batch.id });

		[...batch.income, ...batch.expense].forEach(item => {
			writer.delete([...path, item.type, item.id]);
		});

		writer.delete(path);

		writer.update(
			{ batchList, head },
			getPathSegments({ budget: heads.budget })
		);

		writer.update({ heads }, [getCurrentUser().uid]);

		await writer.commit();

		cb.success && cb.success();
	} catch (error) {
		cb.error && cb.error();
		log.error(error);
	}
};

const batchService = { postBatch, getBatch, patchBatch, removeBatch };

export default batchService;
