import { useParams, Redirect } from "react-router";
import { selectBudget } from "../app/budgetSlice";
import { useAppSelector } from "../app/hooks";
import { toBudgetList } from "../utils/budget";
import BudgetItems from "./common/budgetItems";

const BudgetView = () => {
	const param = useParams<BudgetFind>();

	let budget = useAppSelector(selectBudget(param));

	if (!budget) return <Redirect to="/" />;

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
