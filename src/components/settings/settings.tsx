import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { ModalE, selectModal, toggledModal } from "../../model/uiSlice";
import Header from "./header";

interface Props {}

function Settings(props: Props) {
	const dispatch = useAppDispatch();
	// const {} = props

	const isSetting = useAppSelector(selectModal(ModalE.SETTING));

	if (!isSetting) return null;

	return (
		<Modal onClick={() => dispatch(toggledModal(ModalE.SETTING))}>
			<div className="setting">
				<Header />

				<ul>
					<li>New Batch</li>
					<li>New Budget</li>
				</ul>

				<ul>
					<li>Select Batch</li>
					<li>Select Budget</li>
				</ul>

				<ul>
					<li>Edit Batch</li>
					<li>Edit Budget</li>
				</ul>

				<ul>
					<li>Logout</li>
				</ul>
			</div>
		</Modal>
	);
}

const Modal = styled.div`
	position: absolute;
	top: 0;
	width: 100vw;
	height: 100vh;
	background: #00000014;
	display: flex;
	align-items: flex-end;
	z-index: 1;

	.setting {
		width: max(20%, 180px);
		height: inherit;
		background: ${window.theme.gray};
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		box-shadow: 1px 5px 30px #1f1e1e5c;
	}

	ul {
		padding: 0;
		margin: 0;
		list-style-type: none;
		border-bottom: 1px groove black;
	}
	ul:last-child {
		border: none;
	}

	li {
		text-align: left;
		padding: 8px 25px;
		cursor: pointer;
		border: 1px solid ${window.theme.gray};
	}
`;

export default Settings;
