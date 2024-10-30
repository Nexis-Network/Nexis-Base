"use client"

import { useEffect } from "react"

const CustomCursor = () => {
  useEffect(() => {
    const cursorOuter = document.createElement("div")
    cursorOuter.id = "custom-cursor-outer"

    const cursorInner = document.createElement("div")
    cursorInner.id = "custom-cursor-inner"

    // Helper functions to set cursor styles
    const setDefaultCursorStyles = () => {
      cursorOuter.style.borderColor = "hsl(82, 84.5%, 67.1%)"
      cursorOuter.style.backgroundColor = "hsla(82, 84.5%, 67.1%, 0.1)"
      cursorInner.style.backgroundColor = "hsl(82, 84.5%, 67.1%)"
    }

    const setBlackCursorStyles = () => {
      cursorOuter.style.borderColor = "black"
      cursorOuter.style.backgroundColor = "rgba(0, 0, 0, 0.1)"
      cursorInner.style.backgroundColor = "black"
    }

    // Initial cursor styles
    cursorOuter.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 30px;
      height: 30px;
      border: 1px solid;
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      transition: transform 0.2s ease-out, background-color 0.2s ease-out, border-color 0.2s ease-out;
      z-index: 9999;
      cursor: none;
    `
    cursorInner.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      transition: background-color 0.2s ease-out;
      z-index: 9999;
      cursor: none;
    `
    // Set default colors
    setDefaultCursorStyles()

    document.body.appendChild(cursorOuter)
    document.body.appendChild(cursorInner)

    const moveCursor = (e: MouseEvent) => {
      cursorOuter.style.left = `${e.clientX}px`
      cursorOuter.style.top = `${e.clientY}px`
      cursorInner.style.left = `${e.clientX}px`
      cursorInner.style.top = `${e.clientY}px`
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest(".wallet-details")) {
        // Change cursor to black
        setBlackCursorStyles()
      } else {
        // Reset to default styles
        setDefaultCursorStyles()
      }
      if (target.closest("button")) {
        cursorOuter.style.transform = "translate(-50%, -50%) scale(2)"
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest(".wallet-details")) {
        // Reset to default styles when leaving wallet-details
        setDefaultCursorStyles()
      }
      if (target.closest("button")) {
        cursorOuter.style.transform = "translate(-50%, -50%) scale(1)"
      }
    }

    document.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
      document.body.removeChild(cursorOuter)
      document.body.removeChild(cursorInner)
    }
  }, [])

  return null
}

export default CustomCursor
