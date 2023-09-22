import { Button } from "@/shared/components";
import { media } from "@/shared/styles";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 18px;
  font-family: Inter;
  font-weight: 500;
  line-height: 28px;
  color: inherit;

  text-transform: none;

  &::first-letter {
    text-transform: capitalize;
  }

  ${media.md} {
    padding-inline: 0px;
  }
`;

export const StyledLink = StyledButton.withComponent(Link);
