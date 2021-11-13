import { useAppDispatch } from "../model/hooks";
import { ModalE, toggledModal } from "../model/uiSlice";

const Menu = (props: { className?: string }) => {
	const color = window.theme.primary;
	const dispatch = useAppDispatch();

	return (
		<svg
			onClick={() => dispatch(toggledModal(ModalE.SETTING))}
			className={props.className}
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			aria-hidden="true"
			role="img"
			width="30px"
			height="30px"
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 24 24">
			<g fill="none">
				<path d="M7 6a3 3 0 0 0-3 3h16a3 3 0 0 0-3-3H7z" fill={color} />
				<path d="M7 18a3 3 0 0 1-3-3h16a3 3 0 0 1-3 3H7z" fill={color} />
				<path d="M3 11a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3z" fill={color} />
			</g>
		</svg>
	);
};

export default Menu;
