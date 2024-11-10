export function ImageToWebpModal() {
  return (
    <div className="text-white/80">
      <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center mb-4">
        <p className="text-sm">Drag and drop your image here</p>
      </div>
      <div className="flex gap-4 mb-4">
        <input 
          type="range" 
          className="w-full"
          min="0"
          max="100"
          defaultValue="80"
        />
        <span className="text-sm">Quality: 80%</span>
      </div>
      <button className="w-full p-3 rounded-lg bg-navy-600 hover:bg-navy-500 text-white transition-colors duration-300">
        Convert to WebP
      </button>
    </div>
  );
} 