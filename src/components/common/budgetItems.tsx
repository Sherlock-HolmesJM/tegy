import styled from "styled-components";
import BudgetItem from "./budgetItem";

interface Props {
	title: string;
	color: ThemeField;
	budgets: Budget[];
	single?: boolean;
}

function BudgetItems({ title, budgets, color, single }: Props) {
	return (
		<Wrapper>
			<div className="title">
				<div>{title}</div>
				{single && <div>Back</div>}
			</div>

			<div className="item-group scrollar">
				{budgets.map((budget) => (
					<BudgetItem key={budget.id} color={color} budget={budget} />
				))}
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	margin: 10px;
	flex-grow: 1;
	max-width: 400px;

	.title {
		display: flex;
		justify-content: space-between;
		font-size: clamp(20px, 7vw, 25px);
		font-weight: 600;
		text-align: left;
		padding: 0 5px;
		margin: 10px 0;
		text-transform: uppercase;
	}

	.item-group {
		overflow-y: scroll;
		background-color: #f0e8e8;
		max-height: 43vh;
	}
`;

export default BudgetItems;
