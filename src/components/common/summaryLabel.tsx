import styled from "styled-components";
import { formatAmount } from "../../utils/money";

interface Props {
	name: string;
	amount: number;
	type: "inc" | "exp";
	color: "primary" | "secondary";
}

function SummaryLabel(props: Props) {
	const { name, amount, type, color } = props;

	const percentage = type === "inc" ? 89 : 0;

	return (
		<Wrapper className={`label ${color}`}>
			<div className="label-name">{name}</div>

			<div className="label-amount">- {formatAmount(amount)}</div>

			<div className={`label-percent ${color}`}>{percentage + "%"}</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: min(350px, 95%);
	font-weight: 300;
	padding: 10px;
	border-radius: 5px;
	color: white;
	margin: 5px;
	cursor: context-menu;

	&.primary {
		background-color: #32c4c9;
	}

	&.secondary {
		background-color: #f33333;
	}

	.label-name {
		flex-basis: 60%;
		font-size: 18px;
		line-height: 20px;
		text-transform: uppercase;
		color: black;
		text-align: left;
	}

	.label-amount {
		font-size: 16px;
	}

	.label-percent {
		padding: 3px 7px;
		border-radius: 4px;
		background-color: #ffffff52;
		font-size: 10px;
	}

	.label-percent.primary {
		visibility: hidden;
	}
`;

export default SummaryLabel;
