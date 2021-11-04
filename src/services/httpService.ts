import { collection, getFirestore, writeBatch, doc } from "@firebase/firestore";
import { getCurrentUser } from "./authService";

export const getWriter = (): Writer => {
	const db = getFirestore();
	const usersRef = collection(db, "users");
	const w = writeBatch(db);

	return {
		set: (obj, ps) => w.set(doc(usersRef, ...ps), obj),
		update: (obj, ps) => w.update(doc(usersRef, ...ps), obj),
		delete: ps => w.delete(doc(usersRef, ...ps)),
		commit: () => w.commit()
	};
};

/**
 * @param heads
 * @returns returns path segments upto a batch document with the condition that, if batch, return path to a batch document; else, return path to a budget document
 */
export const getPathSegments = (heads: { budget: string; batch?: string }) => {
	const { uid } = getCurrentUser();

	return heads.batch
		? [uid, "budgets", heads.budget, "batches", heads.batch]
		: [uid, "budgets", heads.budget];
};
