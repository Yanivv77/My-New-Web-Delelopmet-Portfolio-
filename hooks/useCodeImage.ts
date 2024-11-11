import { useState, useRef, useCallback, useEffect } from 'react';
import { tokenize } from '../lib/syntax';
import { VSCodeThemes } from '../lib/themes';


export const useCodeImage = () => {
  const [text, setText] = useState('const greeting = "Hello, World!";\nconsole.log(greeting);');
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('dark');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const padding = 20;
    const lineHeight = fontSize * 1.4;
    
    // Split text into lines and tokenize
    const lines = text.split('\n');
    const tokenizedLines = lines.map(line => tokenize(line));
    
    // Calculate canvas dimensions
    ctx.font = `${fontSize}px "Fira Code", monospace`;
    const maxLineWidth = Math.max(...lines.map(line => ctx.measureText(line).width));
    canvas.width = maxLineWidth + (padding * 2);
    canvas.height = (lines.length * lineHeight) + (padding * 2);

    // Set background
    const colors = VSCodeThemes[theme];
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    ctx.font = `${fontSize}px "Fira Code", monospace`;
    ctx.textBaseline = 'top';

    tokenizedLines.forEach((tokens, lineIndex) => {
      let xOffset = padding;
      tokens.forEach(({ text: tokenText, type }: { text: string; type: any }) => {
        ctx.fillStyle = colors[type as keyof typeof colors] || colors.default;
        ctx.fillText(tokenText, xOffset, padding + (lineIndex * lineHeight));
        xOffset += ctx.measureText(tokenText).width;
      });
    });
  }, [text, fontSize, theme]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'code-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const copyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve));
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
      }
    } catch (err) {
      console.error('Failed to copy image:', err);
    }
  };

  useEffect(() => {
    generateImage();
  }, [generateImage]);

  return {
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
  };
};