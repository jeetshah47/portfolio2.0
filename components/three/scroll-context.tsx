"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

const ScrollContext = createContext(0)

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number>(0)
  const targetRef = useRef(0)
  const currentRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      targetRef.current = scrollable > 0 ? window.scrollY / scrollable : 0
    }

    const animate = () => {
      // Smooth lerp toward target scroll position
      currentRef.current += (targetRef.current - currentRef.current) * 0.08
      setProgress(currentRef.current)
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <ScrollContext.Provider value={progress}>{children}</ScrollContext.Provider>
}

export function useScrollProgress() {
  return useContext(ScrollContext)
}

/** Map global scroll (0–1) to a local section progress (0–1) */
export function sectionProgress(scroll: number, start: number, end: number): number {
  return Math.max(0, Math.min(1, (scroll - start) / (end - start)))
}
