"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ContactObjectProps {
  progress: number
  color: string
}

const COUNT = 200

export function ContactObject({ progress, color }: ContactObjectProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const timeRef = useRef(0)

  const initialPositions = useMemo(() => {
    return Array.from({ length: COUNT }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 2
    ))
  }, [])

  const fadeIn = Math.min(1, progress * 3)
  const opacity = fadeIn

  useFrame((_, delta) => {
    timeRef.current += delta

    if (!meshRef.current) return

    // Particles converge toward origin as progress increases
    const convergence = Math.min(1, progress * 1.5)

    for (let i = 0; i < COUNT; i++) {
      const init = initialPositions[i]
      // Lerp between scattered and converged position
      const px = init.x * (1 - convergence) + Math.sin(timeRef.current * 0.4 + i) * 0.15
      const py = init.y * (1 - convergence) + Math.cos(timeRef.current * 0.3 + i * 0.7) * 0.15
      const pz = init.z * (1 - convergence)

      dummy.position.set(px, py, pz)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true

    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = opacity * 0.65
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[0.014, 4, 4]} />
      <meshBasicMaterial color={color} transparent opacity={0} />
    </instancedMesh>
  )
}
