import { useState } from "react";
import styled from "styled-components";

interface Props {}

function BudgetInput(props: Props) {
	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState("");
	const [type, setType] = useState<BudgetType>("inc");

	const { theme } = window;
	const selectedColor = type === "inc" ? theme.primary : theme.secondary;

	const handleInput = (e) => {
		if (e.key !== "Enter") return;
	};

	const handleChange = (e) => {
		setType(e.target.value as BudgetType);
	};

	return (
		<Wrapper onKeyPress={handleInput} ctheme={{ selectedColor, ...theme }}>
			<select
				name="type"
				className="input-type input-border"
				onChange={handleChange}
				value={type}>
				<option className="input-option plus" value="inc">
					+
				</option>
				<option className="input-option minus" value="exp">
					-
				</option>
			</select>
			<input
				type="text"
				className="input-description input-border"
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value.trim())}
			/>
			<input
				type="number"
				min="1"
				className="input-amount input-border"
				placeholder="Amount"
				value={amount}
				onChange={(e) => setAmount(+e.target.value)}
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
	border-bottom: 1px groove ${(props) => props.ctheme.selectedColor};

	.input-amount,
	.input-description,
	.input-type {
		margin: 8px;
		padding: 10px 12px;
		border-radius: 5px;
		transition: 0.5s;
	}
	.input-type {
		font-size: large;
	}
	.input-option.plus {
		color: ${(props) => props.ctheme.primary};
	}
	.input-minus {
		color: ${(props) => props.ctheme.secondary};
	}
	.input-amount {
		width: 110px;
	}
	.input-description {
		width: 400px;
	}
	.input-icon {
		width: 40px;
		height: 40px;
		margin: 8px;
		color: ${(props) => props.ctheme.selectedColor};
		transition: 0.5s;
	}
	.input-icon.hide {
		display: none;
	}
	.input-border {
		outline: none;
		border: 1px dotted ${(props) => props.ctheme.selectedColor};
	}
	.input-border:focus {
		border: 1px solid ${(props) => props.ctheme.selectedColor};
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
		.input-description,
		.input-type {
			margin: 4px;
		}

		.input-amount {
			margin-top: 0;
		}
	}
`;

export default BudgetInput;
