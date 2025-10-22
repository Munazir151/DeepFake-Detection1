"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light")
    setTheme(initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    const htmlElement = document.documentElement

    if (newTheme === "dark") {
      htmlElement.classList.add("dark")
    } else {
      htmlElement.classList.remove("dark")
    }

    localStorage.setItem("theme", newTheme)
    setTheme(newTheme)
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <span className="font-bold text-xl text-foreground">DeepGuard</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-foreground/70 hover:text-foreground transition">
            Features
          </a>
          <a href="#detection-process" className="text-foreground/70 hover:text-foreground transition">
            How It Works
          </a>
          <a href="#demo" className="text-foreground/70 hover:text-foreground transition">
            Demo
          </a>
        </div>

        <div className="hidden md:flex gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="w-10 h-10"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mounted && (theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            ))}
          </Button>
          <Button variant="outline">Sign In</Button>
          <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-3">
            <a href="#features" className="block text-foreground/70 hover:text-foreground py-2">
              Features
            </a>
            <a href="#how-it-works" className="block text-foreground/70 hover:text-foreground py-2">
              How It Works
            </a>
            <a href="#demo" className="block text-foreground/70 hover:text-foreground py-2">
              Demo
            </a>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="w-10 h-10"
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {mounted && (theme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                ))}
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Sign In
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
