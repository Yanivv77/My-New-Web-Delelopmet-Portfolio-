import React from 'react';

interface ControlsProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  fontSize,
  setFontSize,
  theme,
  setTheme,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium mb-2">Font Size</label>
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full bg-gray-900 text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          min="8"
          max="32"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full bg-gray-900 text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="dark">Dark VSCode</option>
          <option value="light">Light VSCode)</option>
        </select>
      </div>
    </div>
  );
};