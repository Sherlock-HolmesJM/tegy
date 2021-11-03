import {
	doc,
	getDoc,
	getFirestore,
	writeBatch,
	collection
} from "firebase/firestore";
import { getItem } from "../utils/budgetItem";
import { getCurrentUser } from "./authService";
import { initialState, itemAdded } from "../app/budgetSlice";
import { User } from "@firebase/auth";
import { AppDispatch } from "../app/store";
import { getBatch } from "../utils/batch";
import { toggledLoading } from "../app/uiSlice";

export const initializeDB = async (user: User) => {
	try {
		const db = getFirestore();
		const batch = writeBatch(db);
		const { budgets, selectedBudget } = initialState;

		const usersRef = collection(db, "users");

		const snapshot = await getDoc(doc(usersRef, user.uid));
		if (snapshot.exists()) return;

		batch.set(doc(usersRef, user.uid), { selectedBudget });

		const budget = { ...budgets[0] };
		delete budget.batches;

		batch.set(doc(usersRef, user.uid, "budgets", budget.id), budget);

		const batchObj = { ...budgets[0].batches[0] };

		delete batchObj.expense;
		delete batchObj.income;

		batch.set(
			doc(usersRef, user.uid, "budgets", budget.id, "batches", batchObj.id),
			batchObj
		);

		batch.commit();
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
		const { selectedBudget } = state;
		const batch = getBatch(state);

		const { type, description, amounts } = bItem;

		let item = { ...getItem({ type, description }, state, batch) };

		if (item) item.amounts = [...item.amounts, ...amounts];
		else item = bItem;

		const db = getFirestore();
		const usersRef = collection(db, "users");
		const writer = writeBatch(db);

		const pathSegments = [
			getCurrentUser().uid,
			"budgets",
			selectedBudget,
			"batches",
			batch.id,
			item.type,
			item.id
		];

		writer.set(doc(usersRef, ...pathSegments), item);

		await writer.commit();

		dispatch(itemAdded(bItem));
	} catch (error) {
		console.log(error.message);
	}
	dispatch(toggledLoading(false));
};

const budgetService = {
	addBudget
};

export default budgetService;
