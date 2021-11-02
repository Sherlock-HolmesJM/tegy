import {
	doc,
	getDoc,
	getFirestore,
	updateDoc,
	writeBatch
} from "firebase/firestore";
import { findBudget } from "../utils/budget";
import { getCurrentUser } from "./authService";
import { initialState } from "../app/budgetSlice";
import { User } from "@firebase/auth";

const ref = (userId: string, budgetId?: string, batchId?: string) => {
	const path =
		budgetId && batchId
			? `users/${userId}/budgets/${budgetId}/batches/${batchId}`
			: budgetId
			? `users/${userId}/budgets/${budgetId}`
			: `users/${userId}`;

	return doc(getFirestore(), path);
};

export const initializeDB = async (user: User) => {
	// try {
	// 	const { id: budgetId, name, selectedBatch, batches } = initialState;
	// 	const {id: batchId, date, total, name: batchName} = batches[0];
	// 	const userRef = ref(user.uid);
	// 	const budgetRef = ref(user.uid, budgetId);
	// 	const batchRef = ref(user.uid, id, batches[0].id);
	// 	const snapshot = await getDoc(userRef);
	// 	if (snapshot.exists()) return;
	// 	const batch = writeBatch(getFirestore());
	// 	batch.set(userRef, { selectedBudget: budgetId});
	// 	batch.set(budgetRef, { name, id, selectedBatch });
	// 	batch.set(batchRef, {})
	// 	batch.commit();
	// } catch (error) {
	// 	console.log(error.message);
	// }
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
