import { useHistory, useParams } from "react-router";
import { selectBudget } from "../app/budgetSlice";
import { useAppSelector } from "../app/hooks";
import BudgetItems from "./common/budgetItems";

const BudgetView = () => {
	const param = useParams<SelectBudget>();
	const history = useHistory();

	let budget = useAppSelector(selectBudget(param));

	if (!budget) {
		history.push("/");
		return null;
	}

	budget = JSON.parse(JSON.stringify(budget));

	const budgets = budget.amounts
		.sort((a, b) => b.amount - a.amount)
		.map(amount => ({
			...budget,
			amounts: [amount]
		}));

	return (
		<BudgetItems
			budgets={budgets}
			title={param.type}
			single
			color={param.type === "income" ? "primary" : "secondary"}
		/>
	);
};

export default BudgetView;
