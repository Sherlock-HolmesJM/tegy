import { ReactNode } from "react"
import { ContentType, ResponsiveProp, TypeScaleStr, Typo } from "./types"
import { isResponsiveProp, reduceProp, typographyProps } from "./utilities"
import useDevice from "@/shared/hooks/useDevice"
import { media } from "@/shared/styles"

export const usePropReducer = (typo?: Typo, content?: ContentType) => {
  const device = useDevice()

  let typoObj: Record<string, any> = {}

  if (typeof typo === "object" && isResponsiveProp(typo)) {
    const { lg, lg14, lg13, md, sm, xs } = typo as ResponsiveProp<TypeScaleStr>

    if (lg) typoObj = typographyProps(lg)
    if (lg14) typoObj[media.lg14] = typographyProps(lg14)
    if (lg13) typoObj[media.lg13] = typographyProps(lg13)
    if (md) typoObj[media.md] = typographyProps(md)
    if (sm) typoObj[media.sm] = typographyProps(sm)
    if (xs) typoObj[media.xs] = typographyProps(xs)
  } else {
    typoObj = typographyProps(typo as TypeScaleStr)
  }

  return {
    content: reduceProp<ReactNode>(device, content),
    typoObj,
  }
}
