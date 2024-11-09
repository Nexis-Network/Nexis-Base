/* eslint-disable tailwindcss/no-custom-classname */
import type React from "react"

import Background from "./bg"

import "./questHero.css" // Import the CSS file

const QuestHero: React.FC = () => {
  return (
    <section className="quest-image relative w-full">
      <Background />
    </section>
  )
}

export default QuestHero
