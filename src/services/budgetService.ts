import {
	doc,
	getDoc,
	getFirestore,
	updateDoc,
	writeBatch,
	collection
} from "firebase/firestore";
import { getItem } from "../utils/budgetItem";
import { getCurrentUser } from "./authService";
import { initialState } from "../app/budgetSlice";
import { User } from "@firebase/auth";

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

export const addBudget = (b: BudgetItem, slice: Budgets) => {};

const budgetService = {
	addBudget
};

export default budgetService;
