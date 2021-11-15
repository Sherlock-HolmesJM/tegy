import {
	budgetLoaded,
	headsUpdated,
	selectBudgetList,
	selectHeads
} from "../../model/budgetSlice";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { loadBudget, updateHeads } from "../../services/stateService";
import { getBudget } from "../../utils/budget";
import Select from "../common/select";

function BudgetSelect() {
	const dispatch = useAppDispatch();

	const budgetList = useAppSelector(selectBudgetList);
	const heads = useAppSelector(selectHeads);

	const list = budgetList.map(b => ({ value: b.id, label: b.name }));

	const handleSelect = (id: string) => {
		dispatch((dispatch, getState) => {
			const oldHeads = { ...heads };

			const state = { ...getState().budgets, heads: { ...heads, budget: id } };
			const budget = getBudget(state);

			if (!budget) {
				loadBudget(id, {
					success: (budget: Budget) => dispatch(budgetLoaded(budget))
				});
			} else {
				const newHeads = { budget: budget.id, batch: budget.head };

				dispatch(headsUpdated(newHeads));

				updateHeads(newHeads, {
					error: () => dispatch(headsUpdated(oldHeads))
				});
			}
		});
	};

	return <Select value={heads.budget} options={list} onSelect={handleSelect} />;
}

export default BudgetSelect;
