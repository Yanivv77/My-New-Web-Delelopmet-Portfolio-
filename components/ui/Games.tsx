'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import ChessGame from './ChessGame'
import PacmanGame from './PacmanGame'

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<'chess' | 'pacman' | null>(null)

  const handleCloseGame = () => {
    setSelectedGame(null)
  }

  return (
    <section className="w-full py-12 overflow-x-hidden">
      <div className={`container ${selectedGame ? 'max-w-screen p-0' : ''}`}>
        <div className="flex flex-col items-center justify-center gap-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${selectedGame ? 'w-screen px-4' : ''}`}>
            {/* Chess Game */}
            <CardContent className={`pt-6 ${selectedGame === 'pacman' ? 'hidden' : ''} ${
              selectedGame === 'chess' ? 'lg:col-span-2 w-full overflow-hidden' : ''
            }`}>
              <ChessGame 
                onClose={handleCloseGame}
                onGameStart={() => setSelectedGame('chess')}
              />
            </CardContent>
            
            {/* Pacman Game */}
            <CardContent className={`hidden lg:block pt-6 ${selectedGame === 'chess' ? 'lg:hidden' : ''} ${selectedGame === 'pacman' ? 'lg:col-span-2' : ''}`}>
              <PacmanGame 
                onClose={handleCloseGame}
                onGameStart={() => setSelectedGame('pacman')}
              />
            </CardContent>
          </div>
        </div>
      </div>
    </section>
  )
} 