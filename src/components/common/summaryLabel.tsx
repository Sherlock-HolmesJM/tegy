import styled from "styled-components";
import { selectBatchTotal } from "../../app/budgetSlice";
import { useAppSelector } from "../../app/hooks";
import { formatAmount, percentage } from "../../utils/money";
import Badge from "./badge";

interface Props {
	name: string;
	type: ItemType;
	color?: "primary" | "secondary";
}

function SummaryLabel(props: Props) {
	const { name, type, color = "primary" } = props;

	const total = useAppSelector(selectBatchTotal);

	return (
		<Wrapper className={`label ${color}`} theme={window.theme}>
			<div className="label-name">{name}</div>

			<div className="amount-div">
				<div className="label-amount">
					{formatAmount(total[type], type === "income" ? "+" : "-")}
				</div>

				<Badge className={`label-percent ${color}`}>
					{type === "expense" && percentage(total.income, total.expense) + "%"}
				</Badge>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div<{ theme: Theme }>`
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
		background-color: ${props => props.theme.primary};
	}

	&.secondary {
		background-color: ${props => props.theme.secondary};
	}

	.label-name {
		font-size: 18px;
		line-height: 20px;
		text-transform: uppercase;
		color: black;
		text-align: left;
	}

	.amount-div {
		display: flex;
		justify-content: center;
	}

	.label-amount {
		font-size: 16px;
		margin-right: 5px;
	}

	.label-percent {
		min-width: 35px;
	}
	.label-percent.primary {
		visibility: hidden;
	}
`;

export default SummaryLabel;
