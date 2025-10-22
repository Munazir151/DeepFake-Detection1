"use client"

import { useEffect, useRef, useState } from "react"

export default function DetectionProcess() {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      title: "Image Upload",
      description: "User uploads an image or video file",
      icon: "📤",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Face Detection",
      description: "AI identifies and isolates facial regions",
      icon: "👤",
      color: "from-cyan-500 to-green-500",
    },
    {
      title: "Feature Analysis",
      description: "Neural networks analyze facial features and patterns",
      icon: "🔍",
      color: "from-green-500 to-purple-500",
    },
    {
      title: "Deepfake Detection",
      description: "Advanced algorithms detect synthetic artifacts",
      icon: "🤖",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Result Report",
      description: "Confidence score and detailed analysis provided",
      icon: "✅",
      color: "from-pink-500 to-red-500",
    },
  ]

  return (
    <section className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-muted/30">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-accent">AI Processing Pipeline</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-linear-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
            How Detection Works
          </h2>
          <p className="text-lg text-foreground/60 max-w-3xl mx-auto">
            Our advanced AI processes your media through multiple detection layers with real-time neural network analysis
          </p>
        </div>

        {/* Divider */}
        <div className="mb-12 flex items-center gap-4">
          <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="text-primary/50 text-sm font-medium">Processing Steps</div>
          <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>

        {/* Desktop View - Horizontal Flow */}
        <div className="hidden lg:block">
          <div ref={containerRef} className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 -translate-y-1/2 -z-10 rounded-full shadow-lg">
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse" />
            </div>

            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div
                    className={`relative w-28 h-28 rounded-full flex items-center justify-center text-5xl transition-all duration-500 cursor-pointer group ${
                      activeStep === index
                        ? `bg-linear-to-r ${step.color} shadow-2xl scale-110`
                        : "bg-card border-2 border-border hover:border-primary/50 hover:scale-105"
                    }`}
                  >
                    <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    {activeStep === index && (
                      <>
                        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse" />
                        <div className="absolute inset-0 rounded-full bg-white/10 animate-ping" />
                      </>
                    )}
                    {activeStep === index && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Step Info */}
                  <div className="mt-8 text-center max-w-48">
                    <h3 className={`font-semibold text-lg mb-2 transition-colors duration-300 ${
                      activeStep === index ? 'text-primary' : 'text-foreground'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm transition-colors duration-300 ${
                      activeStep === index ? 'text-primary/80' : 'text-foreground/60'
                    }`}>
                      {step.description}
                    </p>
                    {activeStep === index && (
                      <div className="mt-3 flex justify-center">
                        <div className="w-8 h-1 bg-linear-to-r from-primary to-accent rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-1/2 -right-2 text-2xl text-primary/30 -translate-y-1/2">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View - Vertical Flow */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, index) => (
            <div key={index}>
              <div
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  activeStep === index
                    ? `bg-linear-to-r ${step.color} border-transparent text-white`
                    : "bg-card border-border"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{step.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                    <p className={activeStep === index ? "text-white/80" : "text-foreground/60"}>{step.description}</p>
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="text-xl text-primary/40">↓</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
