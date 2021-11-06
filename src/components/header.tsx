import styled from "styled-components";
import Logout from "./common/logout";

interface Props {}

function Header(props: Props) {
	return (
		<Headerr>
			<div className="header-title">
				<em>Tegy</em>
			</div>

			<Logout />
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
