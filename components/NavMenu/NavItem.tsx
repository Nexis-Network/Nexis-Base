import * as React from "react"

import styles from "./navmenu.module.css"

interface NavItemProps {
  label: string
  className?: string
}

export function NavItem({ label, className }: NavItemProps) {
  return <span className={styles.menuText}>{label}</span>
}
