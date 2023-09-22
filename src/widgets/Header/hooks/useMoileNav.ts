import useDevice from "@/shared/hooks/useDevice"
import useSWRLocal from "swr/immutable"

export const useMobileNav = () => {
  const { md } = useDevice()
  const state = useSWRLocal<boolean>("header-mobile-nav")

  return {
    data: state.data,
    mutate: (value?: boolean) => {
      if (md) state.mutate(value)
    },
  }
}
