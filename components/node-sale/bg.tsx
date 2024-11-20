// biome-ignore lint/style/useImportType: <explanation>
import React from "react"
import Spline from "@splinetool/react-spline"

import { Spotlight } from "../ui/spotlight"

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
      <Spotlight className="ml-60 opacity-50" />
      <Spline scene="https://prod.spline.design/8jrPb9C5-ljI9CCB/scene.splinecode" />
    </div>
  )
}

export default Background
