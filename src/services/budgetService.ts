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
		const writer = getWriter();
		const { budgets, heads } = initialState;

		writer.set({ heads }, [user.uid]);

		let pathSegments = getPathSegments({ budget: heads.budget });

		const [budget] = budgets;
		writer.set(strip(budget, ["batches"]), pathSegments);

		pathSegments = getPathSegments(heads);

		const batchObj = strip(budget.batches[0], ["income", "expense"]);
		writer.set(batchObj, pathSegments);

		writer.commit();
	} catch (error) {
		console.log(error.message);
	}
};

const budgetService = {
	initializeDB: setDB
};

export default budgetService;
