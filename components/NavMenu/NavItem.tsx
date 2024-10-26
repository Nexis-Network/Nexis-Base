import * as React from "react"

interface NavItemProps {
  label: string
  className?: string
}

export function NavItem({ label, className }: NavItemProps) {
  return <span className={className}>{label}</span>
}
