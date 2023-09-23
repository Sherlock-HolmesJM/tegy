import { FC } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { TypographyProps } from "./types/typography";
import { usePropReducer } from "./usePropReducer";

export const Typography: FC<TypographyProps> = ({
  children,
  dangerouslySetInnerHTML,
  content,
  typo,
  debug,
  ...rest
}) => {
  const reducedProps = usePropReducer(typo, content);

  children = children ?? reducedProps.content;

  if (dangerouslySetInnerHTML) {
    dangerouslySetInnerHTML = {
      __html: dangerouslySetInnerHTML,
    } as any;
  }

  const style = css(reducedProps.typoObj);

  return (
    <TextElement css={style} {...rest} dangerouslySetInnerHTML={dangerouslySetInnerHTML as any}>
      {children}
    </TextElement>
  );
};

const TextElement = styled("p")``;
