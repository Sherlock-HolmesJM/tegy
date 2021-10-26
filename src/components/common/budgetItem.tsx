import React from "react";
import styled from "styled-components";
import Badge from "./badge";

interface Props {}

function BudgetItem(props: Props) {
	// const {} = props;

	const color = "primary";

	return (
		<Wrapper>
			<div className="description">James</div>
			<div className="amount">
				+ 500.00 <Badge className={`badge-${color}`}>50%</Badge>
			</div>
			<div className="datetime">{new Date().toJSON()}</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	font-size: 18px;
	padding: 10px;
	border-top: 1px solid lightgray;
	cursor: pointer;

	&:last-child {
		border-bottom: 1px solid lightgray;
	}

	.datetime {
		position: absolute;
		right: 4px;
		bottom: -5px;
		font-size: 10px;
		padding: 5px;
		text-align: right;
	}
`;

export default BudgetItem;
