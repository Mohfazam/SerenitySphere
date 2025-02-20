"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const DNAHelix = () => {
  const groupRef = useRef()
  const numPoints = 50
  const radius = 2
  const height = 10
  const rotationSpeed = 0.005

  // Create DNA strands
  const strand1Points = []
  const strand2Points = []
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 4
    const y = (i / numPoints) * height - height / 2
    const x1 = Math.cos(angle) * radius
    const z1 = Math.sin(angle) * radius
    const x2 = Math.cos(angle + Math.PI) * radius
    const z2 = Math.sin(angle + Math.PI) * radius
    strand1Points.push(new THREE.Vector3(x1, y, z1))
    strand2Points.push(new THREE.Vector3(x2, y, z2))
  }

  // Create curves
  const strand1Curve = new THREE.CatmullRomCurve3(strand1Points)
  const strand2Curve = new THREE.CatmullRomCurve3(strand2Points)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed
    }
  })

  return (
    <group ref={groupRef}>
      {/* First DNA strand */}
      <mesh>
        <tubeGeometry args={[strand1Curve, 100, 0.1, 8, false]} />
        <meshStandardMaterial
          color="#4f46e5"
          metalness={0.5}
          roughness={0.2}
          emissive="#4f46e5"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Second DNA strand */}
      <mesh>
        <tubeGeometry args={[strand2Curve, 100, 0.1, 8, false]} />
        <meshStandardMaterial
          color="#db2777"
          metalness={0.5}
          roughness={0.2}
          emissive="#db2777"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Connections between strands */}
      {Array.from({ length: numPoints / 2 }).map((_, i) => {
        const t = (i * 2) / numPoints
        const point1 = strand1Curve.getPoint(t)
        const point2 = strand2Curve.getPoint(t)
        return (
          <mesh key={i} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, point1.distanceTo(point2)]} />
            <meshStandardMaterial
              color="#a855f7"
              metalness={0.5}
              roughness={0.2}
              emissive="#a855f7"
              emissiveIntensity={0.2}
            />
            <primitive
              object={new THREE.Object3D().lookAt(point2.x - point1.x, point2.y - point1.y, point2.z - point1.z)}
              position={point1}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default DNAHelix

