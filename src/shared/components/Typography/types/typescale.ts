import { FontFamilies } from "../constants"

type FontSize = number
type Weight = "b" | "m" | "r" | "s"
type LineHeight = number
type FontFamily = keyof typeof FontFamilies

type TS1A = `${FontSize}${Weight}${LineHeight}`
type TS1B = `${FontSize}${Weight}${LineHeight}-${FontFamily}`

type TS2A = `${FontSize}${Weight}`
type TS2B = `${FontSize}${Weight}-${FontFamily}`

export type TypeScaleStr = TS1A | TS1B | TS2A | TS2B
