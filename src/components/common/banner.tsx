import styled from "styled-components";
import banner from "../../asset/banner.webp";

interface Props {}

const Banner: React.FC<Props> = props => {
	// const {} = props;

	return (
		<Wrapper>
			{/* <img src={banner} alt="banner" width="100%" height="100%" /> */}
			<div className="banner-overlay">{props.children}</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: relative;
	background-image: url(${banner});
	background-position: center;
	min-height: 230px;

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
