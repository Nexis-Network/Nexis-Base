import type React from "react"

const CustomBtn: React.FC = () => {
  return (
    <button
      type="button"
      className="fixed bottom-[30px] left-[30px] z-10 rounded-full border border-lime-300/40 bg-lime-300/30 text-lime-300"
    >
      Click Me
    </button>
  )
}

export default CustomBtn
