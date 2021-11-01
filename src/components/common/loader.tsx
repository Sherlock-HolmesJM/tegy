import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { selectLoading } from "../../app/uiSlice";

const Loader = () => {
	const isLoading = useAppSelector(selectLoading);

	if (!isLoading) return null;

	return (
		<Container>
			<HourGlass />
		</Container>
	);
};

const Container = styled.div`
	position: absolute;
	top: 1px;
	left: 1px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 99.9%;
	z-index: 111;
`;

const HourGlass = styled.div`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;

	&:after {
		content: " ";
		display: block;
		border-radius: 50%;
		width: 0;
		height: 0;
		margin: 8px;
		box-sizing: border-box;
		border: 32px solid #fff;
		border-color: #fff transparent #fff transparent;
		animation: lds-hourglass 1.2s infinite;
	}

	@keyframes lds-hourglass {
		0% {
			transform: rotate(0);
			animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
		}
		50% {
			transform: rotate(900deg);
			animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		}
		100% {
			transform: rotate(1800deg);
		}
	}
`;

export default Loader;
