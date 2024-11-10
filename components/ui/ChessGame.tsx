'use client'

import React, { useState, useEffect, useCallback, Suspense, useMemo } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, Move, Square, PieceSymbol } from 'chess.js'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, RotateCcw, X } from 'lucide-react'
import { Canvas, extend } from '@react-three/fiber'
import { OrbitControls, Float, Environment } from '@react-three/drei'
import ChessKnight from './ChessKnight'
import GameCanvasCard from './GameCanvasCard'

// Extend R3F with OrbitControls
extend({ OrbitControls })

// Define types
type GameState = Chess

// Board theme configuration
const boardTheme = {
  light: {
    backgroundColor: '#7F8C8D',
  },
  dark: {
    backgroundColor: '#2C3E50',
  },
  boardStyle: {
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.7)',
  },
  notationStyle: {
    color: '#ECF0F1',
    fontSize: '14px',
  },
  dropSquareStyle: {
    boxShadow: 'inset 0 0 1px 6px rgba(255, 255, 255, 0.75)',
  },
}

const DEFAULT_SIZES: { mobile: number; desktop: number } = {
  mobile: 250,
  desktop: 480,
}

// Floating Knight component with proper disposal handling
function FloatingKnight({ onClick }: { onClick: () => void }) {
  const [canvasSize, setCanvasSize] = useState({ 
    width: typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.8, 400) : 400,
    height: 400
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
      <Suspense fallback={null}>
        <group dispose={null}>
          <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <ChessKnight onClick={onClick} />
          </Float>
          <Environment preset="studio" />
        </group>
      </Suspense>
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
      
// Main Chess Game component
export default function ChessGame({ onClose, onGameStart }: { onClose?: () => void, onGameStart?: () => void }) {
  const [game, setGame] = useState<Chess>(new Chess())
  const [showGame, setShowGame] = useState<boolean>(false)
  const [boardWidth, setBoardWidth] = useState<number>(DEFAULT_SIZES.desktop)
  const [playerColor, setPlayerColor] = useState<'w' | 'b'>('w')
  const [gameStatus, setGameStatus] = useState<string>('')
  const [isThinking, setIsThinking] = useState<boolean>(false)

  // Board width calculation
  const calculateBoardWidth = useCallback(() => {
    if (typeof window === 'undefined') return DEFAULT_SIZES.desktop
    
    return window.innerWidth < 640 
      ? Math.min(window.innerWidth - 20, DEFAULT_SIZES.mobile)
      : Math.min(window.innerWidth - 40, DEFAULT_SIZES.desktop)
  }, [])

  // Initialize board width after mount
  useEffect(() => {
    setBoardWidth(calculateBoardWidth())
  }, [calculateBoardWidth])

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      setBoardWidth(calculateBoardWidth())
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [calculateBoardWidth])

  const updateGameStatus = (currentGame: GameState) => {
    if (currentGame.isCheckmate()) {
      setGameStatus(`Checkmate! ${currentGame.turn() === 'w' ? 'Black' : 'White'} wins!`)
    } else if (currentGame.isDraw()) {
      setGameStatus("It's a draw!")
    } else if (currentGame.isCheck()) {
      setGameStatus(`${currentGame.turn() === 'w' ? 'White' : 'Black'} is in check`)
    } else {
      setGameStatus(`${currentGame.turn() === 'w' ? 'White' : 'Black'} to move`)
    }
  }

  // Game logic functions
  const makeAMove = useCallback((move: { from: Square; to: Square; promotion?: string }): Move | null => {
    const gameCopy = new Chess(game.fen())
    try {
      const result = gameCopy.move(move)
      setGame(gameCopy)
      updateGameStatus(gameCopy)
      return result
    } catch (error) {
      console.error('Invalid move:', error)
      return null
    }
  }, [game])

  const evaluatePosition = (game: GameState): number => {
    const pieceValues: Record<PieceSymbol, number> = {
      p: 10, n: 30, b: 30, r: 50, q: 90, k: 900
    }
    
    let score = 0
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const square = String.fromCharCode(97 + i) + (j + 1) as Square
        const piece = game.get(square)
        if (piece) {
          const value = pieceValues[piece.type] * (piece.color === 'w' ? 1 : -1)
          score += value

          // Encourage pawn advancement
          if (piece.type === 'p') {
            const pawnAdvancement = piece.color === 'w' ? j : 7 - j
            score += pawnAdvancement * (piece.color === 'w' ? 1 : -1)
          }
          // Encourage piece development in the opening
          if (game.moveNumber() <= 10 && (piece.type === 'n' || piece.type === 'b')) {
            if ((piece.color === 'w' && j > 0) || (piece.color === 'b' && j < 7)) {
              score += 5 * (piece.color === 'w' ? 1 : -1)
            }
          }
        }
      }
    }

    // Encourage controlling the center
    const centerSquares = ['d4', 'd5', 'e4', 'e5']
    for (const square of centerSquares) {
      const piece = game.get(square as Square)
      if (piece) {
        score += 5 * (piece.color === 'w' ? 1 : -1)
      }
    }

    return score
  }

  const findBestMove = (game: GameState, depth: number): Move | null => {
    const moves = game.moves({ verbose: true })
    let bestMove: Move | null = null
    let bestScore = game.turn() === 'w' ? -Infinity : Infinity

    for (let move of moves) {
      game.move(move)
      const score = minimax(game, depth - 1, -Infinity, Infinity, game.turn() === 'b')
      game.undo()

      if (game.turn() === 'w' && score > bestScore) {
        bestScore = score
        bestMove = move
      } else if (game.turn() === 'b' && score < bestScore) {
        bestScore = score
        bestMove = move
      }
    }

    return bestMove
  }

  const minimax = (game: GameState, depth: number, alpha: number, beta: number, maximizingPlayer: boolean): number => {
    if (depth === 0 || game.isGameOver()) {
      return evaluatePosition(game)
    }

    const moves = game.moves({ verbose: true })

    if (maximizingPlayer) {
      let maxEval = -Infinity
      for (let move of moves) {
        game.move(move)
        const evaluation = minimax(game, depth - 1, alpha, beta, false)
        game.undo()
        maxEval = Math.max(maxEval, evaluation)
        alpha = Math.max(alpha, evaluation)
        if (beta <= alpha) break
      }
      return maxEval
    } else {
      let minEval = Infinity
      for (let move of moves) {
        game.move(move)
        const evaluation = minimax(game, depth - 1, alpha, beta, true)
        game.undo()
        minEval = Math.min(minEval, evaluation)
        beta = Math.min(beta, evaluation)
        if (beta <= alpha) break
      }
      return minEval
    }
  }

  const makeComputerMove = useCallback(() => {
    setIsThinking(true)
    setTimeout(() => {
      const bestMove = findBestMove(game, 3)
      if (bestMove) {
        makeAMove(bestMove)
      }
      setIsThinking(false)
    }, 500)
  }, [game, makeAMove])

  useEffect(() => {
    if (game.turn() !== playerColor && !game.isGameOver()) {
      makeComputerMove()
    }
  }, [game, playerColor, makeComputerMove])

  // Game control functions
  const onDrop = (sourceSquare: Square, targetSquare: Square): boolean => {
    if (game.turn() !== playerColor) return false
    try {
      const move = makeAMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      })
      return move !== null
    } catch (error) {
      console.error('Error making move:', error)
      return false
    }
  }

  const resetGame = () => {
    setGame(new Chess())
    setGameStatus('White to move')
  }

  const switchSides = () => {
    setPlayerColor(prev => prev === 'w' ? 'b' : 'w')
    resetGame()
  }

  const closeGame = () => {
    setShowGame(false);
    resetGame();
    onClose?.();
  }

  const handleGameStart = () => {
    setShowGame(true);
    onGameStart?.();
  }

  return (
    <div className="flex justify-center items-center py-5 px-2">
      {!showGame ? (
        <Card className="text-center bg-gray-800 border-white max-w-4xl">
          <CardContent className="p-2">
            <FloatingKnight onClick={handleGameStart} />
            <p className="mt-4 text-lg font-semibold text-white">
              Click the knight to play chess
            </p>
          </CardContent>
        </Card>
      ) : (
        <GameCanvasCard
          title="Chess Game"
          isPlaying={!game.isGameOver()}
          statusText={isThinking ? "Computer turn" : gameStatus}
          onClose={closeGame}
          controls={
            <>
              <Button onClick={resetGame}>
                <RotateCcw className="w-4 h-4 mr-2" />
                New Game
              </Button>
              <Button onClick={switchSides}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Switch Sides
              </Button>
            </>
          }
        >
          <div className="w-full max-w-md md:w-auto">
            <Chessboard
              position={game.fen()}
              onPieceDrop={onDrop}
              boardWidth={boardWidth}
              boardOrientation={playerColor === "w" ? "white" : "black"}
              customLightSquareStyle={boardTheme.light}
              customDarkSquareStyle={boardTheme.dark}
              customBoardStyle={boardTheme.boardStyle}
              customNotationStyle={boardTheme.notationStyle}
              customDropSquareStyle={boardTheme.dropSquareStyle}
            />
          </div>
        </GameCanvasCard>
      )}
    </div>
  );
}