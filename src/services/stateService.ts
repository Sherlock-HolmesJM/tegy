import { User } from "@firebase/auth";
import { store } from "../model/store";
import { getBudget } from "../utils/budget";
import { strip } from "../utils/striper";
import { getCurrentUser } from "./authService";
import { getPaths, getWriter, get, getList } from "./httpService";
import log from "./logger";

export const updateHeads = async ({ batch, budget }: Heads, cb?: Callback) => {
	try {
		const writer = getWriter();

		writer.update({ heads: { batch, budget } }, [getCurrentUser().uid]);
		writer.update({ head: batch }, getPaths({ budget: budget }));

		await writer.commit();
	} catch (error) {
		log.error(error);
		cb?.error && cb.error();
	}
};

export const loadState = async (
	user: User,
	success: (budgets: Budgets) => void
) => {
	try {
		const state = await get<Budgets>(user.uid);

		if (!state) throw Error("not found");

		const { heads } = state;

		let budget = await get<Budget>(...getPaths({ budget: heads.budget }));

		const pathsegments = getPaths(heads);

		let batch = await get<Batch>(...pathsegments);
		const income = await getList<BudgetItem>(...pathsegments, "income");
		const expense = await getList<BudgetItem>(...pathsegments, "expense");

		batch = { ...batch, income, expense };
		budget = { ...budget, batches: [batch] };

		success({ ...state, budgets: [budget] });
	} catch (error) {
		if (error.message === "not found") {
			setBudget(user);
			log.neutral();
		} else log.error(error);
	}
};

export const setBudget = async (user: User, cb?: Callback) => {
	try {
		const writer = getWriter();
		const state = store.getState().budgets;

		const { heads } = state;
		const budget = getBudget(state);
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
