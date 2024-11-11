import React from 'react';

interface CodeInputProps {
  text: string;
  setText: (text: string) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({ text, setText }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Your Code</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-64 bg-gray-900 text-white p-4 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Enter your code here..."
        spellCheck="false"
      />
    </div>
  );
};