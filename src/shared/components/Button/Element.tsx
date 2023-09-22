import { css } from "@mui/material"
import MUIButton from "@mui/material/Button"
import { FC } from "react"
import { ButtonProps } from "./type"
import { usePropReducer } from "../Typography"
import styled from "@emotion/styled"

export const Button: FC<ButtonProps> = ({ typo, children, content, ...rest }) => {
  const reducedProps = usePropReducer(typo, content)

  children = children ?? reducedProps.content

  return (
    <ButtonElement css={css(reducedProps.typoObj)} {...rest}>
      {children}
    </ButtonElement>
  )
}

const ButtonElement = styled(MUIButton)`
  text-transform: none;
`
