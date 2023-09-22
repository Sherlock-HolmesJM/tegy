import { FC } from "react"
import styled from "@emotion/styled"
import { TypographyProps } from "./types/typography"
import { usePropReducer } from "./usePropReducer"
import { css } from "@emotion/react"

export const Typography: FC<TypographyProps> = ({
  children,
  dangerouslySetInnerHTML,
  content,
  typo,
  debug,
  ...rest
}) => {
  const reducedProps = usePropReducer(typo, content)

  children = children ?? reducedProps.content

  if (dangerouslySetInnerHTML) {
    dangerouslySetInnerHTML = {
      __html: dangerouslySetInnerHTML,
    } as any
  }

  return (
    <TextElement
      css={css(reducedProps.typoObj)}
      {...rest}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML as any}
    >
      {children}
    </TextElement>
  )
}

const TextElement = styled("p")``
