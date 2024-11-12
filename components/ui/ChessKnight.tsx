'use client'

import React, { useState, useMemo, Suspense } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useCursor } from '@react-three/drei'
import * as THREE from 'three'

export default function ChessKnight({ onClick }: { onClick: () => void }) {
  const { nodes, materials } = useGLTF("/assets/3d/compressed_regal_knight.glb", true) as any;
  const { viewport } = useThree()

  const knightGeometry = useMemo(() => {
    const knightNode = Object.values(nodes).find((node: any) => node.type === 'Mesh') as THREE.Mesh

    if (knightNode && knightNode.geometry) {
      knightNode.geometry.rotateY(Math.PI / 2) 
      return knightNode.geometry
    } else {
   
      const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
      boxGeometry.rotateY(Math.PI) 
      return boxGeometry
    }
  }, [nodes])

  const knightMaterial = useMemo(() => {
    const material = Object.values(materials)[0] as THREE.Material

    if (material) {
      return material
    } else {
      return new THREE.MeshStandardMaterial({ 
        color: '#f4f4f4',
        metalness: 0.4,
        roughness: 0.2
      })
    }
  }, [materials])

  const knightRef = React.useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useCursor(hovered)

  useFrame((state) => {
    if (knightRef.current) {
      knightRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) + 0.2
      knightRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.6 + 0.05
    }
  })

  const size = Math.min(viewport.width, viewport.height) * 0.4

  return (
    <mesh
      ref={knightRef}
      geometry={knightGeometry}
      material={knightMaterial}
      rotation={[0, Math.PI / 2, 0]} 
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      scale={hovered ? [size * 1.2, size * 1.2, size * 1.2] : [size, size, size]}
    >
      {hovered && (
        <meshStandardMaterial
          attach="material"
          color="#ffd700"
          metalness={0.8}
          roughness={0.2}
        />
      )}
    </mesh>
  )
}

// Separate component for fallback loader
export function KnightLoader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  )
}

// Preload model with DRACO compression
useGLTF.preload("/assets/3d/compressed_regal_knight.glb")
