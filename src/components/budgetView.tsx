import { useHistory, useParams } from "react-router";
import { selectBudget } from "../app/budgetSlice";
import { useAppSelector } from "../app/hooks";
import { toBudgetList } from "../utils/budget";
import BudgetItems from "./common/budgetItems";

const BudgetView = () => {
	const param = useParams<BudgetFind>();
	const history = useHistory();

	let budget = useAppSelector(selectBudget(param));

	if (!budget) {
		history.push("/");
		return null;
	}

	return (
		<BudgetItems
			budgets={toBudgetList(budget)}
			title={param.type}
			single
			color={param.type === "income" ? "primary" : "secondary"}
		/>
	);
};

export default BudgetView;
