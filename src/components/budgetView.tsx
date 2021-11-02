import { useParams, Redirect } from "react-router";
import { selectItem } from "../app/budgetSlice";
import { useAppSelector } from "../app/hooks";
import { toBudgetList } from "../utils/budgetItem";
import BudgetItems from "./common/budgetItems";

const BudgetView = () => {
	const param = useParams<ItemFind>();

	let budget = useAppSelector(selectItem(param));

	if (!budget) return <Redirect to="/" />;

	return (
		<BudgetItems
			items={toBudgetList(budget)}
			title={param.type}
			single
			color={param.type === "income" ? "primary" : "secondary"}
		/>
	);
};

export default BudgetView;
