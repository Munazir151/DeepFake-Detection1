"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, CheckCircle, AlertCircle, Loader } from "lucide-react"
// Replaced LaptopDetectionScreen with inline loader visual

export default function DetectionDemo() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<null | { isDeepfake: boolean; confidence: number }>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)

      setIsAnalyzing(true)
      setResult(null)
      // Simulate API call
      setTimeout(() => {
        setResult({
          isDeepfake: Math.random() > 0.5,
          confidence: Math.floor(Math.random() * 40) + 60,
        })
        setIsAnalyzing(false)
      }, 3000)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Static background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 animate-pulse" />

      {/* Interactive blob that follows mouse */}
      <div
        className="absolute w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none transition-all duration-200 ease-out"
        style={{
          left: `${mousePosition.x - 128}px`,
          top: `${mousePosition.y - 128}px`,
          opacity: 0.6,
        }}
      />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-[float_8s_ease-in-out_infinite] [animation-delay:_2s]" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Live Detection Engine</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Detect Deepfakes with Confidence
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Upload an image or video to test our advanced deepfake detection engine with real-time analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            {uploadedImage && !isAnalyzing ? (
              <div className="relative">
                <img
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded"
                  className="w-64 h-64 rounded-2xl object-cover border-2 border-primary/30"
                />
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/50 animate-pulse" />
              </div>
            ) : isAnalyzing ? (
              <div className="relative w-80 h-80 rounded-2xl border-2 border-primary/30 flex items-center justify-center overflow-hidden bg-card shadow-2xl">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-accent/5" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-accent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-primary mb-2">Analyzing Media</p>
                    <p className="text-sm text-foreground/60 mb-4">Deep learning models processing...</p>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/20 animate-pulse" />
                <div className="absolute top-4 left-4 right-4 h-1 bg-primary/20 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full animate-[progress_3s_ease-in-out_infinite]" />
                </div>
              </div>
            ) : (
              <div className="w-64 h-64 rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 border-2 border-dashed border-primary/30 flex items-center justify-center">
                <div className="text-center">
                  <Upload size={48} className="text-primary/50 mx-auto mb-2" />
                  <p className="text-sm text-foreground/50">Upload to scan</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-card border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center hover:border-primary/60 transition">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Upload size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Upload Media</h3>
                <p className="text-foreground/60 mb-6">Drag and drop or click to select an image or video file</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary hover:bg-primary/90 mb-4"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader size={20} className="mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload size={20} className="mr-2" />
                    Choose File
                  </>
                )}
              </Button>
            </div>

            {result && (
              <div
                className={`p-8 rounded-2xl border-2 animate-in fade-in slide-in-from-bottom-4 shadow-lg ${
                  result.isDeepfake ? "bg-destructive/10 border-destructive/30" : "bg-green-500/10 border-green-500/30"
                }`}
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                  {result.isDeepfake ? (
                    <>
                      <div className="relative">
                        <AlertCircle size={32} className="text-destructive animate-pulse" />
                        <div className="absolute inset-0 rounded-full bg-destructive/20 animate-ping" />
                      </div>
                      <div className="text-center">
                        <span className="text-2xl font-bold text-destructive block">Deepfake Detected</span>
                        <span className="text-sm text-destructive/70">High risk content identified</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <CheckCircle size={32} className="text-green-500 animate-pulse" />
                        <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
                      </div>
                      <div className="text-center">
                        <span className="text-2xl font-bold text-green-500 block">Authentic Media</span>
                        <span className="text-sm text-green-500/70">Verified genuine content</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70 font-medium">Confidence Score</span>
                    <span className="text-2xl font-bold">{result.confidence}%</span>
                  </div>
                  <div className="w-full bg-foreground/10 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 rounded-full ${
                        result.isDeepfake ? "bg-linear-to-r from-destructive to-red-600" : "bg-linear-to-r from-green-500 to-green-600"
                      }`}
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-3 rounded-lg bg-card/50">
                      <div className="text-lg font-bold text-foreground">Analysis Time</div>
                      <div className="text-sm text-foreground/60">2.3 seconds</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-card/50">
                      <div className="text-lg font-bold text-foreground">Model Version</div>
                      <div className="text-sm text-foreground/60">v2.1.4</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
