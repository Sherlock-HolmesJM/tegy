import Button from "../common/button";
import Input from "../common/input";
import { ModalWrapper } from "./base";

interface Props {}

function SignUp(props: Props) {
	const {} = props;

	return (
		<ModalWrapper theme={window.theme} title="Sign-in">
			<Input placeholder="email" type="email" />
			<Input placeholder="password" type="password" />

			<div>
				<Button>sign-in</Button>
				<Button>cancel</Button>
			</div>
		</ModalWrapper>
	);
}

export default SignUp;
