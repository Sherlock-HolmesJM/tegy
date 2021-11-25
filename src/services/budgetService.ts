import { store } from "../model/store";
import strip from "../utils/striper";
import { getBatch } from "./batchService";
import { getPaths, getWriter, get } from "./httpService";
import log from "./logger";
import { updateHeads } from "./stateService";
import budgetUtil from "../utils/budget";
import { User } from "@firebase/auth";
import { getCurrentUser } from "./authService";

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

export const patchBudget = async (budget: Budget, cb: Callback) => {
	try {
		const { heads, budgetList } = store.getState().budgets;
		const writer = getWriter();
		const path = getPaths({ budget: heads.budget });

		// update budget
		writer.update(strip(budget, ["batches"]), path);

		// update budgetList
		writer.update({ budgetList }, [getCurrentUser().uid]);

		await writer.commit();
		cb.success && cb.success();
	} catch (error) {
		log.error(error);
		cb?.error && cb.error();
	}
};

export const removeBudget = async (budget: Budget, cb: Callback) => {
	try {
		const writer = getWriter();

		const path = getPaths({
			budget: budget.id
		});

		budget.batches.forEach(batch => {
			const { id, income, expense } = batch;

			// remove all the items in batch
			[...expense, ...income].forEach(item => {
				writer.delete([...path, "batches", id, item.type, item.id]);
			});

			// remove batch
			writer.delete([...path, "batches", id]);
		});

		// remove budget
		writer.delete(path);

		const { heads, budgetList } = store.getState().budgets;

		// update budgetList and heads
		writer.update({ budgetList, heads }, [getCurrentUser().uid]);

		await writer.commit();
		cb.success && cb.success();
	} catch (error) {
		log.error(error);
		cb?.error && cb.error();
	}
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

const budgetService = { getBudget, postBudget, patchBudget, removeBudget };

export default budgetService;
