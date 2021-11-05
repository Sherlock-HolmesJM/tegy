import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../model/hooks";
import Select from "./common/select";
import {
	batchChanged,
	selectBatchList,
	selectBatchId,
	itemAdded
} from "../model/budgetSlice";
import { ModalE, toggledLoading, toggledModal } from "../model/uiSlice";
import uid from "../utils/id";
import Input from "./common/input";
import Button from "./common/button";
import itemService from "../services/itemService";

const BudgetInput = () => {
	const dispatch = useAppDispatch();
	const batchList = useAppSelector(selectBatchList);
	const batchId = useAppSelector(selectBatchId);

	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState("");
	const [type, setType] = useState<ItemType>("income");

	const { theme } = window;
	const selectedColor = type === "income" ? theme.primary : theme.secondary;

	const handleInput = e => {
		if (e.key === "Enter") {
			if (!description) return toast.error("Please provide a description");

			const item: BudgetItem = {
				id: uid(),
				description: description.trim(),
				type,
				amounts: [{ amount, date: Date.now(), id: uid() }]
			};

			dispatch((dispatch, getState) => {
				dispatch(toggledLoading(1));

				itemService.addItem(
					{ item, state: getState().budgets },
					() => {
						dispatch(itemAdded(item));
						dispatch(toggledLoading(1));
					},
					() => dispatch(toggledLoading(1))
				);
			});
		}
	};

	const handleBatchChange = id => {
		dispatch(batchChanged({ batchId: id }));
	};

	const handleNewBatch = () => {
		dispatch(toggledModal(ModalE.BATCH));
	};

	return (
		<Wrapper onKeyPress={handleInput} ctheme={{ selectedColor, ...theme }}>
			<Button
				className="input-hide"
				onClick={handleNewBatch}
				color={theme.primary}>
				New batch
			</Button>

			<Select
				color={theme.primary}
				onSelect={handleBatchChange}
				value={batchId}
				options={batchList}
				className="input-hide"
			/>

			<Select
				color={selectedColor}
				onSelect={value => setType(value as ItemType)}
				value={type}
				options={[
					{ value: "income", label: "+" },
					{ value: "expense", label: "-" }
				]}
			/>

			<Input
				placeholder="Description"
				className="input-description"
				value={description}
				onChange={e => setDescription(e.target.value)}
				color={selectedColor}
			/>

			<Input
				type="number"
				className="input-amount"
				placeholder="Amount"
				value={amount}
				onChange={e => setAmount(+e.target.value)}
				onFocus={e => e.target.select()}
				color={selectedColor}
			/>
		</Wrapper>
	);
};

interface Color extends Theme {
	selectedColor: string;
}

const Wrapper = styled.div<{ ctheme: Color }>`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 40px;
	padding: 5px 2px;
	background-color: #e2dede;
	border-bottom: 1px groove ${props => props.ctheme.selectedColor};

	.input-icon.hide {
		display: none;
	}

	.input-amount {
		width: 100px;
	}

	@media screen and (max-width: 620px) {
		.input-hide {
			display: none;
		}
	}

	@media screen and (max-width: 360px) {
		.input-description {
			width: 150px;
		}
		.input-amount {
			width: 80px;
		}
	}
`;

export default BudgetInput;
