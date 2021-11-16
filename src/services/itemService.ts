import { store } from "../model/store";
import { getBatch } from "../utils/batch";
import { getItem } from "../utils/budgetItem";
import { getPathSegments, getWriter } from "./httpService";
import log from "./logger";

export const addItem = async (payload: BudgetItem, cb: Callback) => {
	try {
		const state = store.getState().budgets;
		const { heads } = state;
		const batch = getBatch(state);

		const { type, description } = payload;

		let item = getItem({ type, description }, state, batch);

		const writer = getWriter();

		let pathSegments = getPathSegments(heads);
		writer.update({ total: batch.total }, pathSegments);

		pathSegments = [...pathSegments, item.type, item.id];
		writer.set(item, pathSegments);

		await writer.commit();
	} catch (error) {
		log.error(error);
		cb.error && cb.error();
	}
};

export const deleteItem = async (payload: BudgetItem, cb: Callback) => {
	try {
		const state = store.getState().budgets;

		const { id, type, description } = payload;

		const batch = getBatch(state);
		const item = getItem({ type, id, description }, state, batch);

		const writer = getWriter();
		const pathSegments = [...getPathSegments(state.heads), type, id];

		if (item) writer.update(item, pathSegments);
		else writer.delete(pathSegments);

		writer.update({ total: batch.total }, getPathSegments(state.heads));

		await writer.commit();
	} catch (error) {
		cb.error && cb.error();
		log.error(error);
	}
};

const itemService = { addItem, deleteItem };

export default itemService;
