import { Typography } from "@/shared/components";
import styled from "@emotion/styled";
import { RegisterForm } from "./components/RegisterForm";

const Register = () => {
  return (
    <Main>
      <Title typo="30b38" content="Get started with Tegy" />

      <Text
        typo="14s20"
        content={
          <span>
            Get started in only a few minutes. Already have an account? <a content="Sign In" />
          </span>
        }
      />

      <RegisterForm />
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block-start: 80px;
  height: 100%;
`;

const Title = styled(Typography)`
  margin-block-end: 10px;
`;

const Text = styled(Typography)`
  color: var(--grey4);
  margin-block-end: 40px;
`;

export default Register;
