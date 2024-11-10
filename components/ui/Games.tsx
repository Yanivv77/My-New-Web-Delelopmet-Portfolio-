'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import ChessGame from './ChessGame'
import PacmanGame from './PacmanGame'

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<'chess' | 'pacman' | null>(null)

  return (
    <section className="w-full py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-8">
          {!selectedGame ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CardContent className="pt-6">
                <ChessGame />
              </CardContent>
              <CardContent className="hidden lg:block pt-6">
                <PacmanGame />
              </CardContent>
            </div>
          ) : (
            <div className="w-full">
              {selectedGame === 'chess' ? (
                <ChessGame onClose={() => setSelectedGame(null)} />
              ) : (
                <PacmanGame onClose={() => setSelectedGame(null)} />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
} 