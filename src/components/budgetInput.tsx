import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Select from "./common/select";
import {
	addedBudget,
	changedBatch,
	selectBatchList,
	selectBatchId,
	updatedTotal
} from "../app/budgetSlice";
import { toggledBatch } from "../app/uiSlice";
import uid from "../utils/id";

interface Props {}

function BudgetInput(props: Props) {
	const dispatch = useAppDispatch();
	const batchList = useAppSelector(selectBatchList);
	const batchId = useAppSelector(selectBatchId);

	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState("");
	const [type, setType] = useState<BudgetType>("income");

	const { theme } = window;
	const selectedColor = type === "income" ? theme.primary : theme.secondary;

	const handleInput = e => {
		if (e.key === "Enter") {
			if (!description) return toast.error("Description cannot be empty");

			const budget: Budget = {
				id: uid(),
				description: description.trim(),
				type,
				amounts: [{ amount, date: Date.now(), id: uid() }]
			};

			dispatch(addedBudget(budget));
			dispatch(updatedTotal());
		}
	};

	const handleBatchChange = id => {
		dispatch(changedBatch({ batchId: id }));
	};

	const handleNewBatch = () => {
		dispatch(toggledBatch(true));
	};

	return (
		<Wrapper onKeyPress={handleInput} ctheme={{ selectedColor, ...theme }}>
			<input
				type="button"
				value="New batch"
				className="input-hide"
				onClick={handleNewBatch}
			/>

			<Select
				color={theme.primary}
				onSelect={handleBatchChange}
				value={batchId}
				options={batchList}
				className="input-hide"
			/>

			<Select
				color={selectedColor}
				onSelect={value => setType(value as BudgetType)}
				value={type}
				options={[
					{ value: "income", label: "+" },
					{ value: "expense", label: "-" }
				]}
			/>

			<input
				type="text"
				className="input-description input-border"
				placeholder="Description"
				value={description}
				onChange={e => setDescription(e.target.value)}
			/>

			<input
				type="number"
				className="input-amount input-border"
				placeholder="Amount"
				value={amount}
				onChange={e => setAmount(+e.target.value)}
				onFocus={e => e.target.select()}
			/>
		</Wrapper>
	);
}

interface Color extends Theme {
	selectedColor: string;
}

const Wrapper = styled.div<{ ctheme: Color }>`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	min-height: 40px;
	padding: 5px;
	background-color: #e2dede;
	border-bottom: 1px groove ${props => props.ctheme.selectedColor};

	input {
		margin: 5px;
		padding: 10px 12px;
		border-radius: 5px;
		transition: 0.5s;
	}

	input[type="button"] {
		border: none;
		outline: none;
		background-color: ${props => props.ctheme.primary};
		cursor: pointer;
		transition: none;
	}
	input[type="button"]:active {
		box-shadow: 2px 2px 2px inset;
	}

	.input-amount {
		width: 100px;
	}
	.input-description {
		width: 250px;
	}
	.input-icon {
		width: 40px;
		height: 40px;
		margin: 8px;
		color: ${props => props.ctheme.selectedColor};
		transition: 0.5s;
	}
	.input-icon.hide {
		display: none;
	}
	.input-border {
		outline: none;
		border: 1px solid ${props => props.ctheme.selectedColor};
	}
	.input-border:focus {
		border: 1px solid ${props => props.ctheme.selectedColor};
	}

	@media screen and (max-width: 620px) {
		.input-hide {
			display: none;
		}
	}
	@media screen and (max-width: 466px) {
		.input-icon {
			width: 30px;
			height: 30px;
		}
	}
`;

export default BudgetInput;
