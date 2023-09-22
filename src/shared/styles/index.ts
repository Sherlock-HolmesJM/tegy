import { css } from "@emotion/react";

export * from "./media";

export const BgSpread = (color: string, size = 100) => css`
  background-color: ${color};
  box-shadow: 0 0 0 ${size}vmax ${color};
  clip-path: inset(0 -${size}vmax);
`;
