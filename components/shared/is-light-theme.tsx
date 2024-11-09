"use client"

import type { ReactNode } from "react"
import { useTheme } from "next-themes"

interface IsMidnightThemeProps {
  children: ReactNode
}

export const IsMidnightTheme = ({ children }: IsMidnightThemeProps) => {
  const { resolvedTheme } = useTheme()

  if (resolvedTheme === "midnight") return <>{children}</>

  return null
}
