import styled from "styled-components";
import banner from "../../media/banner.png";
import SummaryLabel from "./summaryLabel";

interface Props {}

function Banner(props: Props) {
	// const {} = props;

	return (
		<Wrapper>
			{/* <img src={banner} alt="banner" width="100%" height="100%" /> */}
			<div className="banner-overlay">
				<SummaryLabel color="primary" amount={100} type="inc" name="income" />
				<SummaryLabel
					color="secondary"
					amount={100}
					type="exp"
					name="expense"
				/>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
	background-image: url(${banner});
	background-position: center;
	min-height: 250px;

	.banner-overlay {
		position: absolute;
		top: 1px;
		width: 100%;
		height: 100%;
		flex-grow: 1;
		background-color: #00000030;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`;

export default Banner;
