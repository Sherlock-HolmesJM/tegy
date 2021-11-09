import styled from "styled-components";
import { useAppDispatch } from "../model/hooks";
import { ModalE, toggledModal } from "../model/uiSlice";
import Button from "./common/button";
import Logout from "./common/logout";

interface Props {}

function Header(props: Props) {
	const dispatch = useAppDispatch();
	const { primary } = window.theme;

	return (
		<Headerr>
			<div className="header-title">
				{/* <em className="header-title-content">==</em> */}
				<em className="header-title-content">Tegy</em>
			</div>

			<div>
				<Button
					color={primary}
					onClick={() => dispatch(toggledModal(ModalE.BUDGET))}>
					New Budget
				</Button>
				{/* <Button color={primary}>settings</Button> */}
				<Logout />
			</div>
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
	.header-title-content {
		display: inline-block;
		margin-right: 10px;
	}
`;

export default Header;
