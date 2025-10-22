"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-8 pb-16">

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        <div
          className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="w-full text-center lg:text-left mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-in fade-in">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m7.5-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium text-primary">AI-Powered Detection</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance">
                Detect <span className="gradient-text">Deepfakes</span> with Confidence
              </h1>

              <p className="text-lg sm:text-xl text-foreground/70 mb-8 max-w-2xl text-balance">
                Advanced AI technology to identify manipulated faces and synthetic media. Protect your organization from
                misinformation and fraud.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-lg px-8 hover:shadow-lg hover:shadow-primary/50 transition-all"
                >
                  Start Detecting
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 bg-transparent hover:bg-primary/5 transition-all"
                >
                  Watch Demo
                </Button>
              </div>

            </div>

            {/* Right Demo - Laptop-style Detection Preview */}
            <div className="hidden lg:flex w-full justify-center lg:justify-end lg:-mt-6">
              <div className="relative w-lg flex flex-col gap-4">
                {/* Laptop lid */}
                <div className="rounded-t-xl border border-border bg-card shadow-2xl overflow-hidden">
                  {/* Laptop header */}
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/50">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                    <div className="ml-auto text-xs text-foreground/50">Deepfake Analyzer</div>
                  </div>
                  {/* Screen */}
                  <div className="relative aspect-video bg-linear-to-br from-primary/5 to-accent/5">
                    {/* Video */}
                    <div className="absolute inset-3 rounded-lg overflow-hidden border border-border">
                      <video
                        className="w-full h-full object-cover"
                        src="/videos/Deepfake_Detection_Demo_Video.mp4"
                        autoPlay={isVideoPlaying}
                        loop
                        muted
                        playsInline
                        ref={(video) => {
                          if (video) {
                            if (isVideoPlaying) {
                              video.play()
                            } else {
                              video.pause()
                            }
                          }
                        }}
                      />
                      {/* Play/Pause Button */}
                      <button
                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-all"
                      >
                        {isVideoPlaying ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        )}
                      </button>
                      {/* Corner markers */}
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-primary" />
                        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary" />
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary" />
                        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-primary" />
                      </div>
                      {/* Scanning line */}
                      <div className={`pointer-events-none absolute inset-y-0 w-1 bg-primary/60 ${isVideoPlaying ? 'animate-[scanX_3s_linear_infinite]' : ''}`} style={{ left: 0 }} />
                    </div>
                    {/* HUD overlays */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div className="px-2 py-1 rounded-md bg-primary/10 border border-primary/30 text-xs text-primary">Scanning</div>
                      <div className="px-2 py-1 rounded-md bg-accent/10 border border-accent/30 text-xs text-accent-foreground/80">Face Region</div>
                      <div className="px-2 py-1 rounded-md bg-green-500/10 border border-green-500/30 text-xs text-green-600">Confidence: 92%</div>
                    </div>
                  </div>
                </div>
                
                {/* Stats Cards Below Laptop */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 hover:scale-105 duration-300">
                    <div className="text-lg font-bold text-primary">99.8%</div>
                    <div className="text-xs text-foreground/60">Accuracy</div>
                  </div>
                  <div className="p-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 hover:scale-105 duration-300">
                    <div className="text-lg font-bold text-primary">{"<"}100ms</div>
                    <div className="text-xs text-foreground/60">Detection Time</div>
                  </div>
                  <div className="p-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 hover:scale-105 duration-300">
                    <div className="text-lg font-bold text-primary">24/7</div>
                    <div className="text-xs text-foreground/60">Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}
