"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

type CardType = {
  title: string
  description: string
  src: string
  href: string
}

export const Card = React.memo(function Card({
  card,
  index,
  hovered,
  setHovered,
  href,
}: {
  card: CardType
  index: number
  hovered: number | null
  setHovered: React.Dispatch<React.SetStateAction<number | null>>
  href: string
}) {
  const router = useRouter()

  return (
    <div
      className="relative size-full overflow-hidden"
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => router.push(href)}
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          router.push(href)
        }
      }}
      onKeyUp={(e) => {
        if (e.key === " ") {
          e.preventDefault()
          router.push(href)
        }
      }}
    >
      {/* Image */}
      <Image
        src={card.src}
        alt={card.title}
        fill
        className={cn(
          "absolute inset-0 object-cover transition-all duration-500",
          hovered === index ? "filter-none" : "grayscale"
        )}
      />

      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          hovered === index ? "opacity-0" : "opacity-100"
        )}
        style={{
          zIndex: 1,
          background: "linear-gradient(0deg, black 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div
        className={cn(
          "absolute bottom-0 left-0 z-20 p-4 transition-opacity duration-500"
        )}
      >
        <h2 className="text-xl font-bold text-white">{card.title}</h2>
        <p className="text-sm text-white">{card.description}</p>
      </div>
    </div>
  )
})

export function FocusCards({ cards }: { cards: CardType[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="grid size-full grid-cols-4 gap-2.5">
      {cards.map((card, index) => (
        <Card
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          href={card.href}
        />
      ))}
    </div>
  )
}
