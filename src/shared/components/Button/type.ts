import { TypographyProps } from "../Typography"
import { ButtonProps as MUIButtonProps } from "@mui/material"

export interface ButtonProps
  extends Omit<MUIButtonProps, "content">,
    Pick<TypographyProps, "typo" | "content"> {}
