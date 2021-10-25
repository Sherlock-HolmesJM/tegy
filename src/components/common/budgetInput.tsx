import { useState } from "react";
import styled from "styled-components";

interface Props {}

function BudgetInput(props: Props) {
	// const { handleAdd, type, setType } = props;
	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState("");

	const handleInput = (e) => {
		if (e.key !== "Enter") return;
	};

	const handleChange = (e) => {};

	return (
		<Wrapper onKeyPress={handleInput}>
			<select
				name="type"
				className="input-type input-border"
				onChange={handleChange}>
				<option className="input-option plus" value="1">
					+
				</option>
				<option className="input-option minus" value="0">
					-
				</option>
			</select>
			<input
				type="text"
				className="input-description input-border"
				placeholder="Description"
				onChange={(e) => setDescription(e.target.value.trim().toLowerCase())}
			/>
			<input
				type="number"
				min="1"
				className="input-amount input-border"
				placeholder="Amount"
				onChange={(e) => setAmount(+e.target.value)}
			/>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 40px;
	border-bottom: groove grey 1.5px;

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
		color: ${(props) => props.theme.income};
	}
	.input-minus {
		color: ${(props) => props.theme.expense};
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
		color: ${(props) => props.color};
		transition: 0.5s;
	}
	.input-icon.hide {
		display: none;
	}
	.input-border {
		outline: none;
		border: 1px dotted ${(props) => props.color};
	}
	.input-border:focus {
		border: 1px solid ${(props) => props.color};
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
