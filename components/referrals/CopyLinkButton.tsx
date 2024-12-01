"use client"

import type * as React from "react"

export const CopyLinkButton: React.FC = () => {
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
  }
  return (
    <button
      type="button"
      onClick={handleCopyLink}
      className="mt-2.5 w-full rounded border border-solid border-lime-300/50 bg-lime-300/30 px-6 py-3 text-sm uppercase leading-none tracking-wide bg-blend-normal"
      aria-label="Copy referral link"
    >
      COPY LINK
    </button>
  )
}
