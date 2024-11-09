import type React from "react"

import "./progress.css" // Import the CSS file

interface ProgressBarProps {
  percent: number // Progress percentage (0 to 100)
  className?: string
  [key: string]: unknown // Allow additional props if needed
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  className,
  ...props
}) => {
  const totalLines = 34 // Total number of lines in the progress bar
  const filledLines = Math.round((percent / 100) * totalLines) // Calculate the number of filled lines
  return (
    <div className={`${className ?? ""}`} {...props}>
      <div className="">
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
      <div className="tier-progress-bar-lines w-3/4" data-percent={percent}>
        {Array.from({ length: totalLines }).map((_, index) => (
          <div
            key={`line-${index}-${percent}`}
            className={`line ${index < filledLines ? "filled" : ""}`}
          />
        ))}
      </div>
    </div>
  )
}
