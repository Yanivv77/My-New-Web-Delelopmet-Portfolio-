import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, RotateCcw } from 'lucide-react'

interface GameCanvasCardProps {
  title: string;
  isPlaying: boolean;
  statusText: string;
  titleColor?: string;
  children: React.ReactNode;
  onClose?: () => void;
  controls?: React.ReactNode;
}

export default function GameCanvasCard({
  title,
  isPlaying,
  statusText,
  titleColor = "text-white",
  children,
  onClose,
  controls
}: GameCanvasCardProps): JSX.Element {
  return (
    <Card className="text-center bg-gray-800 border-white w-full max-w-4xl">
      <div className="p-4 flex flex-col items-center gap-4">
        {children}

        <div className="w-full max-w-xs space-y-4 flex flex-col items-center">
          <div className="text-center mb-4">
            <Badge variant="outline" className={`text-lg p-2 ${titleColor}`}>
              {statusText}
            </Badge>
          </div>
          
          <div className="flex flex-col justify-center gap-2 w-full">
            {controls}
          </div>
        </div>
      </div>
    </Card>
  );
} 