// biome-ignore lint/style/useImportType: <explanation>
import React from "react"
import Spline from "@splinetool/react-spline"

const Background: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    >
      <Spline scene="https://prod.spline.design/lKJocqSa4kEyvRv3/scene.splinecode" />
    </div>
  )
}

export default Background
