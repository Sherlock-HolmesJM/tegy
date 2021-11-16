import { useState } from "react";
import styled from "styled-components";
import Container, { Box } from "./base";

function About() {
	const [close, setClose] = useState(false);

	if (close) return null;

	return (
		<Container onClick={() => setClose(true)}>
			<Wrapper ctheme={window.theme}>
				<div>Tegy: a simple budget tracker</div>

				<div>
					Tegy keeps record of the <span>incomes</span> and{" "}
					<span>expenses</span> of your budget in <span>batches</span>, though
					you can use only one batch, the default batch, if you like. That's all
					it is. Nothing more.
				</div>

				<div>
					You can use Tegy as your rough record, later, write it down in your
					book; or use it as your main budget recorder. Either way, with Tegy,
					you'll never have a messy record.
				</div>

				<div>And you can have multiple budgets.</div>

				<div>So, what are you waiting for? Give Tegy a try.</div>
			</Wrapper>
		</Container>
	);
}

const Wrapper = styled(Box)`
	text-align: justify;

	div {
		color: #1d5970;
	}

	div:last-child {
		color: #297e29;
	}

	/* span {
		color: red;
	} */
`;

export default About;
