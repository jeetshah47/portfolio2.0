"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

interface HeroObjectProps {
  progress: number
  color: string
}

function createNoise(x: number, y: number, z: number, t: number): number {
  // Simple smooth noise approximation
  return (
    Math.sin(x * 2.1 + t) * Math.cos(y * 1.9 + t * 0.8) +
    Math.sin(z * 2.3 + t * 1.1) * 0.5
  )
}

export function HeroObject({ progress, color }: HeroObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.InstancedMesh>(null)
  const { camera, size } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)

  const basePositions = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 2)
    const pos = geo.attributes.position
    const arr = new Float32Array(pos.count * 3)
    for (let i = 0; i < pos.count; i++) {
      arr[i * 3] = pos.getX(i)
      arr[i * 3 + 1] = pos.getY(i)
      arr[i * 3 + 2] = pos.getZ(i)
    }
    geo.dispose()
    return arr
  }, [])

  const particleData = useMemo(() => {
    const count = 500
    const positions: THREE.Vector3[] = []
    const speeds: number[] = []
    const phases: number[] = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.2 + Math.random() * 0.6
      positions.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ))
      speeds.push(0.2 + Math.random() * 0.4)
      phases.push(Math.random() * Math.PI * 2)
    }
    return { positions, speeds, phases, count }
  }, [])

  // Mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / size.width - 0.5) * 2
      mouseRef.current.y = -(e.clientY / size.height - 0.5) * 2
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [size])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((_, delta) => {
    timeRef.current += delta

    const t = timeRef.current
    const fadeOut = 1 - Math.min(1, progress * 6)

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1

      // Vertex displacement
      const geo = meshRef.current.geometry
      const pos = geo.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const bx = basePositions[i * 3]
        const by = basePositions[i * 3 + 1]
        const bz = basePositions[i * 3 + 2]
        const noise = createNoise(bx, by, bz, t * 0.3) * 0.12
        pos.setXYZ(i, bx + bx * noise, by + by * noise, bz + bz * noise)
      }
      pos.needsUpdate = true

      const mat = meshRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = fadeOut

      // Mouse parallax on camera
      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.03
      camera.position.y += (mouseRef.current.y * 0.3 - camera.position.y) * 0.03
      camera.lookAt(0, 0, 0)
    }

    if (particlesRef.current) {
      for (let i = 0; i < particleData.count; i++) {
        const base = particleData.positions[i]
        const speed = particleData.speeds[i]
        const phase = particleData.phases[i]
        const orbit = t * speed + phase
        const r = base.length()

        dummy.position.set(
          base.x * Math.cos(orbit * 0.3) - base.z * Math.sin(orbit * 0.3),
          base.y + Math.sin(orbit + phase) * 0.1,
          base.x * Math.sin(orbit * 0.3) + base.z * Math.cos(orbit * 0.3)
        )
        dummy.position.normalize().multiplyScalar(r)
        dummy.updateMatrix()
        particlesRef.current.setMatrixAt(i, dummy.matrix)
      }
      particlesRef.current.instanceMatrix.needsUpdate = true
      const mat = particlesRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = fadeOut * 0.7
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 2]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={1}
        />
      </mesh>

      <instancedMesh ref={particlesRef} args={[undefined, undefined, particleData.count]}>
        <sphereGeometry args={[0.012, 4, 4]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </instancedMesh>

      <ambientLight intensity={0.3} />
    </group>
  )
}
