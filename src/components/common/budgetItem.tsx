import { useState } from "react";
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
	const dispatch = useAppDispatch();
	const history = useHistory();
	const { income } = useAppSelector(selectBatchTotal);

	const [hoverAnim, setHover] = useState<"" | "animate">("");

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

	const handleClick = e => {
		if (e.target.dataset.delete) return;

		setHover("animate");

		setTimeout(() => {
			setHover("");
			history.push(`/view/${type}/${id}`);
		}, 380);
	};

	return (
		<Wrapper color={theme[color]}>
			<div className={`item-overlay ${hoverAnim}`}></div>
			<div className="item-img-div">
				<img
					src={type === "income" ? incomeImg : expenseImg}
					alt="inc"
					width="100%"
					height="100%"
				/>
			</div>

			<div className="item-content-group" onClick={handleClick}>
				<div className="item-content">
					<div className="item-description">{description}</div>

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
							data-delete
						/>
					</div>
				</div>

				<div className="item-datetime">
					<div>{new Date(date).toDateString()}</div>
					{" -- "}
					<Moment fromNow>{new Date(date)}</Moment>
				</div>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	width: 100%;
	background: white;
	border-radius: 5px;
	&:last-child {
		margin: 0;
	}

	.item-overlay {
		box-sizing: content-box;
		position: absolute;
		top: -5px;
		height: 100%;
		width: 0;
		background: #2e2d2d21;
		border-radius: 50px;

		&.animate {
			animation: item-hover 0.3s ease forwards;
		}
	}

	@keyframes item-hover {
		0% {
			width: 0px;
			padding: 5px;
		}

		100% {
			width: 100%;
			padding: 5px;
		}
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
		display: flex;
		font-size: 12px;
		text-align: left;
	}
`;

export default BudgetItem;
