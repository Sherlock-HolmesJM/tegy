import styled from "styled-components";

const Input = styled.input`
	margin: 5px;
	padding: 10px 12px;
	border-radius: 5px;
	border: 1px solid lightgray;
	outline: none;

	&:focus {
		outline: 1px solid gray;
	}
`;

export default Input;
