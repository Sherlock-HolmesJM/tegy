import { User } from "@firebase/auth";
import { store } from "../model/store";
import { getBudget } from "../utils/budget";
import { strip } from "../utils/striper";
import { getCurrentUser } from "./authService";
import { getBatch } from "./batchService";
import { getPathSegments, getWriter, get, getList } from "./httpService";
import log from "./logger";

export const updateHeads = async ({ batch, budget }: Heads, cb?: Callback) => {
	try {
		const writer = getWriter();

		writer.update({ heads: { batch, budget } }, [getCurrentUser().uid]);
		writer.update({ head: batch }, getPathSegments({ budget: budget }));

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

		let pathSegments = getPathSegments({ budget: heads.budget });
		writer.set(strip(budget, ["batches"]), pathSegments);

		pathSegments = getPathSegments(heads);
		writer.set(strip(batch, ["income", "expense"]), pathSegments);

		await writer.commit();
		cb?.success && cb.success();
	} catch (err) {
		log.error(err);
		cb?.error && cb.error();
	}
};

export const loadBudget = async (id: string, cb: Callback) => {
	try {
		const data = await get<CdBudget>(...getPathSegments({ budget: id }));

		const heads = { batch: data.head, budget: id };

		const batch = await getBatch(heads);

		const budget: Budget = { ...data, batches: [batch] };

		await updateHeads(heads);

		cb?.success && cb.success(budget);
	} catch (error) {
		log.error(error);
	}
};
