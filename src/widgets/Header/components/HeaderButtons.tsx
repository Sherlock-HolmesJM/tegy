import styled from "@emotion/styled";
import { MenuIcon } from "./MenuIcon";

export const HeaderButtons = () => {
  return (
    <Section className="gs-header-item">
      <MenuIcon />
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  gap: 20px;
  align-items: center;
`;
