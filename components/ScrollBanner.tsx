import React from "react"

import styles from "@/components/NavMenu/navmenu.module.css"

interface ScrollBannerProps {
  text: string
}

export function ScrollBanner({ text }: ScrollBannerProps) {
  return (
    <div className={styles.scrollbanner}>
      <div className={styles.scrollbar}>
        <span>{text}</span>
      </div>
    </div>
  )
}
