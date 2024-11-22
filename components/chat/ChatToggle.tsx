import type React from "react"

import { Button } from "../ui/button"

interface ChatToggleProps {
  isOpen: boolean
  onClick: () => void
  className?: string // Add this line
}

const ChatToggle: React.FC<ChatToggleProps> = ({
  isOpen,
  onClick,
  className,
}) => {
  return (
    <Button
      onClick={onClick}
      size="sm"
      className={`group flex items-center bg-[#0a0a0a] p-2 hover:bg-[#0a0a0a] ${
        className ?? ""
      }`}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 text-neutral-400 group-hover:text-white group-active:text-white"
        >
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            fill="currentColor"
          />
        </svg>
      ) : (
        // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 text-zinc-500 group-hover:text-white group-active:text-white"
        >
          <path
            d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
            fill="currentColor"
          />
        </svg>
      )}
      <span className="border-r border-zinc-500 pr-4 text-zinc-500 group-hover:text-white group-active:text-white">
        Chat
      </span>
    </Button>
  )
}

export default ChatToggle
