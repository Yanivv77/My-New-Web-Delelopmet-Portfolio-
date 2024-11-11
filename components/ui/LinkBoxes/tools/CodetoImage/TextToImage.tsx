import React from 'react';
import { Download, Copy, Image, RefreshCw } from 'lucide-react';
import { CodeInput } from './CodeInput';
import { Controls } from './Controls';
import { Preview } from './Preview';
import { useCodeImage } from '@/hooks/useCodeImage';

const TextToImage = () => {
  const {
    text,
    setText,
    fontSize,
    setFontSize,
    theme,
    setTheme,
    canvasRef,
    generateImage,
    downloadImage,
    copyImage
  } = useCodeImage();

  return (
    <div className=" text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Image className="w-8 h-8" aria-label="Code to Image Converter" />
            Code to Image Converter
          </h1>
          <p className="text-gray-400">Transform your code into beautiful images with VS Code themes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-glass-200 rounded-lg p-6 shadow-xl">
            <CodeInput text={text} setText={setText} />
            <Controls
              fontSize={fontSize}
              setFontSize={setFontSize}
              theme={theme}
              setTheme={setTheme}
            />
          </div>

          <Preview
            canvasRef={canvasRef}
            generateImage={generateImage}
            downloadImage={downloadImage}
            copyImage={copyImage}
          />
        </div>
      </div>
    </div>
  );
};

export default TextToImage;