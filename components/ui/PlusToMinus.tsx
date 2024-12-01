import { useState } from "react"
import { motion } from "framer-motion"

type PlusToMinusProps = {
  isAnswerVisible: boolean
}

const PlusToMinus = ({ isAnswerVisible }: PlusToMinusProps) => {
  const [isMinus, setIsMinus] = useState(false)

  const handleClick = () => {
    setIsMinus(!isMinus)
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={handleClick}
      style={{ cursor: "pointer", display: "inline-block" }}
    >
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="14"
          height="2.8"
          rx="1.4"
          transform="matrix(1 0 0 -1 0 9.39804)"
          fill="black"
        />
        <motion.rect
          width="14"
          height="2.8"
          rx="1.4"
          transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 8.39844 14.998)"
          fill="black"
          initial={{ opacity: 1 }}
          animate={{ opacity: isAnswerVisible ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </svg>
    </div>
  )
}

export default PlusToMinus
