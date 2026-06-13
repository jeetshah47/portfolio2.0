"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface AboutObjectProps {
  progress: number
  color: string
}

export function AboutObject({ progress, color }: AboutObjectProps) {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  const fadeIn = Math.min(1, progress * 3)
  const fadeOut = 1 - Math.max(0, (progress - 0.7) * 3)
  const opacity = fadeIn * fadeOut

  useFrame((_, delta) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.18
      ring1Ref.current.rotation.x += delta * 0.05
      const mat = ring1Ref.current.material as THREE.MeshBasicMaterial
      mat.opacity = opacity * 0.85
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.12
      ring2Ref.current.rotation.y += delta * 0.08
      const mat = ring2Ref.current.material as THREE.MeshBasicMaterial
      mat.opacity = opacity * 0.6
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.09
      ring3Ref.current.rotation.z -= delta * 0.06
      const mat = ring3Ref.current.material as THREE.MeshBasicMaterial
      mat.opacity = opacity * 0.35
    }
  })

  return (
    <group position={[1.8, 0, -1]}>
      {/* Primary ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.4, 0.012, 8, 100]} />
        <meshBasicMaterial color={color} wireframe={false} transparent opacity={0.85} />
      </mesh>

      {/* Secondary ring tilted 60° */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.0, 0.009, 8, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>

      {/* Outer ghost ring */}
      <mesh ref={ring3Ref} rotation={[-Math.PI / 5, Math.PI / 4, 0]}>
        <torusGeometry args={[1.8, 0.006, 6, 60]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
    </group>
  )
}
