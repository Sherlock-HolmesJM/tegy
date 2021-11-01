import styled from "styled-components";

const Input = styled.input`
	margin: 3px;
	padding: 8px;
	border-radius: 5px;
	border: 1px solid ${props => props.color || "lightgray"};
	outline: none;

	&:focus {
		outline: 1px solid ${props => props.color || "lightgray"};
	}
`;

export default Input;
