/* eslint-disable react/jsx-no-comment-textnodes */
import type React from "react"

import { ArrowRight } from "../icons/arrow-right"
import HyperText from "../ui/hyper-text"
import styles from "./styles.module.css"

const VestingButton: React.FC = () => {
  return (
    <div>
      <div className="fixed bottom-[30px] left-[30px] mr-[30px] flex gap-4">
        <button
          type="button"
          className="flex items-center justify-start space-x-2 rounded-sm border-x border-white/40  bg-[#0a0a0a] px-6 py-2 text-[14px] text-white/70 hover:border-lime-300 hover:text-white"
        >
          <HyperText text="WITHDRAW NZT" />
          <ArrowRight />
        </button>
        <button
          type="button"
          className="flex items-center justify-start space-x-2 rounded-sm border-x border-white/40  bg-[#0a0a0a] px-6 py-2 text-[14px] text-white/70 hover:border-lime-300 hover:text-white"
        >
          <HyperText text="DELEGATE NZT" />
          <ArrowRight />
        </button>
      </div>
      <div className="fixed bottom-[40px] right-[40px] flex flex-col gap-2">
        {/* biome-ignore lint/suspicious/noCommentText: <explanation> */}
        <h1 className={styles.textcss}>/// Discover Nexis</h1>
        <button
          type="button"
          className="flex w-full items-center space-x-2 rounded-none border-b border-white/40 bg-[#0a0a0a] py-2 pl-2 pr-6 text-[14px] text-white/70 hover:border-white hover:text-white"
        >
          <HyperText text="DISCOVER" />
          <ArrowRight />
        </button>
        <button
          type="button"
          className="flex items-center justify-start space-x-2 rounded-none border-b border-white/40 bg-[#0a0a0a] py-2 pl-2 pr-6 text-[14px] text-white/70 hover:border-white hover:text-white"
        >
          <HyperText text="DELEGATE NZT" />
          <ArrowRight />
        </button>
        <button
          type="button"
          className="flex items-center space-x-2 rounded-none border-b border-white/40 bg-[#0a0a0a] py-2 pl-2 pr-6 text-[14px] text-white/70 hover:border-white hover:text-white"
        >
          <HyperText text="BECOME A VALIDATOR" />
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}

export default VestingButton
