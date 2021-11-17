import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface SelectProps {
	value: string;
	onSelect: (value: string) => void;
	options: SelectOption[];
}

const Select = ({ value, onSelect, options }: SelectProps) => {
	const [dropdown, setDropdown] = useState(false);
	const [marker] = useState("d" + Date.now()); // unique marker needed by event listener
	const valueContainerRef = useRef<HTMLDivElement>(null);
	const selectOptionsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fn = ({ target }: any) => {
			if (!target.closest("." + marker)) setDropdown(false);
		};

		window.addEventListener("click", fn);

		return () => {
			window.removeEventListener("click", fn);
		};
	}, [marker]);

	const label = options.find(({ value: v }) => v === value)?.label ?? "Empty";

	options = dropdown ? options : [];

	const wrapperProps = {
		len: options.map(({ value }) => value.length).sort((a, b) => b - a)[0] ?? 1,
		top: (valueContainerRef.current?.offsetHeight ?? 34) + 2
	};

	const raiseSelect = (value: string) => {
		setDropdown(false);
		onSelect(value);
	};

	return (
		<Wrapper className={marker} {...wrapperProps}>
			<div
				className="select-value-container"
				onClick={() => setDropdown(!dropdown)}
				ref={valueContainerRef}>
				<div className="select-value">{label}</div>

				<div>{<DropdownIcon />}</div>
			</div>

			{options.length > 0 && (
				<div className="select-options" ref={selectOptionsRef}>
					{options.map((item, index) => (
						<div
							key={index}
							className="select-option"
							onClick={() => raiseSelect(item.value)}>
							{item.label}
						</div>
					))}
				</div>
			)}
		</Wrapper>
	);
};

export default Select;

const Wrapper = styled.div<{ len: number; top: number }>`
	position: relative;
	height: inherit;

	.select-value-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 3px;
		gap: 10px;
		cursor: pointer;
		height: inherit;
		padding: 0 6px 4px 5px;
	}
	.select-value {
		flex-grow: 1;
		border: none;
		outline: none;
		font-size: 16px;
	}

	.select-options {
		position: absolute;
		top: ${props => props.top + "px"};
		box-shadow: 1px 1px 3px #d7d7d7;
		background: #fff;
		width: ${props => `clamp(100px, calc(28px * ${props.len / 3}), 130px)`};
		cursor: pointer;
		z-index: 1;
	}
	.select-option {
		display: flex;
		align-items: center;
		height: 40px;
		padding: 8px;
		gap: 20px;
		font-size: 16px;
	}
	.select-option:hover {
		background: #f6f6f6;
	}
`;

// ======== Dropdown Icon ============

const DropdownIcon = () => (
	<svg
		width="8"
		height="10"
		viewBox="0 0 12 8"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M10.293 0.292969L5.99997 4.58597L1.70697 0.292969L0.292969 1.70697L5.99997 7.41397L11.707 1.70697L10.293 0.292969Z"
			fill="#1D1C1D"
		/>
	</svg>
);
