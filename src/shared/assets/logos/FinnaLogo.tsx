type Props = { color?: string; className?: string; gradientId?: string }

export const FinnaLogo = ({ color, gradientId = "a", className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={140}
      height={38}
      fill="none"
      className={className}
    >
      <path
        fill={color || `url(#${gradientId})`}
        fillRule="evenodd"
        d="M18.8 37.8a18.8 18.8 0 1 0 0-37.6 18.8 18.8 0 0 0 0 37.6Zm-3.7-9.2-5.4-1.4V9.4l8.1 2.1v13.6l-2.7-.7v4.2Zm10.2 0-5.4-1.4V9.4l8 2.1v13.6l-2.6-.7v4.2Z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        d="M49.5 15.6v-5.1h8.2V7.8h-8.2V4.7H58V2H46.5v13.6h3ZM62 4.4V2h-3.1v2.4h3Zm0 11.2V5.4h-3.1v10.2h3ZM66.2 15.6v-5.2c0-1.7.7-2.5 2.6-2.5 1.9 0 2.6.7 2.6 2.4v5.3h3V9.2c0-2.2-1.3-4-4.1-4-2.7 0-3.9 1.6-4.2 3.3H66V5.4H63v10.2h3ZM78.6 15.6v-5.2c0-1.7.7-2.5 2.6-2.5 1.9 0 2.6.7 2.6 2.4v5.3h3V9.2c0-2.2-1.3-4-4-4-2.8 0-4 1.6-4.2 3.3h-.2V5.4h-2.9v10.2h3ZM91 15.8c2.3 0 3.8-1 4.2-2.6h.2v2.4h2.9v-6c0-2.7-1.7-4.4-5-4.4-3.4 0-5.5 1.7-5.5 4.3h3c0-1.2.7-1.6 2.2-1.6 1.6 0 2.2.3 2.2 1.7v.3l-4.3.5c-2.2.2-3.3 1.2-3.3 2.7 0 1.7 1.3 2.7 3.5 2.7Zm-.4-3c0-.4.4-.6 1.1-.7l3.5-.4c0 1.4-1.2 2-3.2 2-1 0-1.4-.3-1.4-.8ZM49.8 35.1v-4.2h4.6c3.5 0 5.7-2 5.7-5.5S58 20 54.4 20h-8V35h3.4Zm4.2-12c1.9 0 2.8.5 2.8 2.3 0 2-1 2.5-2.8 2.5h-4.2V23H54ZM64.3 35.1v-6.6c0-1.4.5-2 2-2 1.4 0 1.9.5 1.9 1.7v1.2h3.4v-1.9c0-2.2-1-4-3.6-4-2.3 0-3.5 1.5-3.8 3.3H64v-3H61V35h3.4ZM78.4 35.3c3.9 0 6.5-2.3 6.5-5.9 0-3.6-2.6-5.8-6.5-5.8s-6.5 2.2-6.5 5.8c0 3.6 2.6 6 6.5 6Zm0-3c-2.3 0-3.1-.9-3.1-2.9s.8-2.9 3.1-2.9 3 1 3 3-.7 2.8-3 2.8ZM93.8 35.1v-3h-2c-1.3 0-1.7-.3-1.7-1.5v-4h3.7v-2.8H90v-2.2h-3.4v2.2H85v2.8h1.8V31c0 2.9 1.6 4.1 4.3 4.1h2.8ZM100.6 35.3c3.9 0 6.5-2.3 6.5-5.9 0-3.6-2.6-5.8-6.5-5.8-3.8 0-6.4 2.2-6.4 5.8 0 3.6 2.6 6 6.4 6Zm0-3c-2.3 0-3-.9-3-2.9s.7-2.9 3-2.9 3.1 1 3.1 3-.8 2.8-3 2.8ZM114 35.3c3.7 0 6.2-2 6.2-4.9v-.3h-3.4v.2c0 1.5-1 2-2.8 2-2 0-3-.8-3-2.9 0-2 1-2.8 3-2.8 1.7 0 2.8.5 2.8 2v.1h3.4v-.3c0-3-2.5-4.8-6.2-4.8-3.8 0-6.3 2.2-6.3 5.8 0 3.6 2.5 6 6.3 6ZM127.2 35.3c3.9 0 6.5-2.3 6.5-5.9 0-3.6-2.6-5.8-6.5-5.8s-6.5 2.2-6.5 5.8c0 3.6 2.6 6 6.5 6Zm0-3c-2.3 0-3-.9-3-2.9s.7-2.9 3-2.9 3.1 1 3.1 3-.8 2.8-3 2.8ZM138 35.1V20h-3.4V35h3.4Z"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="18.8"
          x2="18.8"
          y1=".2"
          y2="37.8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0085FF" />
          <stop offset=".5" stopColor="#27C9B5" />
          <stop offset={1} stopColor="#C9FF55" />
        </linearGradient>
      </defs>
    </svg>
  )
}
