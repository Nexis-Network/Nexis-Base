import type React from "react"

import styles from "./CustomButton.module.css"

// ...rest of the component

interface ButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "tertiary"
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  return (
    <button className={`${styles.btn} ${styles[`btn-${variant}`]}`} {...props}>
      {children}
    </button>
  )
}

export default CustomButton
