"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ExperienceObjectProps {
  progress: number
  color: string
}

const NODE_POSITIONS = [
  new THREE.Vector3(0, 1.6, 0),
  new THREE.Vector3(0.3, 0.6, 0),
  new THREE.Vector3(-0.2, -0.4, 0),
  new THREE.Vector3(0.1, -1.5, 0),
]

export function ExperienceObject({ progress, color }: ExperienceObjectProps) {
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([])
  const tubeRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)

  const fadeIn = Math.min(1, progress * 3)
  const fadeOut = 1 - Math.max(0, (progress - 0.7) * 3)
  const opacity = fadeIn * fadeOut

  // How far the tube has "drawn" itself (0 → full)
  const drawProgress = Math.min(1, progress * 2)

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(NODE_POSITIONS, false, "catmullrom", 0.5),
    []
  )

  // Rebuild tube geometry when drawProgress changes
  const tubeGeo = useMemo(() => {
    const subCurve = curve.getPoints(Math.max(2, Math.floor(drawProgress * 60)))
    const partial = new THREE.CatmullRomCurve3(subCurve)
    return new THREE.TubeGeometry(partial, 40, 0.015, 6, false)
  }, [curve, drawProgress])

  useFrame((_, delta) => {
    timeRef.current += delta

    nodeRefs.current.forEach((node, i) => {
      if (!node) return
      // Node becomes visible as the tube draws past it
      const nodeReveal = Math.min(1, Math.max(0, (drawProgress - i * 0.22) * 6))
      const mat = node.material as THREE.MeshBasicMaterial
      mat.opacity = nodeReveal * opacity
      node.scale.setScalar(nodeReveal * (1 + Math.sin(timeRef.current * 1.5 + i) * 0.08))
    })

    if (tubeRef.current) {
      const mat = tubeRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = opacity * 0.9
    }
  })

  return (
    <group position={[1.5, 0, -0.5]}>
      {/* Tube — rebuilt geometry for draw-on effect */}
      <mesh ref={tubeRef} geometry={tubeGeo}>
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>

      {/* Node spheres */}
      {NODE_POSITIONS.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => { nodeRefs.current[i] = el }}
          position={pos}
        >
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshBasicMaterial color={color} transparent opacity={0} />
        </mesh>
      ))}
    </group>
  )
}
