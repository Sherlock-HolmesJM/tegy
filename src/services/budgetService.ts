import { User } from "@firebase/auth";
import { initialState } from "../model/budgetSlice";
import { strip } from "../utils/striper";
import { getPathSegments, getWriter, get, getList } from "./httpService";

export const getAppFromDB = async (
	user: User,
	onSuccess: (budgets: Budgets) => void,
	onError: () => void
) => {
	const state = await get<Budgets>(user.uid);

	if (!state) {
		setDB(user);
		return onError();
	}
	const { heads } = state;

	let budget = await get<Budget>(...getPathSegments({ budget: heads.budget }));

	const pathsegments = getPathSegments(heads);

	let batch = await get<Batch>(...pathsegments);
	const income = await getList<BudgetItem>(...pathsegments, "income");
	const expense = await getList<BudgetItem>(...pathsegments, "expense");

	batch = { ...batch, income, expense };
	budget = { ...budget, batches: [batch] };

	onSuccess({ heads, budgets: [budget] });
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
