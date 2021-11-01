import { useState, useEffect } from "react";
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

function SignUp() {
	const dispatch = useAppDispatch();
	const showModal = useAppSelector(selectModal(ModalE.SIGN_UP));

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		return authService.onStateChange(user => {
			if (!user) dispatch(toggledModal(ModalE.SIGN_UP));
		});
		// eslint-disable-next-line
	}, []);

	if (!showModal) return null;

	const handleSubmit = async () => {
		try {
			if (!email || !password) throw Error("Empty fields not allowed");

			dispatch(toggledLoading(""));

			await authService.signUp(email, password);

			dispatch(toggledModal(ModalE.SIGN_UP));

			toast.success("Accounted created successfully.");
		} catch (error) {
			toast.error(error.message);
		}
		dispatch(toggledLoading(""));
	};

	const handleClose = () => {
		dispatch(toggledModal(ModalE.SIGN_UP));
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
		</ModalWrapper>
	);
}

export default SignUp;
