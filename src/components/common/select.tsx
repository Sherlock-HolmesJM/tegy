import { useState } from "react";
import styled from "styled-components";

interface Props {
	onSelect: (value: string) => void;
	value: string;
	options: SelectOption[];
	color?: string;
	className?: string;
}

function Select(props: Props) {
	const { value, options, onSelect, color, className } = props;

	const [show, setShow] = useState(false);

	const selected = options.find(option => option.value === value);

	const len = options.reduce(
		(acc, { label: { length } }) => (acc < length ? length : acc),
		0
	);

	return (
		<Wrapper
			onClick={() => setShow(!show)}
			color={color}
			len={len}
			className={className}>
			<div className="value">{selected.label ?? value}</div>

			{show && (
				<div className="options scrollar-m">
					{options.map(option => (
						<div
							key={option.value}
							className="option"
							onClick={() => onSelect(option.value)}>
							{option.label}
						</div>
					))}
				</div>
			)}
		</Wrapper>
	);
}

const border_radius = "border-radius: 3px;";

const Wrapper = styled.div<{ len: number }>`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 5px;
	cursor: pointer;
	min-width: 40px;
	${border_radius};

	.value {
		padding: 10px;
		line-height: 15px;
		${border_radius};
		border: 1px solid ${props => props.color || "#e2dede"};
		background-color: white;
	}

	.options {
		overflow-y: scroll;
		position: absolute;
		top: 40px;
		width: clamp(35px, calc(40px * (${props => props.len} / 3)), 200px);
		max-height: 200px;
	}

	.option {
		width: 100%;
		padding: 7px 8px;
		margin-bottom: 3px;
		border: 1px solid gray;
		background-color: white;
		${border_radius};
		transition: all 0.5s;
	}
	.option:only-child,
	.option:last-child {
		margin: 0;
	}
	.option:hover {
		background: #d6d1d1;
		transition: all 0.5s;
	}
`;

export default Select;
