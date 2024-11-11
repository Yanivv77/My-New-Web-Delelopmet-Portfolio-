import React from 'react';
import { Download, Copy, RefreshCw } from 'lucide-react';

interface PreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  generateImage: () => void;
  downloadImage: () => void;
  copyImage: () => void;
}

export const Preview: React.FC<PreviewProps> = ({
  canvasRef,
  generateImage,
  downloadImage,
  copyImage,
}) => {
  return (
    <div className="bg-glass-200 rounded-lg p-6 shadow-xl">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">Preview</h3>
        <div className="flex gap-2">

          <button
            onClick={downloadImage}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            title="Download image"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="max-w-full"
          style={{ maxHeight: '400px' }}
        />
      </div>
    </div>
  );
};