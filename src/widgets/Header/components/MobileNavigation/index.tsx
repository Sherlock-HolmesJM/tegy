import styled from "@emotion/styled"
import { NavList } from "../../constants"
import { NavLink } from "../NavLinkItem"
import { useMobileNav } from "../../hooks/useMoileNav"
import { useModalLeft } from "./useAnim"
import { useRef } from "react"
import { media } from "@/shared/styles"
import { LinkItemProps } from "../../type"

export const MobileNavigation = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { data, mutate } = useMobileNav()

  const canUnmount = useModalLeft(ref, data)

  const handleClose = ({ href = {} }: LinkItemProps) => {
    const isLink = Boolean(href.pathname || href.href)

    if (!isLink) return

    mutate(false)
  }

  return (
    <Wrapper ref={ref}>
      {NavList.map((item) => (
        <NavLink key={item.name} {...item} onClick={() => handleClose(item)} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.aside`
  display: none;

  ${media.md} {
    z-index: 4;
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100vh;
    background: rgba(0, 0, 0, 0.89);
    backdrop-filter: blur(8.5px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
    width: min(400px, 100%);
    opacity: 0;
    padding: 40px;
    padding-block-start: calc(var(--header-height) * 1.4);
    visibility: hidden;
  }
`
