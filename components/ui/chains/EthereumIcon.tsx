import type React from "react"

const EthereumIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 84 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Ethereum icon</title>
      <circle cx="42" cy="42" r="42" fill="#F6F6F6" />
      <path
        d="M41.9969 15L41.6255 16.2306V51.9366L41.9969 52.2981L58.9895 42.501L41.9969 15Z"
        fill="#343434"
      />
      <path
        d="M41.993 15L25 42.501L41.993 52.2981V34.9674V15Z"
        fill="#8C8C8C"
      />
      <path
        d="M41.9969 55.436L41.7876 55.685V68.404L41.9969 69.0001L58.9999 45.644L41.9969 55.436Z"
        fill="#3C3C3B"
      />
      <path
        d="M41.993 69.0001V55.436L25 45.644L41.993 69.0001Z"
        fill="#8C8C8C"
      />
      <path
        d="M41.9907 52.2975L58.9833 42.5005L41.9907 34.9668V52.2975Z"
        fill="#141414"
      />
      <path d="M25 42.5005L41.993 52.2975V34.9668L25 42.5005Z" fill="#393939" />
    </svg>
  )
}

export default EthereumIcon
