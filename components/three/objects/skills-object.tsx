"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface SkillsObjectProps {
  progress: number
  color: string
}

const GRID_COLS = 4
const GRID_ROWS = 2
const COUNT = GRID_COLS * GRID_ROWS

export function SkillsObject({ progress, color }: SkillsObjectProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRefs = useRef<(THREE.Mesh | null)[]>([])
  const timeRef = useRef(0)

  const phases = useMemo(() => Array.from({ length: COUNT }, (_, i) => i * (Math.PI / 4)), [])

  const fadeIn = Math.min(1, progress * 3)
  const fadeOut = 1 - Math.max(0, (progress - 0.7) * 3)
  const opacity = fadeIn * fadeOut

  useFrame((_, delta) => {
    timeRef.current += delta

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const phase = phases[i]
      mesh.rotation.x += delta * 0.3
      mesh.rotation.y += delta * 0.2
      mesh.position.y = (Math.floor(i / GRID_COLS) - 0.5) * 1.1 + Math.sin(timeRef.current * 0.6 + phase) * 0.08
      const mat = mesh.material as THREE.MeshBasicMaterial
      mat.opacity = opacity * 0.8
    })

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(timeRef.current * 0.15) * 0.1
    }
  })

  const positions = useMemo(() => {
    return Array.from({ length: COUNT }, (_, i) => ({
      x: (i % GRID_COLS - (GRID_COLS - 1) / 2) * 0.9,
      y: (Math.floor(i / GRID_COLS) - (GRID_ROWS - 1) / 2) * 1.1,
    }))
  }, [])

  return (
    <group ref={groupRef} position={[-0.5, 0, -0.5]}>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el }}
          position={[pos.x, pos.y, 0]}
        >
          <octahedronGeometry args={[0.22, 0]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}
