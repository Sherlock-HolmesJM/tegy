import { Link } from "react-router-dom";
import styled from "styled-components";
import BudgetItem from "./budgetItem";

interface Props {
	title: string;
	color: ThemeField;
	items: BudgetItem[];
	single?: boolean;
}

function BudgetItems({ title, items, color, single }: Props) {
	if (items.length === 0) return null;

	return (
		<Wrapper
			data-aos="fade-right"
			data-aos-anchor=".tracker-content"
			data-aos-once="true">
			<div className="title">
				<div>{title}</div>

				{single && <Link to="/">Back</Link>}
			</div>

			<div className="item-group scrollar">
				{items.map(budget => (
					<BudgetItem
						key={budget.amounts[0].date}
						color={color}
						budget={budget}
					/>
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
		font-size: clamp(18px, 5vw, 20px);
		font-weight: 600;
		text-align: left;
		padding: 0 5px;
		margin: 10px 0;
		text-transform: uppercase;
	}

	.item-group {
		display: flex;
		flex-direction: column;
		gap: 10px;
		overflow-y: scroll;
		max-height: 39vh;
		padding: 5px;

		@media (max-width: 700px) {
			max-height: 100%;
		}
	}
`;

export default BudgetItems;
