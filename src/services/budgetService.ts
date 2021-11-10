import { store } from "../model/store";
import strip from "../utils/striper";
import { getCurrentUser } from "./authService";
import { getPathSegments, getWriter } from "./httpService";
import log from "./logger";

export const createBudget = (budget: Budget) => {
	try {
		const { budgetList: blist } = store.getState().budgets;

		const heads: Heads = { batch: budget.batches[0].id, budget: budget.id };
		const budgetList = [...blist, { id: budget.id, name: budget.name }];

		const writer = getWriter();

		writer.update({ heads, budgetList }, [getCurrentUser().uid]);

		const paths = getPathSegments(strip(heads, ["batch"]));

		writer.set(strip(budget, ["batches"]), paths);
	} catch (error) {
		log.error(error);
	}
};
