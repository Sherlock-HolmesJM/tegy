import { CSSProperties, ReactNode } from "react"
import { FontFamilies, FontWeights } from "../constants"
import { AsProp, HTMLElementProps } from "./reactProps"
import { TypeScaleStr } from "./typescale"

export interface TypographyProps extends HTMLElementProps {
  typo?: Typo
  content?: ContentType
  children?: ReactNode
  className?: string
  id?: string
  dangerouslySetInnerHTML?: string
  style?: CSSProperties
  as?: AsProp
  debug?: boolean
}

export type Typo = TypeScaleStr | ResponsiveProp<TypeScaleStr>

export type ContentType = ReactNode | ResponsiveProp<ReactNode>

export type ResponsiveProp<Type> = {
  lg?: Type
  lg14?: Type
  lg13?: Type
  md?: Type
  sm?: Type
  xs?: Type
}

export type FontFamilyKey = keyof typeof FontFamilies

export type FontWeightKey = keyof typeof FontWeights
