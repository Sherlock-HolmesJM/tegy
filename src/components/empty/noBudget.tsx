import { useState } from "react";
import styled from "styled-components";
import Lottie, { LottieProps } from "react-lottie";
import data from "../../asset/noBudget.json";

function NoBudget() {
	const [isPaused, setPause] = useState(false);

	const props: LottieProps = {
		options: {
			animationData: data
		}
	};

	return (
		<Div onClick={() => setPause(!isPaused)} data-aos="zoom-in">
			<Lottie {...props} height={300} width={700} isPaused={isPaused} />
		</Div>
	);
}

const Div = styled.div`
	cursor: pointer;
`;

export default NoBudget;
