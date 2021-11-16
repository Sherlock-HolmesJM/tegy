import styled from "styled-components";
import setting_header from "../../asset/setting_header.webp";

interface Props {}

function Header(props: Props) {
	// const {} = props

	return <Wrapper></Wrapper>;
}

const Wrapper = styled.div`
	width: 100%;
	height: 140px;
	background-image: url(${setting_header});
`;

export default Header;
