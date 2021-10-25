import styled from "styled-components";
import Banner from "./common/banner";

interface Props {}

function Tracker(props: Props) {
	// const {} = props;

	return (
		<Wrapper>
			<Banner />
			<div className="input"></div>
			<div className="content"></div>
		</Wrapper>
	);
}

const Wrapper = styled.div``;

export default Tracker;
