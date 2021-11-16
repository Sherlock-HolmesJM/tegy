import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../model/hooks";
import { ModalE, selectModal, toggledModal } from "../../model/uiSlice";
import Button from "../common/button";
import Input from "../common/input";
import { LoginRegister, ModalWrapper, CancelButton } from "./base";
import authService from "../../services/authService";
import { toast } from "react-toastify";
import log from "../../services/logger";

const Login = () => {
	const dispatch = useAppDispatch();
	const isLogin = useAppSelector(selectModal(ModalE.LOGIN));

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	if (!isLogin) return null;

	const handleSubmit = () => {
		try {
			if (!email || !password) throw Error("Empty fields not allowed.");

			dispatch(async () => {
				await authService.login(email, password);

				dispatch(toggledModal(ModalE.LOGIN));

				toast.success("Successfully logged in.");
			});
		} catch (error) {
			log.error(error);
		}
	};

	return (
		<ModalWrapper theme={window.theme} title="login">
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
					okay
				</Button>
				<CancelButton modal={ModalE.LOGIN} />
			</div>

			<LoginRegister onClick={() => dispatch(toggledModal(ModalE.SIGN_UP))}>
				NO ACCOUNT? SIGN-UP
			</LoginRegister>
		</ModalWrapper>
	);
};

export default Login;
