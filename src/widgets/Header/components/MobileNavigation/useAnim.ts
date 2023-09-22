"use client"

import { RefObject, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useDisableBodyScroll } from "@/shared/hooks/useDisableScroll"

type ModalElement = any

type Animation = gsap.core.Timeline

export const useModalLeft = (ref: RefObject<HTMLDivElement>, reveal = false) => {
  const animRef = useRef<Animation | undefined>(undefined)
  // const []

  useDisableBodyScroll(reveal)

  useEffect(() => {
    const anim = animRef.current

    if (reveal && anim) anim.play()
    else if (!reveal && anim) anim.reverse()
  }, [reveal])

  useEffect(() => {
    const parent = ref.current as ModalElement

    if (!parent) return

    // setCanUnmount(false) // Don't unmount immediately 'reveal' is false.

    const tl = gsap.timeline({
      paused: true,
      // onReverseComplete: handleUnmount(parent), // Now you can unmount.
    })

    animRef.current = tl

    // tl.fromTo(parent, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.set(parent, { autoAlpha: 1 })
    tl.fromTo(
      parent,
      { xPercent: 100 },
      {
        xPercent: 0,
        ease: "power1.Out",
        duration: 0.2,
      }
    )

    // eslint-disable-next-line
  }, [ref])

  return reveal
}
