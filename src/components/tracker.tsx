import styled from "styled-components";
import Banner from "./common/banner";
import BudgetInput from "./budgetInput";
import SummaryLabel from "./common/summaryLabel";
import BudgetItems from "./common/budgetItems";

interface Props {}

function Tracker(props: Props) {
	// const {} = props;

	const budgets = {
		income: [
			{
				id: "kkdkd",
				type: "income",
				description: "James Man",
				amounts: [
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() }
				]
			}
		] as Budget[],
		expense: [
			{
				id: "kkdkdddff",
				type: "expense",
				description: "James Spent",
				amounts: [
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() }
				]
			}
		] as Budget[]
	};

	return (
		<Wrapper>
			<Banner>
				<div className="banner-content">
					<div className="banner-title">
						Available budget in Oct
						<span className="banner-title-hide">ober, 2021</span>
					</div>

					<div className="banner-amount">0.00</div>

					<SummaryLabel type="inc" name="income" amount={1000} />

					<SummaryLabel
						color="secondary"
						type="exp"
						name="expense"
						amount={1000}
					/>
				</div>
			</Banner>

			<BudgetInput />

			<div className="content">
				<BudgetItems title="Income" color="primary" budgets={budgets.income} />
				<BudgetItems
					title="Expense"
					color="secondary"
					budgets={budgets.expense}
				/>
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

	.content {
		display: flex;
		flex-wrap: wrap;
	}

	@media (max-width: 435px) {
		.banner-title-hide {
			display: none;
		}
	}
`;

export default Tracker;
