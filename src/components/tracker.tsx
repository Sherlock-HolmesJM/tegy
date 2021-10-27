import { Route, Switch, useLocation } from "react-router-dom";
import styled from "styled-components";
import Banner from "./common/banner";
import BudgetInput from "./budgetInput";
import SummaryLabel from "./common/summaryLabel";
import BudgetItems from "./common/budgetItems";
import { selectBudget, selectBudgets } from "../app/budgetSlice";
import { useAppSelector } from "../app/hooks";
import BudgetView from "./budgetView";
import { totalBudget } from "../utils/budget";

interface Props {}

function Tracker(props: Props) {
	// const {} = props;

	const [, type, id] = useLocation().pathname.split("/");

	// const bugets_single = useAppSelector(selectBudget({type: type as any, id}))

	const { income, expense } = useAppSelector(selectBudgets);

	const total = totalBudget([...income, ...expense]);

	return (
		<Wrapper>
			<Banner>
				<div className="banner-content">
					<div className="banner-title">
						Available budget in Oct
						<span className="banner-title-hide">ober, 2021</span>
					</div>

					<div className="banner-amount">{total.income - total.expense}</div>

					<SummaryLabel type="inc" name="income" amount={total.income} />

					<SummaryLabel
						color="secondary"
						type="exp"
						name="expense"
						amount={total.expense}
					/>
				</div>
			</Banner>

			<BudgetInput />

			<div className="tracker-content">
				<Switch>
					<Route path="/view/:type/:id">
						<BudgetView />
					</Route>

					<Route path="/">
						<>
							<BudgetItems title="Income" color="primary" budgets={income} />
							<BudgetItems
								title="Expense"
								color="secondary"
								budgets={expense}
							/>
						</>
					</Route>
				</Switch>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	.banner-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		color: white;
	}
	.banner-title {
		font-size: min(25px, 8vw);
		font-weight: 300;
	}
	.banner-amount {
		font-size: min(50px, 15vw);
		margin: 10px 0;
	}

	.tracker-content {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	@media (max-width: 435px) {
		.banner-title-hide {
			display: none;
		}
	}
`;

export default Tracker;
