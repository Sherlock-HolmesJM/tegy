import styled from "styled-components";
import {
	budgetLoaded,
	headsUpdated,
	selectBudgetList,
	selectHeads
} from "../model/budgetSlice";
import { useAppDispatch, useAppSelector } from "../model/hooks";
import { ModalE, toggledModal } from "../model/uiSlice";
import { loadBudget, updateHeads } from "../services/stateService";
import { getBudget } from "../utils/budget";
import Button from "./common/button";
import Logout from "./common/logout";
import Select from "./common/select";

function Header() {
	const dispatch = useAppDispatch();

	const budgetList = useAppSelector(selectBudgetList);
	const heads = useAppSelector(selectHeads);

	const list = budgetList.map(b => ({ value: b.id, label: b.name }));

	const { primary } = window.theme;

	const handleBudgetChange = (id: string) => {
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

	return (
		<Headerr>
			<div className="header-title">
				{/* <em className="header-title-content">==</em> */}
				<em className="header-title-content">Tegy</em>
			</div>

			<div className="header-aside">
				<Button
					color={primary}
					onClick={() => dispatch(toggledModal(ModalE.BUDGET))}>
					New Budget
				</Button>
				<Select
					value={heads.budget}
					options={list}
					onSelect={handleBudgetChange}
					color={window.theme.gray}
				/>
				<Logout />
			</div>
		</Headerr>
	);
}

const Headerr = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2px 12px;
	background-color: ${window.theme.gray};

	.header-title {
		font-size: 23px;
		font-weight: 700;
		color: ${window.theme.primary};
	}
	.header-title-content {
		display: inline-block;
		margin-right: 10px;
	}
	.header-aside {
		display: flex;
	}
`;

export default Header;
