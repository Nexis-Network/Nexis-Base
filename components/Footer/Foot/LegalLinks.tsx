import React from "react"

export const LegalLink: React.FC = () => {
  return (
    <div className="my-auto flex gap-1 whitespace-nowrap leading-none">
      <a
        href="#"
        className="grow hover:text-[#F2F4F3] focus:outline-none focus:ring-2 focus:ring-[#F2F4F3]"
      >
        Legal
      </a>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e55bb658c658a51243f675cf44f8393a5ee6e979949d8d06378485fa23ba630?placeholderIfAbsent=true&apiKey=d3a09a2fda7941e0a2c87f17f318ba21"
        alt=""
        className="aspect-square w-4 shrink-0 self-start object-contain bg-blend-normal"
      />
    </div>
  )
}
