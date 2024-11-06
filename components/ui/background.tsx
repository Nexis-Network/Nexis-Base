// biome-ignore lint/style/useImportType: <explanation>
import React from "react"
import Spline from "@splinetool/react-spline"

const Background: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <Spline scene="https://prod.spline.design/h81XsZ5KCfaNn3nM/scene.splinecode" />
    </div>
  )
}

export default Background
