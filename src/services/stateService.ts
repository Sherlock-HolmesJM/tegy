import { User } from "@firebase/auth";
import { getCurrentUser } from "./authService";
import { postBudget } from "./budgetService";
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

export const getState = async (
	user: User,
	success: (budgets: Budgets) => void
) => {
	try {
		const state = await get<CdBudgets>(user.uid);

		if (!state) throw Error("not found");

		const { heads } = state;

		let budget = await get<Budget>(...getPaths({ budget: heads.budget }));

		const pathsegments = getPaths(heads);

		let batch = await get<Batch>(...pathsegments);
		const income = await getList<BudgetItem>(...pathsegments, "income");
		const expense = await getList<BudgetItem>(...pathsegments, "expense");

		batch = { ...batch, income, expense };
		budget = { ...budget, batches: [batch] };

		success({ ...state, budgets: [budget], descriptions: [] });
	} catch (error) {
		if (error.message === "not found") {
			postBudget(user);
			log.neutral();
		} else log.error(error);
	}
};
