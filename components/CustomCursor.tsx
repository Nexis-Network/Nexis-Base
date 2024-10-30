/* eslint-disable tailwindcss/no-custom-classname */
"use client"

import React, { useEffect, useRef, useState } from "react"

const CustomCursor: React.FC = () => {
  const cursorWrapperRef = useRef<HTMLDivElement>(null)
  const defaultCursorRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const innerCursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isInSpline, setIsInSpline] = useState(false)

  useEffect(() => {
    const cursorWrapper = cursorWrapperRef.current
    const defaultCursor = defaultCursorRef.current
    const cursor = cursorRef.current
    const innerCursor = innerCursorRef.current

    const onMouseMove = (e: MouseEvent) => {
      if (cursorWrapper) {
        cursorWrapper.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
      if (defaultCursor) {
        defaultCursor.style.transform = `translate(-50%, -50%) rotate(45deg) translate(0.5px, 0.5px)`
      }
      if (cursor) {
        cursor.style.transform = `translate(-50%, -50%) rotate(45deg)`
      }
      if (innerCursor) {
        innerCursor.style.transform = `translate(-50%, -50%) rotate(45deg)`
      }
    }

    const onMouseDown = () => {
      setIsClicking(true)
    }

    const onMouseUp = () => {
      setIsClicking(false)
    }

    const onMouseEnter = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).tagName.toLowerCase() === "button" ||
        (e.target as HTMLElement).closest("button")
      ) {
        setIsHovering(true)
      }
    }

    const onMouseLeave = () => {
      setIsHovering(false)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseover", onMouseEnter)
    document.addEventListener("mouseout", onMouseLeave)

    const splineContainer = document.querySelector(".SplineContainer")

    if (splineContainer) {
      splineContainer.addEventListener("mouseenter", () => setIsInSpline(true))
      splineContainer.addEventListener("mouseleave", () => setIsInSpline(false))
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseover", onMouseEnter)
      document.removeEventListener("mouseout", onMouseLeave)

      if (splineContainer) {
        splineContainer.removeEventListener("mouseenter", () =>
          setIsInSpline(true)
        )
        splineContainer.removeEventListener("mouseleave", () =>
          setIsInSpline(false)
        )
      }
    }
  }, [])

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div ref={cursorWrapperRef} className="cursor-wrapper">
      <div ref={defaultCursorRef} className="default-cursor"></div>
      <div
        ref={cursorRef}
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={`cursor ${isClicking ? "clicking" : ""} ${
          isHovering ? "hovering" : ""
        }`}
      ></div>
      <div
        ref={innerCursorRef}
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={`inner-cursor ${isClicking ? "clicking" : ""} ${
          isHovering ? "hovering" : ""
        }`}
      ></div>
    </div>
  )
}

export default CustomCursor
