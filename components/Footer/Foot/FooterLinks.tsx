import type { FC } from "react"

const links = [
  "Home",
  "Documentation",
  "Guides",
  "Community",
  "Blog",
  "Telegram",
  "X",
]

export const FooterLinks: FC = () => {
  return (
    <nav className="flex flex-auto flex-wrap gap-10 leading-none">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed8058ca30fdc69bf34739ce82fdfe888822b9cff122c3b387fa6c9b4a8ed245?placeholderIfAbsent=true&apiKey=d3a09a2fda7941e0a2c87f17f318ba21"
        alt=""
        className="aspect-[3.41] w-[75px] shrink-0 object-contain bg-blend-normal"
      />
      {links.map((link) => (
        <a
          key={link}
          href={`/${link.toLowerCase()}`}
          className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          {link}
        </a>
      ))}
    </nav>
  )
}
