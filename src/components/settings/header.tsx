import styled from "styled-components";
import banner from "../../asset/banner.webp";

function Header() {
	return <Wrapper></Wrapper>;
}

const Wrapper = styled.div`
	width: 100%;
	height: 140px;
	background-image: url(${banner});
	background-position: -50% 50%;
`;

export default Header;
