import React from "react";
import styled from "styled-components";
import Moment from "react-moment";
import Badge from "./badge";
import income from "../../media/income.png";
import expense from "../../media/expense.png";

interface Props {}

function BudgetItem(props: Props) {
	// const {} = props;

	const { theme } = window;

	const color = "primary";
	const type = "income";

	return (
		<Wrapper color={theme[color]}>
			<div className="img-div">
				<img
					src={type === "income" ? income : expense}
					alt="inc"
					width="100%"
					height="100%"
				/>
			</div>

			<div className="content-group">
				<div className="content">
					<div className="description">James</div>

					<div className="amount">
						<div>+ 500.00</div> <Badge className={`badge-${color}`}>50%</Badge>
					</div>
				</div>

				<div className="datetime">
					<Moment fromNow>{new Date().toJSON()}</Moment>
				</div>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	border-top: 1px solid lightgray;
	padding-right: 7px;
	cursor: pointer;

	&:last-child {
		border-bottom: 1px solid lightgray;
	}

	.img-div {
		flex-basis: 50px;
	}

	.content-group {
		flex-grow: 1;
	}

	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 18px;
		height: 60%;
	}

	.amount {
		display: flex;
		align-items: center;
		color: ${(props) => props.color};
	}

	.badge-primary {
		display: none;
	}

	.datetime {
		font-size: 12px;
		text-align: left;
	}
`;

export default BudgetItem;
