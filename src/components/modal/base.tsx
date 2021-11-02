import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { ModalE, toggledModal } from "../../app/uiSlice";

const Container = styled.div`
	position: absolute;
	top: 1px;
	left: 1px;
	width: 99.7%;
	height: 99.7vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #0505051d;
	z-index: 1;
`;

const Modal = styled.div<{ ctheme: Theme }>`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: min(350px, 100%);
	margin: 10px;
	background: white;
	min-height: 200px;
	border-radius: 5px;
	padding: 15px;
	border: 1px solid ${props => props.ctheme.primary};
	box-shadow: 5px 5px 5px #0000002d;
`;

const Title = styled.div`
	font-size: 18px;
	font-weight: 700;
	margin: 8px;
	text-transform: uppercase;
`;

export const LoginRegister = styled.div`
	font-size: 12px;
	font-style: italic;
	color: black;
	text-align: right;
	font-weight: 600;
	text-transform: uppercase;
	cursor: pointer;
`;

const ModalWrapper: React.FC<{ theme: Theme; title: string }> = props => {
	const dispatch = useAppDispatch();

	const handleClose = e => {
		if (e.target.dataset.close) dispatch(toggledModal(ModalE.CLOSE));
	};

	return (
		<Container onClick={handleClose} data-close>
			<Modal ctheme={props.theme}>
				<Title>{props.title}</Title>

				{props.children}
			</Modal>
		</Container>
	);
};

export { Modal, Title, ModalWrapper };

export default Container;
