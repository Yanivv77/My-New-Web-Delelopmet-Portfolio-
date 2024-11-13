'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'

interface GameCanvasCardProps {
  title: string
  isPlaying: boolean
  statusText: string
  titleColor?: string
  onClose?: () => void
  controls?: React.ReactNode
  children: React.ReactNode
}

export default function GameCanvasCard({
  title,
  isPlaying,
  statusText,
  titleColor = 'text-white',
  onClose,
  controls,
  children
}: GameCanvasCardProps) {
  return (
    <Card className=" max-w-[1200px] bg-gray-800 border-white relative">
      <Button
        onClick={onClose}
        className="absolute right-4 top-4 hover:bg-gray-700"
        variant="ghost"
        size="icon"
      >
        <X className="h-4 w-4 text-white" />
      </Button>
      <CardHeader>
        <CardTitle className={`text-2xl font-bold text-center ${titleColor}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <Badge variant={isPlaying ? "outline" : "secondary"} className="mb-4 text-white">
            {statusText}
          </Badge>
          {children}
          {controls && (
            <div className="flex gap-4 mt-4">
              {controls}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 