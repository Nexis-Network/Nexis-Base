import React from "react"

export const SystemStatus: React.FC = () => {
  return (
    <div className="flex gap-1.5 text-lime-300">
      <div className="my-auto flex size-2 shrink-0 animate-pulse rounded-[100px] bg-lime-300 bg-blend-normal" />
      <div className="basis-auto pr-5">All systems normal</div>
    </div>
  )
}
