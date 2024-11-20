"use client"

/* eslint-disable tailwindcss/no-custom-classname */
import type React from "react"

import styles from "./timeline.module.css"

import "./styles.css"

const Timeline: React.FC = () => {
  return (
    // Start of Selection
    <div>
      <div>
        <h1>Timeline</h1>
        <ul className={styles["timeline-events"]}>
          <li
            className={
              styles["timeline-event-years-6-5 styles.timeline-event-legend"]
            }
          >
            <span>
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
              <i></i>
              <h2>Graduation</h2>
              <h3>University of California, San Diego</h3>
              <h4>BA Visual Arts</h4>
            </span>
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <i></i>
          </li>
          <li className={styles["timeline-event-years-2"]}>
            <h2>2004-2006</h2>
            <h3>Ideaworks Advertising</h3>
            <h4>Interactive Designer</h4>
          </li>
          <li className={styles["timeline-event-years-2"]}>
            <h2>2006-2008</h2>
            <h3>Pint, Inc</h3>
            <h4>Associate Creative Director</h4>
          </li>
          <li className={styles["timeline-event-years-3"]}>
            <h2>2008-2011</h2>
            <h3>Cuker Interactive</h3>
            <h4>Creative</h4>
          </li>
          <li className={styles["timeline-event-years-7"]}>
            <h2>2011-Present</h2>
            <h3>Independent</h3>
            <h4>Interactive Art Director</h4>
          </li>
        </ul>
        <ul className={styles["timelines-years"]}>
          <li>2000</li>
          <li>2002</li>
          <li>2004</li>
          <li>2006</li>
          <li>2008</li>
          <li>2010</li>
          <li>2012</li>
          <li>2014</li>
          <li>2016</li>
          <li>2018</li>
        </ul>
      </div>
    </div>
  )
}

export default Timeline
