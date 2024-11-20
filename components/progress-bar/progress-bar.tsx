/* eslint-disable tailwindcss/no-custom-classname */
"use client"

import type React from "react"

import styles from "./progress-bar.module.css"

const ProgressBar: React.FC = () => {
  const totalLines = 32

  return (
    <div className={styles.tierProgressBar}>
      <div className={styles.tierProgress}>
        <div className={styles.tierProgressMain}>
          <div className={styles.box} style={{ width: "76%" }}>
            <div className="box-inner">
              <div className={styles.tierProgressBar}>
                <div className={styles.tierProgressBarLabels}>
                  <span>0</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100</span>
                </div>
                <div className={styles.tierProgressBarLines}>
                  {Array.from({ length: totalLines }, (_, i) => (
                    <div key={i} className={styles.line} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
