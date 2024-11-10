export function PngToSvgModal() {
  return (
    <div className="text-white/80">
      <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center mb-4">
        <p className="text-sm">Drag and drop your PNG file here</p>
      </div>
      <button className="w-full p-3 rounded-lg bg-navy-600 hover:bg-navy-500 text-white transition-colors duration-300">
        Convert to SVG
      </button>
    </div>
  );
} 