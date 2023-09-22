export const ArrowDown = ({ open, show = true }: { open: boolean; show?: boolean }) => {
  if (!show) return <></>

  return (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.1284 1L7.48197 6.6464C7.28671 6.8417 6.97013 6.8417 6.77487 6.6464L1.12842 1"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}
