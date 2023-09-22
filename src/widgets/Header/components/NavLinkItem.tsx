import { FC, useRef, useState } from "react";
import styled from "@emotion/styled";
import { LinkItemProps } from "../type";
import { media } from "@/shared/styles";
import { ColorProps, color } from "styled-system";
import { NavLinkMenu } from "./NavLinkMenu";
import { ArrowDown } from "./ArrowDown";
import * as styles from "../styles";
import { useLocation } from "react-router-dom";

export const NavLink: FC<LinkItemProps> = ({ name, className, href = {}, list, getList, onClick }) => {
  const ref = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  className = `${className || ""} gs-header-item`;

  const isActive = pathname === href.pathname;
  const color = isActive ? "lime" : "grey";
  list = getList ? getList({ pathname }) : list;

  // if it's not a Link then it's a List.
  const isLink = Boolean(href.pathname || href.href);

  const handleClick = (e: any) => {
    if (!isLink) setOpen(true);

    if (onClick) onClick();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Li className={className} color={color} ref={ref}>
      {isLink && (
        <styles.StyledLink to={href.href || href.pathname || ""} target={href.target} onClick={handleClick}>
          {name}
        </styles.StyledLink>
      )}

      {!isLink && (
        <styles.StyledButton href={href.href || href.pathname} onClick={handleClick}>
          {name} <ArrowDown open={open} />
        </styles.StyledButton>
      )}

      {!isLink && <NavLinkMenu anchorEl={ref.current} open={open} onClose={handleClose} list={list} />}
    </Li>
  );
};

const Li = styled.li<ColorProps>`
  position: relative;
  list-style-type: none;

  ${color}

  ${media.md} {
    max-width: 410px;
    width: 100%;
  }
`;
