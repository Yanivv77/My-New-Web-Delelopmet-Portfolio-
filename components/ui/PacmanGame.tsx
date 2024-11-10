'use client'

import { useEffect, useRef, useState, useMemo } from "react"
import type { Game } from "@platzh1rsch/pacman-canvas"
import { getGameInstance } from "@platzh1rsch/pacman-canvas"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Play, Pause, RotateCcw, X } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Environment } from '@react-three/drei'
import PacMan from './PacMan'
import GameCanvasCard from './GameCanvasCard'

interface PacmanGameProps {
  onClose?: () => void;
  onGameStart?: () => void;
}

export default function PacmanGame({ onClose, onGameStart }: PacmanGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null)
  const [game, setGame] = useState<Game | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showGame, setShowGame] = useState(false)

  useEffect(() => {
    if (canvasRef.current) {
      setCanvasContext(canvasRef.current.getContext("2d"))
    }
  }, [])

  useEffect(() => {
    if (canvasContext && showGame) {
      try {
        const gameInstance = getGameInstance()
        gameInstance.setCanvasContext2d(canvasContext)
        setGame(gameInstance)
        setError(null)
      } catch (err) {
        console.error('Failed to initialize Pacman game:', err)
        setError('Failed to initialize the Pacman game. Please try refreshing the page.')
      }
    }
  }, [canvasContext, showGame])

  const handlePauseResume = () => {
    if (game) {
      game.pauseResume()
      setIsPlaying(!isPlaying)
    }
  }

  const handleRestart = () => {
    if (game) {
      game.newGame()
      setIsPlaying(true)
    }
  }

  const handleEndGame = () => {
    if (game) {
      game.endGame()
      setIsPlaying(false)
    }
  }

  const closeGame = () => {
    setShowGame(false)
    if (game) {
      game.endGame()
    }
    setIsPlaying(false)
    onClose?.()
  }

  const handleGameStart = () => {
    setShowGame(true);
    onGameStart?.();
  }

  const FloatingPacMan = ({ onClick }: { onClick: () => void }) => {
    const [canvasSize, setCanvasSize] = useState({ 
      width: typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.8, 400) : 400,
      height: typeof window !== 'undefined' ? 400 : 400
    })
  
    useEffect(() => {
      const updateSize = () => {
        setCanvasSize({
          width: Math.min(window.innerWidth * 0.8, 400),
          height: 400
        })
      }
  
      updateSize()
      window.addEventListener('resize', updateSize)
      return () => window.removeEventListener('resize', updateSize)
    }, [])
  
    const canvasContent = useMemo(() => (
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <PacMan onClick={onClick} />
        </Float>
        <Environment preset="studio" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    ), [onClick])
  
    return (
      <div style={{ width: canvasSize.width, height: canvasSize.height }}>
        {canvasContent}
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center py-5 px-2">
      {!showGame ? (
        <Card className="text-center bg-gray-800 border-yellow-400 max-w-4xl">
          <CardContent className="p-2">
            <FloatingPacMan onClick={handleGameStart} />
            <p className="mt-4 text-lg font-semibold text-yellow-400">
              Click Pac-Man to play
            </p>
          </CardContent>
        </Card>
      ) : (
        <GameCanvasCard
          title="Pac-Man Game"
          isPlaying={isPlaying}
          statusText={isPlaying ? "Game in Progress" : "Ready to Play"}
          titleColor="text-yellow-400"
          onClose={closeGame}
          controls={
            <>
              <Button 
                onClick={handlePauseResume}
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? 'Pause' : 'Resume'}
              </Button>
              <Button 
                onClick={handleRestart}
                className="w-full bg-green-500 text-white hover:bg-green-600"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart
              </Button>
              <Button 
                onClick={closeGame}
                className="w-full bg-red-500 text-white hover:bg-red-600"
              >
                <X className="w-4 h-4 mr-2" />
                End Game
              </Button>
            </>
          }
        >
          <div className="w-full max-w-md md:w-auto">
            <div className="w-full aspect-[540/390] relative cursor-pointer">
              <canvas
                ref={canvasRef}
                className="w-full h-full bg-black rounded-lg"
                width="540"
                height="390"
              >
                <p>Canvas not supported</p>
              </canvas>
            </div>
          </div>
        </GameCanvasCard>
      )}
    </div>
  )
}