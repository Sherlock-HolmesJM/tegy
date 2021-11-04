import { doc, getFirestore, writeBatch, collection } from "firebase/firestore";
import { getItem, sumItem } from "../utils/budgetItem";
import { getCurrentUser } from "./authService";
import { initialState, itemAdded } from "../app/budgetSlice";
import { User } from "@firebase/auth";
import { AppDispatch } from "../app/store";
import { getBatch } from "../utils/batch";
import { toggledLoading } from "../app/uiSlice";

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
	const { usersRef } = getWriter();
	let pathSegments = [];
};

export const initializeDB = async (user: User) => {
	try {
		const { usersRef, writer } = getWriter();
		const { budgets, heads } = initialState;

		writer.set(doc(usersRef, user.uid), { heads });

		const budget = { ...budgets[0] };
		delete budget.batches;

		let pathSegments = getPathSegments({ budget: heads.budget });

		writer.set(doc(usersRef, ...pathSegments), budget);

		const batchObj = { ...budgets[0].batches[0] };

		delete batchObj.expense;
		delete batchObj.income;

		pathSegments = getPathSegments(heads);

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

		if (item) item = { ...item, amounts: [...item.amounts, ...amounts] };
		else item = bItem;

		const total = sumItem([...batch.income, ...batch.expense, bItem]);

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
