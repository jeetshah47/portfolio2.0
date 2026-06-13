"use client"

import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { useTheme } from "next-themes"
import { ScrollProvider } from "./scroll-context"
import { SceneManager } from "./scene-manager"

export function CanvasOverlay() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Skip WebGL on mobile — preserve battery and GPU
    setIsMobile(window.innerWidth < 768)

    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  if (!mounted || isMobile) return null

  const isDark = resolvedTheme === "dark"

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <ScrollProvider>
        <Suspense fallback={null}>
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 6], fov: 55 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <SceneManager isDark={isDark} />
          </Canvas>
        </Suspense>
      </ScrollProvider>
    </div>
  )
}
