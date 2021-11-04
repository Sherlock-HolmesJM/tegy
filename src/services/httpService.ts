import { collection, getFirestore, writeBatch } from "@firebase/firestore";
import { getCurrentUser } from "./authService";

export const getWriter = () => {
	const db = getFirestore();

	return { writer: writeBatch(db), usersRef: collection(db, "users") };
};

/**
 * @param heads
 * @returns if batch, return path to a batch document; else, return path to a budget document
 */
export const getPathSegments = (heads: { budget: string; batch?: string }) => {
	const { uid } = getCurrentUser();

	return heads.batch
		? [uid, "budgets", heads.budget, "batches", heads.batch]
		: [uid, "budgets", heads.budget];
};
