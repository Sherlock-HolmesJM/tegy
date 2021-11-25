import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../model/hooks";
import { ModalE, toggledModal } from "../../model/uiSlice";
import closeIcon from "../../asset/close.webp";

/**
 * NOTE: To create a MODAL, use the ModalWrapper and pass your modal as child.
 */

interface ModalProps {
	theme: Theme;
	title: string;
	modal: ModalE;
}

const Modal: React.FC<ModalProps> = props => {
	const dispatch = useAppDispatch();
	const [anim, setAnim] = useState("");

	const handleClose = e => {
		if (e.target.dataset.close) {
			setAnim("animate__slideOutDown");

			setTimeout(() => {
				setAnim("");
				dispatch(toggledModal(ModalE.CLOSE_MODALS));
			}, 400);
		}
	};

	return (
		<Container onClick={handleClose} data-close>
			<Box
				ctheme={props.theme}
				className={`animate__animated ${anim}`}
				data-aos="zoom-in-down">
				<div className="modal-box-header">
					<Title>{props.title}</Title>

					<img
						src={closeIcon}
						alt="X"
						className="modal-box-close"
						onClick={() => dispatch(toggledModal(props.modal))}
					/>
				</div>

				{props.children}
			</Box>
		</Container>
	);
};

const Container = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #0505051d;
	z-index: 2;
`;

const Box = styled.div<{ ctheme: Theme }>`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: min(350px, 100%);
	margin: 10px;
	background: white;
	border-radius: 5px;
	padding: 15px;
	border: 1px solid ${props => props.ctheme.primary};
	box-shadow: 5px 5px 5px #0000002d;
	gap: 10px;

	.modal-box-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.modal-box-close {
		width: 30px;
		height: 30px;
		cursor: pointer;
	}
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

export { Box, Title, Modal };

export default Container;
