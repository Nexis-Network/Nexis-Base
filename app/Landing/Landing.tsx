import React, { useEffect, useRef } from "react"

import styles from "./Landing.module.css"

const Landing: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initial canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let particles: Particle[] = []
    let particleCount = calculateParticleCount()

    class Particle {
      x: number
      y: number
      speed: number
      opacity: number
      fadeDelay: number
      fadeStart: number
      fadingOut: boolean

      constructor() {
        this.reset()
        this.y = Math.random() * canvas.height
        this.fadeDelay = Math.random() * 600 + 100
        this.fadeStart = Date.now() + this.fadeDelay
        this.fadingOut = false
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.speed = Math.random() / 5 + 0.1
        this.opacity = 1
        this.fadeDelay = Math.random() * 600 + 100
        this.fadeStart = Date.now() + this.fadeDelay
        this.fadingOut = false
      }

      update() {
        this.y -= this.speed
        if (this.y < 0) {
          this.reset()
        }

        if (!this.fadingOut && Date.now() > this.fadeStart) {
          this.fadingOut = true
        }

        if (this.fadingOut) {
          this.opacity -= 0.008
          if (this.opacity <= 0) {
            this.reset()
          }
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(${255 - (Math.random() * 255) / 2}, 255, 255, ${
          this.opacity
        })`
        ctx.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1)
      }
    }

    function initParticles() {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle: Particle) => {
        particle.update()
        particle.draw()
      })
      requestAnimationFrame(animate)
    }

    function calculateParticleCount() {
      return Math.floor((canvas.width * canvas.height) / 6000)
    }

    function onResize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particleCount = calculateParticleCount()
      initParticles()
    }

    window.addEventListener("resize", onResize)

    initParticles()
    animate()

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [])

  const toggleGold = () => {
    document.body.classList.toggle("gold")
  }

  return (
    <div className={styles.landingContainer}>
      <div className={styles.header}>
        <h2>
          <a
            href="https://codepen.io/RAFA3L"
            target="_blank"
            rel="noopener noreferrer"
          >
            RAFA
          </a>
        </h2>
        <div className={styles.midSpot} onClick={toggleGold}></div>
        <button className={styles.contactBtn}>
          <span className={styles.glow}></span>
          <span className={styles.contactBtnContent}>Contact Us</span>
        </button>

        <div className={styles.spotlight}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <canvas id="particleCanvas" ref={canvasRef}></canvas>

      <div className={styles.accentLines}>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={styles.heroSubP}>
        <p>Introducing</p>
      </div>
      <div className={styles.hero}>
        <div className={styles.heroT}>
          <h2>Eclipx</h2>
          <h2>Eclipx</h2>
        </div>
      </div>
      <p className={styles.heroP}>
        The world's best platform, <br />
        powered by EclipxOS + React.
      </p>
      <div className={styles.mountains}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.heroSpacer}></div>

      <div className={styles.contentSection}>
        <div className={styles.contentAcc}>
          <div></div>
          <div></div>
        </div>
        <p className={styles.subt}>Revolutionary by design</p>
        <h3 className={styles.title}>
          Harness. Empower.
          <br />
          Unmatched Versatility.
        </h3>
        <p className={styles.subp}>
          At the core lies our revolutionary framework, <br />
          ensuring adaptability across all application architectures.
        </p>
      </div>
    </div>
  )
}

export default Landing
