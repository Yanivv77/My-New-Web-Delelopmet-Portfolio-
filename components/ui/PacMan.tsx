'use client'

import React, { useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useCursor } from '@react-three/drei'
import * as THREE from 'three'

export default function PacMan({ onClick }: { onClick: () => void }) {
  const { nodes, materials } = useGLTF("/assets/3d/compressed_neon_pac-man.glb", true) as any;
  const { viewport } = useThree()

  const pacmanGeometry = useMemo(() => {
    const pacmanNode = Object.values(nodes).find((node: any) => node.type === 'Mesh') as THREE.Mesh

    if (pacmanNode && pacmanNode.geometry) {
      return pacmanNode.geometry
    } else {
      console.warn('Pacman geometry not found. Using default SphereGeometry.')
      return new THREE.SphereGeometry(0.5, 32, 32, 0, Math.PI * 1.8)
    }
  }, [nodes])

  const pacmanMaterial = useMemo(() => {
    if (materials.PacmanMaterial) {
      return materials.PacmanMaterial
    } else {
      return new THREE.MeshStandardMaterial({ 
        color: '#ffff00',
        metalness: 0.2,
        roughness: 0.8
        
      })
    }
  }, [materials])

  const pacmanRef = React.useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useCursor(hovered)

  useFrame((state) => {
    if (pacmanRef.current) {
      // Match ChessKnight's rotation and floating animation
      pacmanRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) + 0.2
      pacmanRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.6 + 0.05
    }
  })

  // Update size to match ChessKnight's scaling
  const size = Math.min(viewport.width, viewport.height) * 0.2

  return (
    <group>
      {/* Invisible bounding box for hover */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={onClick}
      >
        <boxGeometry args={[size * 2, size * 2, size * 2]} />
        <meshBasicMaterial visible={false} transparent opacity={0} />
      </mesh>

      {/* Original PacMan mesh */}
      <mesh
        ref={pacmanRef}
        geometry={pacmanGeometry}
        material={pacmanMaterial}
        rotation={[0, Math.PI / 2, 0]} 
        scale={hovered ? [size * 1.2, size * 1.2, size * 1.2] : [size, size, size]}
      >
        {hovered && (
          <meshStandardMaterial
            attach="material"
            color="#ffd700"
            metalness={0.8}
            roughness={0.2}
            side={THREE.DoubleSide}
            alphaMap={null}
          />
        )}
      </mesh>
    </group>
  )
}

// Separate component for fallback loader
export function PacManLoader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 1.8]} />
      <meshStandardMaterial color="#ffff00" />
    </mesh>
  )
}

// Preload model
useGLTF.preload("/assets/3d/compressed_neon_pac-man.glb")