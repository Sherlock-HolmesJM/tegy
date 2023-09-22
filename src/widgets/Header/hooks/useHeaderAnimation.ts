import { useEffect } from "react"
import { gsap } from "gsap"

export const useHeaderAnimation = () => {
  useEffect(() => {
    const children = ".gs-header-item"

    const ctx = gsap.context(() => {
      gsap.from(children, {
        x: 100,
        rotationX: 90,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        repeat: -1,
        repeatDelay: 1,
        ease: "back",
      })
    })

    return () => ctx.revert()
  }, [])
}
