import { store } from "../model/store";
import { getBatch } from "../utils/batch";
import { getItem, sumItem } from "../utils/budgetItem";
import { getPathSegments, getWriter } from "./httpService";
import log from "./logger";

export const addItem = async (bItem: BudgetItem, cb: Callback) => {
	try {
		const state = store.getState().budgets;
		const { heads } = state;
		const batch = getBatch(state);

		const { type, description, amounts } = bItem;

		let item = getItem({ type, description }, state, batch);
		const total = sumItem([...batch.income, ...batch.expense, bItem]);

		if (!item) item = bItem;
		else item = { ...item, amounts: [...item.amounts, ...amounts] };

		const writer = getWriter();

		let pathSegments = getPathSegments(heads);
		writer.update({ total }, pathSegments);

		pathSegments = [...pathSegments, item.type, item.id];
		writer.set(item, pathSegments);

		await writer.commit();
		cb.success();
	} catch (error) {
		log(error);
	}
};

export const deleteItem = async (
	payload: { item: BudgetItem; amountId: string },
	cb: Callback
) => {
	try {
		const state = store.getState().budgets;
		const { item: bItem, amountId } = payload;
		const { id, type, description } = bItem;

		let batch = { ...getBatch(state) };
		let item = { ...getItem({ type, id, description }, state, batch) };
		batch[type] = batch[type].filter(i => i.id !== item.id);

		const writer = getWriter();
		const pathSegments = [...getPathSegments(state.heads), type, id];

		let total = {};

		if (item.amounts.length > 1) {
			item.amounts = item.amounts.filter(a => a.id !== amountId);
			total = sumItem([...batch.income, ...batch.expense, item]);

			writer.update(item, pathSegments);
		} else {
			total = sumItem([...batch.income, ...batch.expense]);

			writer.delete(pathSegments);
		}

		writer.update({ total }, getPathSegments(state.heads));

		await writer.commit();
		cb.success();
	} catch (error) {
		log(error);
	}
};

const itemService = { addItem, deleteItem };

export default itemService;
