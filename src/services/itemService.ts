import { itemAdded } from "../app/budgetSlice";
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

export const deleteItem = () => {};

const itemService = { addItem, deleteItem };

export default itemService;
