import { useEffect, useState } from "react";
import { useAppDispatch } from "../../model/hooks";
import { ModalE, toggledModal } from "../../model/uiSlice";
import authService from "../../services/authService";
import Button from "./button";

const Logout = () => {
	const dispatch = useAppDispatch();
	const [text, setText] = useState<"logout" | "login">("logout");

	useEffect(() => {
		authService.onStateChange(user => {
			setText(user ? "logout" : "login");
		});
	}, []);

	const handleClick = () => {
		if (text === "logout") authService.logout();
		else dispatch(toggledModal(ModalE.LOGIN));
	};

	return <Button onClick={handleClick}>{text}</Button>;
};

export default Logout;
