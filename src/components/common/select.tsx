import { useState } from "react";
import styled from "styled-components";

interface Props {
	onSelect: (value: string) => void;
	value: string;
	options: SelectOption[];
	color?: string;
}

function Select(props: Props) {
	const { value, options, onSelect, color } = props;

	const selected = options.find(option => option.value === value);

	const [show, setShow] = useState(false);

	return (
		<Wrapper onClick={() => setShow(!show)} color={color}>
			<div className="value">{selected.label ?? value}</div>

			{show && (
				<div className="options">
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

const Wrapper = styled.div`
	position: relative;
	background: white;
	margin: 5px;
	cursor: pointer;
	min-width: 40px;
	${border_radius};

	.value {
		padding: 10px;
		line-height: 15px;
		${border_radius};
		border: 1px solid ${props => props.color || "#e2dede"};
	}

	.options {
		position: absolute;
		top: 40px;
		width: 100%;
	}

	.option {
		width: 100%;
		padding: 7px 10px;
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
