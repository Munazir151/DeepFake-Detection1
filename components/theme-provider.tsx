"use client"

import { useEffect, useState } from "react"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null)

  useEffect(() => {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    
    // Check system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light")
    
    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const applyTheme = (newTheme: "light" | "dark") => {
    const htmlElement = document.documentElement
    
    if (newTheme === "dark") {
      htmlElement.classList.add("dark")
    } else {
      htmlElement.classList.remove("dark")
    }
    
    localStorage.setItem("theme", newTheme)
    setTheme(newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    applyTheme(newTheme)
  }

  if (theme === null) return null

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (localStorage.getItem('theme') === 'dark' || 
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark')
            }
          `,
        }}
      />
      <div data-theme-toggle={toggleTheme as any}>
        {children}
      </div>
    </>
  )
}

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
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

  return { theme, toggleTheme }
}
