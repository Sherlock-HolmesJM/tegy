import { DetailedHTMLProps, ElementType, HTMLAttributes } from "react"

export type HTMLElementProps = Omit<HTMLDivProps, "color" | "content" | "dangerouslySetInnerHTML">

type HTMLDivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type AsProp = ElementType<any> | undefined
