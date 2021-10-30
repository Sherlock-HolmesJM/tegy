import styled from "styled-components";

const Button = styled.button`
	font-size: 12px;
	font-weight: 600;
	margin: 5px;
	padding: 10px 12px;
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
