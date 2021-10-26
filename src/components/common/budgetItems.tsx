import React from "react";
import styled from "styled-components";
import BudgetItem from "./budgetItem";

interface Props {}

function BudgetItems(props: Props) {
	// const {} = props;

	return (
		<Wrapper>
			<div className="title">Income</div>

			<div>
				<BudgetItem />
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	.title {
		font-size: clamp(25px, 10vw, 35px);
		font-weight: 500;
	}
`;

export default BudgetItems;
