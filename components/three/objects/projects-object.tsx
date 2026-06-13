"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ProjectsObjectProps {
  progress: number
  color: string
}

const CARD_CONFIG = [
  { offset: [-1.1, 0.3, -0.6], rotY: 0.25 },
  { offset: [0, 0, 0], rotY: 0 },
  { offset: [1.1, -0.2, -0.5], rotY: -0.22 },
]

export function ProjectsObject({ progress, color }: ProjectsObjectProps) {
  const cardRefs = useRef<(THREE.Mesh | null)[]>([])

  const fadeIn = Math.min(1, progress * 3)
  const fadeOut = 1 - Math.max(0, (progress - 0.7) * 3)
  const opacity = fadeIn * fadeOut

  useFrame((_, delta) => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      card.rotation.y += delta * 0.08 * (i % 2 === 0 ? 1 : -1)

      const mat = card.material as THREE.MeshBasicMaterial
      // Outer cards are slightly dimmer for depth cue
      const depthFade = i === 1 ? 1 : 0.55
      mat.opacity = opacity * depthFade
    })
  })

  return (
    <group position={[0, 0, -0.5]}>
      {CARD_CONFIG.map((cfg, i) => (
        <mesh
          key={i}
          ref={(el) => { cardRefs.current[i] = el }}
          position={cfg.offset as [number, number, number]}
          rotation={[0, cfg.rotY, 0]}
        >
          <planeGeometry args={[1.6, 0.95]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.55}
            wireframe
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Card edge highlights — thin border lines */}
      {CARD_CONFIG.map((cfg, i) => (
        <lineSegments
          key={`edge-${i}`}
          position={cfg.offset as [number, number, number]}
          rotation={[0, cfg.rotY, 0]}
        >
          <edgesGeometry args={[new THREE.PlaneGeometry(1.6, 0.95)]} />
          <lineBasicMaterial color={color} transparent opacity={opacity * (i === 1 ? 0.8 : 0.35)} />
        </lineSegments>
      ))}
    </group>
  )
}
