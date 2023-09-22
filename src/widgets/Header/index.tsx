import styled from "@emotion/styled"
import { NavLinks } from "./components/NavLinks"
import { HeaderButtons } from "./components/HeaderButtons"
import { MobileNavigation } from "./components/MobileNavigation"
import { Logo } from "./components/Logo"
// import { useHeaderAnimation } from "./hooks/useHeaderAnimation"

export const Header = () => {
  const className = "header-container finna-header-element gs-header"

  // useHeaderAnimation()

  const handleMouseLeave = (e: any) => {
    if (e.target.matches(`.${className}`)) {
    }
  }

  return (
    <>
      <HeaderElement onMouseLeave={handleMouseLeave} className={className}>
        <Logo />

        <NavLinks />

        <HeaderButtons />
      </HeaderElement>

      <MobileNavigation />
    </>
  )
}

const HeaderElement = styled.header`
  position: sticky;
  top: 0;
  z-index: 5;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.89);
  backdrop-filter: blur(8.5px);
  transition: 0.4s ease-in-out;
  perspective: 800px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`
