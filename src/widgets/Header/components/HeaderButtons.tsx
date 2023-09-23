import styled from "@emotion/styled";
import { MenuIcon } from "./MenuIcon";
import { AuthButton } from "./AuthButton";

export const HeaderButtons = () => {
  return (
    <Section className="gs-header-item">
      <AuthButton />
      <MenuIcon />
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  gap: 20px;
  align-items: center;
`;
