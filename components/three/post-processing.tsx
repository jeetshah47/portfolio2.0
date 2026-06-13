"use client"

import { useEffect, useState } from "react"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"

export function PostProcessing() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Disable postprocessing on mobile — GPU budget
    setEnabled(window.innerWidth >= 768)
  }, [])

  if (!enabled) return null

  return (
    <EffectComposer>
      <Bloom intensity={0.35} luminanceThreshold={0.55} luminanceSmoothing={0.9} mipmapBlur />
      <Vignette eskil={false} offset={0.45} darkness={0.5} />
    </EffectComposer>
  )
}
