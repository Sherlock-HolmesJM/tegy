import { useState } from "react";
import styled from "styled-components";
import Container, { Box } from "./base";

function About() {
	const [close, setClose] = useState(false);

	if (close) return null;

	return (
		<WrapperContainer onClick={() => setClose(true)}>
			<Wrapper ctheme={window.theme}>
				<div>Tegy: the simple budget tracker</div>

				<div>
					Tegy keeps record of the <span>incomes</span> and{" "}
					<span>expenses</span> of your budget in <span>batches</span>, though
					you can use only one batch, the default batch, if you like. That's it.
				</div>

				<div>
					You can use Tegy as your rough record, later, write it down in your
					book; or use it as your main budget recorder. Either way, with Tegy,
					you'll never have a messy record.
				</div>

				<div>And you can have multiple budgets with the same account.</div>

				<div>
					So, what are you waiting for? Do you want to have a clean budget
					record?
				</div>
			</Wrapper>
		</WrapperContainer>
	);
}

const WrapperContainer = styled(Container)`
	z-index: 3;
`;

const Wrapper = styled(Box)`
	text-align: justify;
	gap: 10px;
	z-index: 3;

	div {
		color: #1d5970;
		font-size: 15px;
		line-height: 20px;
		font-weight: 500;
	}

	div:first-child {
		color: #297e29;
		font-weight: 700;
		text-transform: uppercase;
	}

	div:last-child {
		color: #297e29;
	}

	span {
		color: #be3e3e;
		text-decoration: underline;
		background: #d323233b;
	}
`;

export default About;
