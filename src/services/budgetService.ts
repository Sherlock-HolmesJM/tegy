import { store } from "../model/store";
import strip from "../utils/striper";
import { getBatch } from "./batchService";
import { getPaths, getWriter, get } from "./httpService";
import log from "./logger";
import { updateHeads } from "./stateService";
import budgetUtil from "../utils/budget";
import { User } from "@firebase/auth";

// export const postBudget = (budget: Budget) => {
// 	try {
// 		const { budgetList, heads } = store.getState().budgets;

// 		const writer = getWriter();

// 		writer.update({ heads, budgetList }, [getCurrentUser().uid]);

// 		const paths = getPaths(strip(heads, ["batch"]));

// 		writer.set(strip(budget, ["batches"]), paths);
// 	} catch (error) {
// 		log.error(error);
// 	}
// };

export const postBudget = async (user: User, cb?: Callback) => {
	try {
		const writer = getWriter();
		const state = store.getState().budgets;

		const { heads } = state;
		const budget = budgetUtil.getBudget(state);
		const batch = budget.batches[0];

		writer.set(strip(state, ["budgets"]), [user.uid]);

		let pathSegments = getPaths({ budget: heads.budget });
		writer.set(strip(budget, ["batches"]), pathSegments);

		pathSegments = getPaths(heads);
		writer.set(strip(batch, ["income", "expense"]), pathSegments);

		await writer.commit();
		cb?.success && cb.success();
	} catch (err) {
		log.error(err);
		cb?.error && cb.error();
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

const budgetService = { getBudget, postBudget, patchBudget };

export default budgetService;
