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
import { itemRemoved, selectBatchTotal } from "../../model/budgetSlice";
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
				dispatch(dispatch => {
					const item = props.budget;
					const amountId = amounts[0].id;

					deleteItem(
						{ item, amountId },
						{
							success: () => {
								dispatch(itemRemoved({ budget: item, amountId }));
							}
						}
					);
				});
			}
		});
	};

	return (
		<Wrapper color={theme[color]}>
			<div className="img-div">
				<img
					src={type === "income" ? incomeImg : expenseImg}
					alt="inc"
					width="100%"
					height="100%"
				/>
			</div>

			<div className="content-group">
				<div className="budgetItem-content">
					<div className="description" onClick={handleClick}>
						{description}
					</div>

					<div className="amount">
						<div>{formatAmount(totalAmount, sign)}</div>

						<Badge className={`item-badge item-badge-${type}`}>
							{percentage(income, totalAmount) + "%"}
						</Badge>

						{amounts.length === 1 && (
							<img
								src={deleteImg}
								alt="D"
								onClick={handleDelete}
								className="delete-div"
								width="100%"
								height="100%"
							/>
						)}
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
		cursor: pointer;
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
		justify-content: space-between;
		align-items: center;
		color: ${props => props.color};
		gap: 5px;
	}

	.item-badge {
		background: #ff000030;
	}
	.item-badge-income {
		display: none;
	}

	.delete-div {
		width: 18px;
		height: 16px;
		cursor: pointer;
	}

	.datetime {
		font-size: 12px;
		text-align: left;
	}
`;

export default BudgetItem;
