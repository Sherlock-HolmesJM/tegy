import {
	doc,
	setDoc,
	getDoc,
	getFirestore,
	addDoc,
	updateDoc,
	writeBatch,
	collection
} from "firebase/firestore";
import { getCurrentBatch } from "../utils/batch";
import { findBudget } from "../utils/budget";
import { getCurrentUser } from "./authService";
import { initialState } from "../app/budgetSlice";
import { User } from "@firebase/auth";
import { arrayToObject } from "../utils/transform";

export const initializeDB = async (user: User) => {
	try {
		const { id, name, selectedBatch } = initialState;

		const docref = doc(getFirestore(), `budgets/${user.uid}`);
		const catref = doc(getFirestore(), `budgets/${user.uid}/budgets/${id}`);

		const snapshot = await getDoc(docref);

		if (snapshot.exists()) return;

		const batch = writeBatch(getFirestore());

		batch.set(docref, { seletedBudget: id });
		batch.set(catref, { name, id, selectedBatch });

		batch.commit();
	} catch (error) {
		console.log(error.message);
	}
};

export const addBudget = (b: Budget, slice: BudgetSlice) => {
	const user = getCurrentUser();
	if (!user) return;

	const db = getFirestore();
	const { type, description, amounts } = b;

	const budget = findBudget({ type, description }, slice);
	//user.id/batches/batchId/field
	if (budget) {
		budget.amounts = [...budget.amounts, ...amounts];
	} else {
		updateDoc(doc(db, "budgets", user.uid), {
			batches: [{ name: "new" }]
		});
		// getCurrentBatch()[type].push(b);
	}
};

const budgetService = {
	addBudget
};

export default budgetService;
