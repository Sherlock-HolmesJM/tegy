import { initialState } from "../model/budgetSlice";
import { User } from "@firebase/auth";
import { strip } from "../utils/striper";
import { getPathSegments, getWriter, get, getList } from "./httpService";

export const getAppFromDB = async (
	user: User,
	cb: (budgets: Budgets) => void
) => {
	//@ts-ignore
	const { heads, code } = await get<Budgets>(user.uid);

	if (code) return setDB(user);

	let budget = await get<Budget>(...getPathSegments({ budget: heads.budget }));

	const pathsegments = getPathSegments(heads);

	let batch = await get<Batch>(...pathsegments);
	const income = await getList<BudgetItem>(...pathsegments, "income");
	const expense = await getList<BudgetItem>(...pathsegments, "expense");

	batch = { ...batch, income, expense };
	budget = { ...budget, batches: [batch] };

	cb({ heads, budgets: [budget] });
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
