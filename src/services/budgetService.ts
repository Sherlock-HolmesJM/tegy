import { doc, getFirestore, writeBatch, collection } from "firebase/firestore";
import { getItem, sumItem } from "../utils/budgetItem";
import { getCurrentUser } from "./authService";
import { initialState, itemAdded } from "../app/budgetSlice";
import { User } from "@firebase/auth";
import { AppDispatch } from "../app/store";
import { getBatch } from "../utils/batch";
import { toggledLoading } from "../app/uiSlice";
import { strip } from "../utils/striper";

/**
 * @param heads
 * @returns if batch, return path to a batch document; else, return path to a budget document
 */
const getPathSegments = (heads: { budget: string; batch?: string }) => {
	const { uid } = getCurrentUser();

	return heads.batch
		? [uid, "budgets", heads.budget, "batches", heads.batch]
		: [uid, "budgets", heads.budget];
};

const getWriter = () => {
	const db = getFirestore();

	return { writer: writeBatch(db), usersRef: collection(db, "users") };
};

export const loadApp = user => {
	// const { usersRef } = getWriter();
	// let pathSegments = [];
};

export const initializeDB = async (user: User) => {
	try {
		const { usersRef, writer } = getWriter();
		const { budgets, heads } = initialState;

		writer.set(doc(usersRef, user.uid), { heads });

		let pathSegments = getPathSegments({ budget: heads.budget });

		const [budget] = budgets;
		writer.set(doc(usersRef, ...pathSegments), strip(budgets, ["batches"]));

		pathSegments = getPathSegments(heads);

		const batchObj = strip(budget.batches[0], ["income", "expense"]);
		writer.set(doc(usersRef, ...pathSegments), batchObj);

		writer.commit();
	} catch (error) {
		console.log(error.message);
	}
};

export const addBudget = async (
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

const budgetService = {
	initializeDB,
	addBudget
};

export default budgetService;
