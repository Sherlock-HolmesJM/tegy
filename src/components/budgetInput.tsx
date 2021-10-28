import { useState } from "react";
import styled from "styled-components";
import { addedBudget, updatedTotal } from "../app/budgetSlice";
import { useAppDispatch } from "../app/hooks";
import Select from "./common/select";

interface Props {}

function BudgetInput(props: Props) {
	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState("");
	const [type, setType] = useState<BudgetType>("income");

	const dispatch = useAppDispatch();

	const { theme } = window;
	const selectedColor = type === "income" ? theme.primary : theme.secondary;

	const handleInput = e => {
		if (e.key === "Enter") {
			const budget: Budget = {
				id: Date.now() + "",
				description,
				type,
				amounts: [{ amount, date: Date.now() }]
			};

			dispatch(addedBudget(budget));
			dispatch(updatedTotal());
		}
	};

	return (
		<Wrapper onKeyPress={handleInput} ctheme={{ selectedColor, ...theme }}>
			<Select
				color={selectedColor}
				onSelect={value => value}
				value={"batch1"}
				options={[{ value: "batch1", label: "Batch 1" }]}
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
				onChange={e => setDescription(e.target.value.trim())}
			/>

			<input
				type="number"
				min="1"
				className="input-amount input-border"
				placeholder="Amount"
				value={amount}
				onChange={e => setAmount(+e.target.value)}
			/>
		</Wrapper>
	);
}

interface Color extends Theme {
	selectedColor: string;
}

const Wrapper = styled.div<{ ctheme: Color }>`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 40px;
	background-color: #e2dede;
	border-bottom: 1px groove ${props => props.ctheme.selectedColor};

	.input-amount,
	.input-description {
		margin: 8px;
		padding: 10px 12px;
		border-radius: 5px;
		transition: 0.5s;
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

	@media screen and (max-width: 487px) {
		flex-wrap: wrap;

		.input-description {
			flex: 1;
		}
	}

	@media screen and (max-width: 466px) {
		.input-icon {
			width: 30px;
			height: 30px;
			margin: 4px 2px;
		}
	}

	@media screen and (max-width: 401px) {
		padding: 5px;

		.input-amount,
		.input-description {
			margin: 4px;
		}

		.input-amount {
			margin-top: 0;
		}
	}
`;

export default BudgetInput;
