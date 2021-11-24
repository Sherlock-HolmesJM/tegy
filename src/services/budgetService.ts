import { store } from "../model/store";
import strip from "../utils/striper";
import { getCurrentUser } from "./authService";
import { getBatch } from "./batchService";
import { getPaths, getWriter, get } from "./httpService";
import log from "./logger";
import { updateHeads } from "./stateService";

export const postBudget = (budget: Budget) => {
	try {
		const { budgetList, heads } = store.getState().budgets;

		const writer = getWriter();

		writer.update({ heads, budgetList }, [getCurrentUser().uid]);

		const paths = getPaths(strip(heads, ["batch"]));

		writer.set(strip(budget, ["batches"]), paths);
	} catch (error) {
		log.error(error);
	}
};

export const patchBudget = async (cb: Callback) => {
	try {
	} catch (error) {}
};

export const getBudget = async (id: string, cb: Callback) => {
	try {
		const data = await get<CdBudget>(...getPaths({ budget: id }));

		const heads = { batch: data.head, budget: id };

		const batch = await getBatch(heads);

		const budget: Budget = { ...data, batches: [batch] };

		await updateHeads(heads);

		cb?.success && cb.success(budget);
	} catch (error) {
		log.error(error);
	}
};

const budgetService = { getBudget, postBudget };

export default budgetService;
