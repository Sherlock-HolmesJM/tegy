import React from "react";
import styled from "styled-components";
import BudgetItem from "./budgetItem";

interface Props {
	title: string;
	color: ThemeField;
	budgets: Budget[];
}

function BudgetItems({ title, budgets, color }: Props) {
	return (
		<Wrapper>
			<div className="title">{title}</div>

			<div>
				{budgets.map((budget) => (
					<BudgetItem color={color} budget={budget} />
				))}
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	margin: 10px;
	flex-grow: 1;

	.title {
		font-size: clamp(20px, 7vw, 25px);
		font-weight: 600;
		text-align: left;
		padding-left: 50px;
		margin: 10px 0;
		text-transform: uppercase;
	}
`;

export default BudgetItems;
