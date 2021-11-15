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

	useEffect(() => {
		window.addEventListener("click", ({ target }: any) => {
			if (!target.closest("." + marker)) setDropdown(false);
		});

		return () => {}; // for cleanup

		// eslint-disable-next-line
	}, []);

	const label = options.find(({ value: v }) => v === value)?.label ?? "Empty";

	options = dropdown ? options : [];

	const wrapperProps = {
		len: options.map(({ value }) => value.length).sort((a, b) => b - a)[0] ?? 1,
		height: (valueContainerRef.current?.offsetHeight ?? 34) + 2
	};

	const raiseSelect = (value: string) => {
		setDropdown(false); // close the list after selection
		onSelect(value); // raise select event
	};

	return (
		<Wrapper className={marker} {...wrapperProps}>
			<div
				className="select-value-container"
				onClick={() => setDropdown(!dropdown)}
				ref={valueContainerRef}>
				<div className="select-value">{label}</div>

				{<DropdownIcon />}
			</div>

			<div className="select-options">
				{options.map((item, index) => (
					<div
						key={index}
						className="select-option"
						onClick={() => raiseSelect(item.value)}>
						{item.label}
					</div>
				))}
			</div>
		</Wrapper>
	);
};

export default Select;

const Wrapper = styled.div<{ len: number; height: number }>`
	position: relative;
	min-width: 80px;
	height: inherit;
	z-index: 1;

	.select-value-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 3px;
		/* width: 100%; */
		/* background: white; */
		gap: 30px;
		cursor: pointer;
		height: inherit;
		padding: 0 4px;
	}
	.select-value {
		flex-grow: 1;
		border: none;
		outline: none;
		font-size: 16px;
	}

	.select-options {
		position: absolute;
		top: ${props => props.height + "px"};
	}
	.select-option {
		display: flex;
		align-items: center;
		height: 48px;
		padding: 10px;
		gap: 20px;
		font-size: 16px;
		box-shadow: 0px 2px 10px #d7d7d7;
		cursor: pointer;
		background: #fff;
		width: ${props => `clamp(200px, calc(28px * ${props.len / 3}), 300px)`};
	}
	.select-option:hover {
		background: #f6f6f6;
	}
`;

// ======== Dropdown Icon ============

const DropdownIcon = () => (
	<svg
		width="12"
		height="8"
		viewBox="0 0 12 8"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M10.293 0.292969L5.99997 4.58597L1.70697 0.292969L0.292969 1.70697L5.99997 7.41397L11.707 1.70697L10.293 0.292969Z"
			fill="#1D1C1D"
		/>
	</svg>
);
