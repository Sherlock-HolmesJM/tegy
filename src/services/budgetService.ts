import { doc } from "firebase/firestore";
import { initialState } from "../app/budgetSlice";
import { User } from "@firebase/auth";
import { strip } from "../utils/striper";
import { getPathSegments, getWriter } from "./httpService";

export const loadApp = user => {
	// const { usersRef } = getWriter();
	// let pathSegments = [];
};

export const setDB = async (user: User) => {
	try {
		const { usersRef, writer } = getWriter();
		const { budgets, heads } = initialState;

		writer.set(doc(usersRef, user.uid), { heads });

		let pathSegments = getPathSegments({ budget: heads.budget });

		const [budget] = budgets;
		writer.set(doc(usersRef, ...pathSegments), strip(budget, ["batches"]));

		pathSegments = getPathSegments(heads);

		const batchObj = strip(budget.batches[0], ["income", "expense"]);
		writer.set(doc(usersRef, ...pathSegments), batchObj);

		writer.commit();
	} catch (error) {
		console.log(error.message);
	}
};

const budgetService = {
	initializeDB: setDB
};

export default budgetService;
