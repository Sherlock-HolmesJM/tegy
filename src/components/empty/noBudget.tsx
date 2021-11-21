import Lottie, { LottieProps } from "react-lottie";
import data from "../../asset/noBudget.json";

function NoBudget() {
	const props: LottieProps = {
		options: {
			animationData: data
		}
	};

	return (
		<div data-aos="zoom-in">
			<Lottie {...props} height={300} width={"100%"} />
		</div>
	);
}

export default NoBudget;
