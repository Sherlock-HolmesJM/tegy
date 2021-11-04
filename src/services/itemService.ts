import { itemAdded, itemRemoved } from "../app/budgetSlice";
import { AppDispatch } from "../app/store";
import { toggledLoading } from "../app/uiSlice";
import { getBatch } from "../utils/batch";
import { getItem, sumItem } from "../utils/budgetItem";
import { getPathSegments, getWriter } from "./httpService";

export const addItem = async (
	bItem: BudgetItem,
	state: Budgets,
	dispatch: AppDispatch
) => {
	try {
		dispatch(toggledLoading(true));
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
		dispatch(itemAdded(bItem));
	} catch (error) {
		console.log(error.message);
	}
	dispatch(toggledLoading(false));
};

export const deleteItem = async (
	bItem: BudgetItem,
	amountId: string,
	state: Budgets,
	dispatch: AppDispatch
) => {
	try {
		dispatch(toggledLoading(true));
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
		dispatch(itemRemoved({ budget: bItem, amountId }));
	} catch (error) {
		console.log(error.message);
	}
	dispatch(toggledLoading(false));
};

const itemService = { addItem, deleteItem };

export default itemService;
