import { useEffect, useRef } from "react"

export const useDisableBodyScroll = (disableScroll: boolean) => {
  const preOverflowRef = useRef<string>("")

  useEffect(() => {
    const body = window.document.body

    if (disableScroll) {
      preOverflowRef.current = body.style.overflow // store current overflow, before setting it to hidden

      body.style.overflow = "hidden"
      // body.style.paddingRight = "4px" // add padding conditionally, based on if we had overflow before
    } else {
      body.style.overflow = preOverflowRef.current // restore previous overflow value
      // body.style.paddingRight = "unset"
    }
  }, [disableScroll])
}
