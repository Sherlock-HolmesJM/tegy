import { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	ModalE,
	selectModal,
	toggledLoading,
	toggledModal
} from "../../app/uiSlice";
import Button from "../common/button";
import Input from "../common/input";
import { ModalWrapper } from "./base";
import authService from "../../services/authService";
import { toast } from "react-toastify";

const Login = () => {
	const dispatch = useAppDispatch();
	const showModal = useAppSelector(selectModal(ModalE.LOGIN));

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		return authService.onStateChange(user => {
			if (!user) dispatch(toggledModal(ModalE.LOGIN));
		});
		// eslint-disable-next-line
	}, []);

	if (!showModal) return null;

	const handleSubmit = async () => {
		try {
			if (!email || !password) throw Error("Empty fields not allowed.");

			dispatch(toggledLoading(""));

			await authService.login(email, password);

			dispatch(toggledModal(ModalE.LOGIN));

			toast.success("Successfully logged in.");
		} catch (error) {
			toast.error(error.message);
		}
		dispatch(toggledLoading(""));
	};

	const handleClose = () => {
		dispatch(toggledModal(ModalE.LOGIN));
	};

	return (
		<ModalWrapper theme={window.theme} title="Sign-in">
			<Input
				placeholder="email"
				value={email}
				onChange={e => setEmail(e.target.value)}
				type="email"
			/>
			<Input
				placeholder="password"
				value={password}
				onChange={e => setPassword(e.target.value)}
				type="password"
			/>

			<div>
				<Button onClick={handleSubmit} color={window.theme.primary}>
					sign-in
				</Button>
				<Button onClick={handleClose} color={window.theme.secondary}>
					cancel
				</Button>
			</div>

			<LoginRegister onClick={() => dispatch(toggledModal(ModalE.SIGN_UP))}>
				<em>NO ACCOUNT? SIGN-UP</em>
			</LoginRegister>
		</ModalWrapper>
	);
};

const LoginRegister = styled.div`
	font-size: 12px;
	color: ${window.theme.primary};
	text-align: right;
	font-weight: 600;
	cursor: pointer;
`;

export default Login;
