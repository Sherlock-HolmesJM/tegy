import { doc, setDoc, getDoc, getFirestore, addDoc } from "firebase/firestore";
import { RootState } from "../app/store";
import { getCurrentBatch } from "../utils/batch";
import { findBudget } from "../utils/budget";
import { getCurrentUser } from "./authService";
import { initialState } from "../app/budgetSlice";
import { User } from "@firebase/auth";

export const initializeDB = async (user: User) => {
	try {
		const docRef = doc(getFirestore(), "budgets", user.uid);
		const docSnapshot = await getDoc(docRef);

		if (!docSnapshot.exists()) setDoc(docRef, initialState);
	} catch (error) {
		console.log(error.message);
	}
};

export const addBudget = (payload: Budget, state: RootState) => {
	// const user = getCurrentUser();
	// if (!user) return;
	// const db = getFirestore();
	// const { type, description, amounts } = payload;
	// const budget = findBudget({ type, description }, state.budget);
	// setDoc(doc(db, "budgets", user.uid), budget);
	// // if (budget) {
	// // 	budget.amounts = [...budget.amounts, ...amounts];
	// // } else {
	// // 	// getCurrentBatch()[type].push(payload);
	// // }
};

const budgetService = {
	addBudget
};

export default budgetService;
