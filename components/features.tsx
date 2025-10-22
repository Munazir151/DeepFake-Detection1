"use client"

import { useEffect, useRef, useState } from "react"
import { Zap, Lock, BarChart3, Cpu, Eye, AlertCircle } from "lucide-react"

const features = [
  {
    icon: Eye,
    title: "Real-Time Detection",
    description: "Instantly identify deepfakes in images and videos with advanced neural networks.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process results in milliseconds without compromising accuracy.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance with international security standards.",
  },
  {
    icon: Cpu,
    title: "Advanced AI",
    description: "Powered by state-of-the-art machine learning models.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Comprehensive reports and confidence scores for every detection.",
  },
  {
    icon: AlertCircle,
    title: "Threat Intelligence",
    description: "Get alerts and insights about emerging deepfake techniques.",
  },
]

export default function Features() {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleFeatures((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = containerRef.current?.querySelectorAll("[data-index]")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
            Powerful Features for Complete Protection
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Everything you need to detect and prevent deepfake attacks
          </p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isVisible = visibleFeatures.includes(index)

            return (
              <div
                key={index}
                data-index={index}
                className={`p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-500 group ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all group-hover:shadow-lg group-hover:shadow-primary/30">
                  <Icon size={24} className="text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/60">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
