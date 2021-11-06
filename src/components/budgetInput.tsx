import { useState, useRef } from "react";
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
import { updateHeads } from "../services/budgetService";

const BudgetInput = () => {
	const dispatch = useAppDispatch();
	const batchList = useAppSelector(selectBatchList);
	const batchId = useAppSelector(selectBatchId);

	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState("");
	const [type, setType] = useState<ItemType>("income");

	const descRef = useRef<HTMLInputElement>(null);

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
		dispatch((dispatch, getState) => {
			const old_heads = { ...getState().budgets.heads };
			const heads = { ...old_heads, batch: id };

			dispatch(batchChanged({ batchId: id }));

			updateHeads(heads, {
				onSuccess: () => "",
				onError: () => dispatch(batchChanged({ batchId: old_heads.batch }))
			});
		});
	};

	const handleNewBatch = () => {
		dispatch(toggledModal(ModalE.BATCH));
	};

	const handleTypeSelect = (value: string) => {
		setType(value as ItemType);
		descRef.current.select();
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
				onSelect={handleTypeSelect}
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
				onFocus={e => e.target.select()}
				color={selectedColor}
				ref={descRef}
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
	background-color: ${window.theme.gray};
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
