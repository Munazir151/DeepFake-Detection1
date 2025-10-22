"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrameId: number
    const dots: HTMLDivElement[] = []
    const dotCount = 40

    const createDot = () => {
      const dot = document.createElement("div")
      dot.className =
        "absolute w-1.5 h-1.5 rounded-full bg-primary/40 blur-[1px] will-change-transform"
      dot.style.left = Math.random() * 100 + "%"
      dot.style.top = Math.random() * 100 + "%"
      container.appendChild(dot)
      dots.push(dot)
    }

    for (let i = 0; i < dotCount; i++) createDot()

    const speeds = dots.map(() => ({
      x: (Math.random() * 0.4 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
      y: (Math.random() * 0.4 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
    }))

    const animate = () => {
      dots.forEach((dot, i) => {
        const rect = dot.getBoundingClientRect()
        const parentRect = container.getBoundingClientRect()
        let x = rect.left - parentRect.left + speeds[i].x
        let y = rect.top - parentRect.top + speeds[i].y

        if (x <= 0 || x >= parentRect.width) speeds[i].x *= -1
        if (y <= 0 || y >= parentRect.height) speeds[i].y *= -1

        x = Math.max(0, Math.min(parentRect.width, x))
        y = Math.max(0, Math.min(parentRect.height, y))

        dot.style.transform = `translate(${x}px, ${y}px)`
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      dots.forEach((dot) => dot.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute -top-40 -left-40 w-xl h-144 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-xl h-144 rounded-full bg-accent/10 blur-3xl animate-pulse" />
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}


