import { store } from "../model/store";
import strip from "../utils/striper";
import { getCurrentUser } from "./authService";
import { getPathSegments, getWriter } from "./httpService";
import log from "./logger";

export const createBudget = (budget: Budget) => {
	try {
		const { budgetList, heads } = store.getState().budgets;

		const writer = getWriter();

		writer.update({ heads, budgetList }, [getCurrentUser().uid]);

		const paths = getPathSegments(strip(heads, ["batch"]));

		writer.set(strip(budget, ["batches"]), paths);
	} catch (error) {
		log.error(error);
	}
};
