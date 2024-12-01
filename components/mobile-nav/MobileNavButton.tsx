"use client"

import type { KeyboardEvent } from "react"

import { cn } from "@/lib/utils"

interface MobileNavButtonProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

export default function MobileNavButton({
  isOpen,
  onClick,
  className,
}: MobileNavButtonProps) {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      onClick()
    }
  }

  return (
    <button
      type="button"
      className={cn("relative", className)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label="Toggle mobile menu"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <title>Menu icon</title>
        <path d="M0 5H24V7H0V5Z" fill="currentColor" />
        <path d="M0 11H24V13H0V11Z" fill="currentColor" />
        <path d="M12 17H24V19H12V17Z" fill="currentColor" />
      </svg>
    </button>
  )
}
