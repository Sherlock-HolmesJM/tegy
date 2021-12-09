import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../model/hooks";
import {
	itemAdded,
	itemRemoved,
	selectDescriptions
} from "../model/budgetSlice";
import uid from "../utils/id";
import Input from "./common/input";
import Button from "./common/button";
import { addItem } from "../services/itemService";
import { BatchButton } from "./modal/batchModal";
import BatchSelect from "./common/batchSelect";
import Select from "./common/select";

const BudgetInput = () => {
	const dispatch = useAppDispatch();

	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState("");
	const [type, setType] = useState<ItemType>("income");

	const descriptions = useAppSelector(selectDescriptions);

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

			dispatch(itemAdded(item));

			addItem(item, {
				error: () => dispatch(itemRemoved(item))
			});
		}
	};

	const handleTypeSelect = (value: string) => {
		setType(value as ItemType);
	};

	return (
		<Wrapper onKeyPress={handleInput} ctheme={{ selectedColor, ...theme }}>
			<Button className="input-hide" color={theme.primary}>
				<BatchButton mode="create" />
			</Button>

			<div className="input-item input-select input-batch input-hide">
				<BatchSelect />
			</div>

			<div className="input-item input-select input-type">
				<Select
					onSelect={handleTypeSelect}
					value={type}
					options={[
						{ value: "income", label: "+" },
						{ value: "expense", label: "-" }
					]}
				/>
			</div>

			<div className="input-item input-description">
				<InputBox
					value={description}
					placeholder="Description"
					onChange={setDescription}
					list={descriptions}
				/>
			</div>

			<Input
				type="number"
				className="input-item input-amount"
				placeholder="Amount"
				value={amount}
				onChange={e => setAmount(+e.target.value)}
				onFocus={e => e.target.select()}
				color={selectedColor}
			/>
		</Wrapper>
	);
};

export default BudgetInput;

interface Color extends Theme {
	selectedColor: string;
}

const Wrapper = styled.div<{ ctheme: Color }>`
	position: sticky;
	top: 36px;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 40px;
	padding: 5px 2px;
	gap: 10px;
	background-color: ${window.theme.gray};
	border-bottom: 1px groove ${props => props.ctheme.selectedColor};
	z-index: 1;

	.input-icon.hide {
		display: none;
	}

	.input-item {
		border: 1px solid ${window.theme.primary};
		border-radius: 4px;
		height: 33px;
	}

	.input-select {
		background: white;
		text-transform: capitalize;
	}

	.input-amount {
		width: 100px;
	}

	@media screen and (max-width: 615px) {
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

// =================== BUDGET-INPUT-BOX COMPONENT ===========================

/**
 * This InputBox is one with a drop down list to display suggestions as user types on it.
 * On selecting a suggestion, the inputBox' value is updated.
 */

interface InputProps {
	value: string;
	list: string[];
	className?: string;
	placeholder?: string;
	onChange: (value: string) => void; // function to call when a user clicks on an item
}

const InputBox = (props: InputProps) => {
	const { className, placeholder, list, value, onChange } = props;

	const [isBlur, setBlur] = useState(true);
	const ref = useRef<HTMLDivElement>(null);

	const identifier = "budgetInputBox";

	useEffect(() => {
		window.addEventListener("click", (e: any) => {
			if (!e.target.closest("." + identifier)) setBlur(true);
		});
	}, []);

	const filtered =
		!isBlur && value
			? list.filter(item => item.toLowerCase().includes(value.toLowerCase()))
			: [];

	const raiseChange = (value: string) => {
		setBlur(true);
		onChange(value);
	};

	return (
		<InputWrapper
			className={`${identifier} ${className}`}
			ref={ref}
			height={ref.current?.clientHeight || 36}>
			<div className="search-input-container">
				<input
					type="text"
					className="search-input"
					value={value}
					onChange={e => onChange(e.target.value)}
					placeholder={placeholder || "Enter keyword"}
					onFocus={e => {
						setBlur(false);
						e.target.select();
					}}
				/>
			</div>

			<div className="search-items">
				{filtered.map((item, index) => (
					<div
						key={index}
						className="search-item-container"
						onClick={() => raiseChange(item)}>
						<SearchIconJr />

						<div className="search-item">{item}</div>
					</div>
				))}
			</div>
		</InputWrapper>
	);
};

const InputWrapper = styled.div<{ height: number }>`
	position: relative;
	width: 100%;
	height: 100%;

	.search-input-container {
		display: flex;
		align-items: center;
		border-radius: 3px;
		height: 36px;
		width: 100%;
		height: inherit;
		padding: 10px;
		background: white;
		gap: 5px;
	}
	.search-input {
		width: 100%;
		border: none;
		outline: none;
		font-size: 16px;
	}

	.search-items {
		position: absolute;
		top: ${props => props.height + 3 + "px"};
		width: min(400px, 60vw);
		box-shadow: 0px 2px 10px #d7d7d7;
		z-index: 9999;
	}
	.search-item-container {
		display: flex;
		align-items: center;
		width: 100%;
		height: 48px;
		padding: 10px;
		gap: 20px;
		font-size: 16px;
		cursor: pointer;
		background: #fefefe;
	}
	.search-item-container:hover {
		background: #f6f6f6;
	}
`;

// =================== ICONS ======================  //

const SearchIconJr = () => (
	<svg
		version="1.1"
		id="Layer_1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 330 330"
		xmlSpace="preserve"
		height="14px"
		width="14px">
		<path
			id="XMLID_224_"
			d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
	l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
	C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
		/>
		<g></g>
		<g></g>
		<g></g>
		<g></g>
		<g></g>
		<g></g>
		<g></g>
		<g></g>
		<g></g>
		<g></g>
		<g></g>
		<g></g>
		<g></g>
		<g></g>
		<g></g>
	</svg>
);
