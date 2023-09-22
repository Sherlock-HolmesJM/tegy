import { useState } from "react"
import { sizes as mediaSizes } from "@/shared/styles"
import { useIsomorphicLayoutEffect } from "./usehooks-ts/useIsomorphicLayoutEffect"

interface Config {
  sizes?: typeof mediaSizes
  media?: "max-width" | "min-width" | "exact"
}

export const useDevice = (config?: Config) => {
  const s = typeof window !== "undefined" ? window.screen : { width: 0, height: 0 }

  const [screen, setScreen] = useState({ width: s.width, height: s.height })

  const { sizes = mediaSizes, media = "max-width" } = config ?? {}

  const handleSize = () => {
    setScreen({ width: window.screen.width, height: window.screen.height })
  }

  useIsomorphicLayoutEffect(() => {
    handleSize()

    window.addEventListener("resize", handleSize)

    return () => window.removeEventListener("resize", handleSize)
  }, [])

  // Note: this outcome is based on css @media (max-width: xxx)  logic. Default Logic.
  let matches = {
    xs: screen.width > 0 && screen.width <= sizes.xs,
    sm: screen.width > 0 && screen.width <= sizes.sm,
    md: screen.width > 0 && screen.width <= sizes.md,
    lg13: screen.width > 0 && screen.width <= sizes.lg13,
    lg14: screen.width > 0 && screen.width <= sizes.lg14,
    lg: screen.width > 0 && screen.width <= sizes.lg,
    xl: screen.width > 0 && screen.width <= sizes.xl,
    media,
    ...screen,
  }

  if (media === "exact") {
    matches = {
      ...matches,
      xs: screen.width > 0 && screen.width <= sizes.xs,
      sm: screen.width > sizes.xs && screen.width <= sizes.sm,
      md: screen.width > sizes.sm && screen.width <= sizes.md,
      lg: screen.width > sizes.md && screen.width <= sizes.lg,
      xl: screen.width > sizes.lg && screen.width <= sizes.xl,
    }
  }
  // Note: this outcome is based on css @media screen and (min-width: xxx)  logic.
  else if (media === "min-width") {
    matches = {
      ...matches,
      xs: screen.width > 0 && screen.width <= sizes.sm,
      sm: screen.width > 0 && screen.width > sizes.xs,
      md: screen.width > 0 && screen.width > sizes.sm,
      lg: screen.width > 0 && screen.width > sizes.md,
      xl: screen.width > 0 && screen.width > sizes.lg,
    }
  }

  return matches
}

export default useDevice
