import styled from "styled-components";
import Moment from "react-moment";
import Swal from "sweetalert2";
import Badge from "./badge";
import incomeImg from "../../asset/income.webp";
import expenseImg from "../../asset/expense.webp";
import deleteImg from "../../asset/delete.webp";
import { useHistory } from "react-router";
import { formatAmount, percentage } from "../../utils/money";
import { useAppSelector, useAppDispatch } from "../../model/hooks";
import {
	itemAdded,
	itemRemoved,
	selectBatchTotal
} from "../../model/budgetSlice";
import { deleteItem } from "../../services/itemService";

interface Props {
	budget: BudgetItem;
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

	const deleteImgClasses =
		amounts.length > 1 ? "item-delete hide" : "item-delete";

	const dispatch = useAppDispatch();
	const history = useHistory();
	const { income } = useAppSelector(selectBatchTotal);

	const handleClick = () => {
		history.push(`/view/${type}/${id}`);
	};

	const handleDelete = () => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: theme.primary,
			cancelButtonColor: theme.secondary,
			confirmButtonText: "Yes, delete it!"
		}).then(result => {
			if (result.isConfirmed) {
				const item = props.budget;

				dispatch(itemRemoved(item));

				deleteItem(item, {
					error: () => {
						dispatch(itemAdded(item));
					}
				});
			}
		});
	};

	return (
		<Wrapper color={theme[color]}>
			<div className="item-img-div">
				<img
					src={type === "income" ? incomeImg : expenseImg}
					alt="inc"
					width="100%"
					height="100%"
				/>
			</div>

			<div className="item-content-group">
				<div className="item-content">
					<div className="item-description" onClick={handleClick}>
						{description}
					</div>

					<div className="amount">
						<div>{formatAmount(totalAmount, sign)}</div>

						<Badge className={`item-badge ${type}`}>
							{percentage(income, totalAmount) + "%"}
						</Badge>

						<img
							src={deleteImg}
							alt="D"
							onClick={handleDelete}
							className={deleteImgClasses}
							width="100%"
							height="100%"
						/>
					</div>
				</div>

				<div className="item-datetime">
					<Moment fromNow>{new Date(date)}</Moment>
				</div>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	background: white;
	border-radius: 5px;

	&:last-child {
		margin: 0;
	}

	.item-img-div {
		flex-basis: 40px;
		margin-right: 8px;

		img {
			border-radius: 50%;
		}
	}

	.item-content-group {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.item-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 18px;
		height: 60%;
	}

	.item-description {
		flex-grow: 1;
		text-align: left;
		text-transform: capitalize;
		cursor: pointer;
	}

	.amount {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: ${props => props.color};
		gap: 5px;
	}

	.item-badge {
		background: #ff000030;
		min-width: 30px;

		&.income {
			display: none;
		}
	}

	.item-delete {
		width: 18px;
		height: 16px;
		cursor: pointer;

		&.hide {
			visibility: hidden;
		}
	}

	.item-datetime {
		font-size: 12px;
		text-align: left;
	}
`;

export default BudgetItem;
