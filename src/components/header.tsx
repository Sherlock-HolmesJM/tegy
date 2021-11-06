import React from "react";
import styled from "styled-components";
import Button from "./common/button";

interface Props {}

function Header(props: Props) {
	const {} = props;

	return (
		<Headerr>
			<div className="header-title">
				<em>Tegy</em>
			</div>

			<Button>Logout</Button>
		</Headerr>
	);
}

const Headerr = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2px 12px;
	background-color: ${window.theme.gray};

	.header-title {
		font-size: 23px;
		font-weight: 700;
		color: ${window.theme.primary};
	}
`;

export default Header;
