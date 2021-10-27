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
				id: "kkd555kd",
				type: "income",
				description: "James Man",
				amounts: [
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() }
				]
			},
			{
				id: "kkd555kd",
				type: "income",
				description: "James Man",
				amounts: [
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() }
				]
			},
			{
				id: "kkd555kd",
				type: "income",
				description: "James Man",
				amounts: [
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() }
				]
			},
			{
				id: "kkd555kd",
				type: "income",
				description: "James Man",
				amounts: [
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() }
				]
			},
			{
				id: "kkd555kd",
				type: "income",
				description: "James Man",
				amounts: [
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() }
				]
			},
			{
				id: "kkd555kd",
				type: "income",
				description: "James Man",
				amounts: [
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() }
				]
			},
			{
				id: "kkd555kd",
				type: "income",
				description: "James Man",
				amounts: [
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() }
				]
			},
			{
				id: "kkd555kd",
				type: "income",
				description: "James Man",
				amounts: [
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() }
				]
			},
			{
				id: "kkd555kd",
				type: "income",
				description: "James Man",
				amounts: [
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() },
					{ amount: 50, date: Date.now() }
				]
			},
			{
				id: "kkd555kd",
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
				id: "kkdkdd2dff",
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

	const income = budgets.income[0];

	const budget_single = income.amounts.map((amount) => ({
		...income,
		amounts: [amount]
	}));

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

			<div className="tracker-content">
				<BudgetItems title="Income" color="primary" budgets={budgets.income} />
				<BudgetItems
					title="Expense"
					color="secondary"
					budgets={budgets.expense}
				/>
			</div>

			<div className="tracker-content">
				<BudgetItems
					title="Income"
					color="primary"
					single
					budgets={budget_single}
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
