import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Logo = () => {
  return <StyledLink to="/">Tegy</StyledLink>;
};

const StyledLink = styled(Link)`
  font-family: "Lilita One", cursive;
  font-size: 40px;
`;
