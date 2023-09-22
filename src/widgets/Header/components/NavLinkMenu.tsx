import { LinkItemProps } from "../type";
import * as styles from "../styles";
import styled from "@emotion/styled";
import { useOnClickOutside } from "@/shared/hooks";
import { useRef } from "react";
import { useMobileNav } from "../hooks/useMoileNav";

interface Props {
  anchorEl: HTMLElement | null;
  open: boolean;
  list?: LinkItemProps[];
  onClose: () => void;
}

export const NavLinkMenu = ({ open, onClose, anchorEl, list = [] }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const { mutate } = useMobileNav();

  useOnClickOutside(ref, onClose);

  const handleClick = () => {
    mutate(false);
    onClose();
  };

  if (!open) return <></>;

  return (
    <StyledPopper ref={ref as any}>
      {list.map((item, idx) => {
        const { href = {}, name } = item;

        return (
          <StyledLink
            key={String(name) + idx}
            to={href.href || href.pathname || ""}
            target={href.target}
            onClick={handleClick}
          >
            {name}
          </StyledLink>
        );
      })}
    </StyledPopper>
  );
};

const StyledPopper = styled.div`
  position: absolute;
  z-index: 2;
  background-color: black;
  box-shadow: 2px 2px 2px grey;
  border-radius: 5px;
  min-width: 150px;
`;

const StyledLink = styled(styles.StyledLink)`
  width: 100%;
  padding: 4px 20px !important;
  transition: 0.3s ease-in-out;

  &:first-of-type {
    padding-block-start: 5px;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
  }

  &:last-of-type {
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: inherit;
    padding-block-end: 5px;
  }

  &:only-child {
    border-radius: inherit;
    padding-block: 5px;
  }

  &:hover {
    background-color: green;
    color: white;
  }
`;
