import { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import BudgetView from "./budgetView";
import BudgetInput from "./budgetInput";
import Banner from "./common/banner";
import SummaryLabel from "./common/summaryLabel";
import BudgetItems from "./common/budgetItems";
import {
	selectBatch,
	selectBatchTotal,
	totalUpdated as updatedTotal
} from "../app/budgetSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { formatAmount } from "../utils/money";

function Tracker() {
	const [, , type, id] = useLocation().pathname.split("/");

	const dispatch = useAppDispatch();

	const batch = useAppSelector(selectBatch);

	useEffect(() => {
		if (type && id) dispatch(updatedTotal({ type: type as ItemType, id }));
	}, [type, id, dispatch]);

	const total = useAppSelector(selectBatchTotal);

	return (
		<Wrapper>
			<ToastContainer theme="colored" position="top-center" />

			<Banner>
				<div className="banner-content">
					<div className="banner-title">
						Available budget in Oct
						<span className="banner-title-hide">ober, 2021</span>
					</div>

					<div className="banner-amount">
						{formatAmount(total.income - total.expense, "+")}
					</div>

					<SummaryLabel type="income" name="income" />

					<SummaryLabel color="secondary" type="expense" name="expense" />
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
							<BudgetItems
								title="Income"
								color="primary"
								items={batch.income ?? []}
							/>
							<BudgetItems
								title="Expense"
								color="secondary"
								items={batch.expense ?? []}
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
