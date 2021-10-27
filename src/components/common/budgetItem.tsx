import styled from "styled-components";
import Moment from "react-moment";

import Badge from "./badge";

import income from "../../media/income.webp";
import expense from "../../media/expense.webp";
import { useHistory } from "react-router";

interface Props {
	budget: Budget;
	color: ThemeField;
}

function BudgetItem(props: Props) {
	const {
		color,
		budget: { description, id, type, amounts }
	} = props;

	const { theme } = window;
	const sign = type === "income" ? "+" : "-";
	const totalAmount = amounts.reduce((acc, next) => acc + next.amount, 0);
	const { date } = amounts[amounts.length - 1];

	const history = useHistory();

	const handleClick = () => {
		history.push(`/view/${type}/${id}`);
	};

	return (
		<Wrapper color={theme[color]} onClick={handleClick}>
			<div className="img-div">
				<img
					src={type === "income" ? income : expense}
					alt="inc"
					width="100%"
					height="100%"
				/>
			</div>

			<div className="content-group">
				<div className="budgetItem-content">
					<div className="description">{description}</div>

					<div className="amount">
						<div>
							{sign} {totalAmount}
						</div>{" "}
						<Badge className={`badge-${type}`}>50%</Badge>
					</div>
				</div>

				<div className="datetime">
					<Moment fromNow>{new Date(date)}</Moment>
				</div>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	padding-right: 7px;
	cursor: pointer;
	margin-bottom: 5px;
	width: 100%;
	background: white;
	border: 1px solid lightgray;
	border-radius: 5px;

	&:last-child {
		margin: 0;
	}

	.img-div {
		flex-basis: 40px;
		margin-right: 8px;
	}

	.content-group {
		flex-grow: 1;
	}

	.description {
		text-transform: capitalize;
	}

	.budgetItem-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 18px;
		height: 60%;
	}

	.amount {
		display: flex;
		align-items: center;
		color: ${props => props.color};
	}

	.badge-income {
		display: none;
	}

	.datetime {
		font-size: 12px;
		text-align: left;
	}
`;

export default BudgetItem;
