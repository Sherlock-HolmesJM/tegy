import { doc } from "@firebase/firestore";
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
	dispatch(toggledLoading(true));
	try {
		const { heads } = state;
		const batch = getBatch(state);

		const { type, description, amounts } = bItem;

		let item = getItem({ type, description }, state, batch);
		const total = sumItem([...batch.income, ...batch.expense, item]);

		if (item) item = { ...item, amounts: [...item.amounts, ...amounts] };
		else item = bItem;

		const { writer, usersRef } = getWriter();

		let pathSegments = getPathSegments(heads);
		writer.update(doc(usersRef, ...pathSegments), { total });

		pathSegments = [...pathSegments, item.type, item.id];
		writer.set(doc(usersRef, ...pathSegments), item);

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
