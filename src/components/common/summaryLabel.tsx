import styled from "styled-components";
import { selectBudgetTotal } from "../../app/budgetSlice";
import { useAppSelector } from "../../app/hooks";
import { formatAmount, percentage } from "../../utils/money";
import Badge from "./badge";

interface Props {
	name: string;
	type: BudgetType;
	color?: "primary" | "secondary";
}

function SummaryLabel(props: Props) {
	const { name, type, color = "primary" } = props;

	const total = useAppSelector(selectBudgetTotal);

	const totalAmount = total.income + total.expense;

	return (
		<Wrapper className={`label ${color}`} theme={window.theme}>
			<div className="label-name">{name}</div>

			<div className="label-amount">
				{type === "income" ? "+" : "-"} {formatAmount(total[type])}
			</div>

			{type === "expense" && (
				<Badge className={`label-percent ${color}`}>
					{percentage(totalAmount, total.expense) + "%"}
				</Badge>
			)}
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
		flex-basis: 63%;
		font-size: 18px;
		line-height: 20px;
		text-transform: uppercase;
		color: black;
		text-align: left;
	}

	.label-amount {
		font-size: 16px;
	}

	/* .label-percent.primary {
		visibility: hidden;
	} */

	@media (max-width: 342px) {
		.label-name {
			flex-basis: 58%;
			font-size: 16px;
		}
		.label-amount {
			font-size: 14px;
		}
	}
`;

export default SummaryLabel;
