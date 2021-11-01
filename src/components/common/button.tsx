import styled from "styled-components";

const Button = styled.button`
	font-size: 11px;
	font-weight: 500;
	margin: 5px;
	padding: 10px;
	border-radius: 5px;
	border: none;
	outline: none;
	background-color: ${props => props.color};
	cursor: pointer;
	text-transform: uppercase;
	box-shadow: 2px 2px 2px groove;

	&:active {
		box-shadow: 2px 2px 2px inset;
	}
`;

export default Button;
