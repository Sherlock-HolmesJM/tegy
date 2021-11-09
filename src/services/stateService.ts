import { User } from "@firebase/auth";
import { store } from "../model/store";
import { strip } from "../utils/striper";
import { getCurrentUser } from "./authService";
import { getPathSegments, getWriter, get, getList } from "./httpService";
import log from "./logger";

export const updateHeads = async (heads: Heads, cb: Callback) => {
	try {
		const writer = getWriter();
		writer.update({ heads }, [getCurrentUser().uid]);
		await writer.commit();
	} catch (error) {
		log(error);
		cb.error();
	}
};

export const getAppFromDB = async (
	user: User,
	success: (budgets: Budgets) => void
) => {
	try {
		const state = await get<Budgets>(user.uid);

		if (!state) throw Error("not found");

		const { heads } = state;

		let budget = await get<Budget>(
			...getPathSegments({ budget: heads.budget })
		);

		const pathsegments = getPathSegments(heads);

		let batch = await get<Batch>(...pathsegments);
		const income = await getList<BudgetItem>(...pathsegments, "income");
		const expense = await getList<BudgetItem>(...pathsegments, "expense");

		batch = { ...batch, income, expense };
		budget = { ...budget, batches: [batch] };

		success({ ...state, budgets: [budget] });
	} catch (error) {
		if (error.message === "not found") setDB(user);
		log(error);
	}
};

export const setDB = async (user: User, cb?: () => void) => {
	try {
		const state = store.getState().budgets;
		console.log(state, "state");

		const writer = getWriter();
		const { budgets, heads } = state;

		writer.set(strip(state, ["budgets"]), [user.uid]);

		let pathSegments = getPathSegments({ budget: heads.budget });

		const [budget] = budgets;
		writer.set(strip(budget, ["batches"]), pathSegments);

		pathSegments = getPathSegments(heads);

		const batchObj = strip(budget.batches[0], ["income", "expense"]);
		writer.set(batchObj, pathSegments);

		writer.commit();
	} catch (error) {
		log(error);
		cb && cb();
	}
};
