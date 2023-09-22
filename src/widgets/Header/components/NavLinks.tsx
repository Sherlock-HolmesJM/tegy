import styled from "@emotion/styled"
import { NavLink } from "./NavLinkItem"
import { headerClasses, NavList } from "../constants"
import { media } from "@/shared/styles"

export const NavLinks = () => {
  return (
    <Ul>
      {NavList.map((item, idx) => (
        <NavLink {...item} key={idx} className={headerClasses.item} />
      ))}
    </Ul>
  )
}

const Ul = styled.ul`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 0;
  margin: 0;
  perspective: 800px;

  ${media.md} {
    display: none;
  }
`
