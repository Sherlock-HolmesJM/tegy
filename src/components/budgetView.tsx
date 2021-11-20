import { useParams, Redirect } from "react-router";
import { selectItem } from "../model/budgetSlice";
import { useAppSelector } from "../model/hooks";
import { toItemList } from "../utils/budgetItem";
import BudgetList from "./common/budgetList";

const BudgetView = () => {
	const param = useParams<ItemFind>();

	let item = useAppSelector(selectItem(param));

	if (!item) return <Redirect to="/" />;

	const list = toItemList(item).sort(
		(a, b) => b.amounts[0].date - a.amounts[0].date
	);

	return (
		<BudgetList
			items={list}
			title={param.type}
			single
			color={param.type === "income" ? "primary" : "secondary"}
		/>
	);
};

export default BudgetView;
