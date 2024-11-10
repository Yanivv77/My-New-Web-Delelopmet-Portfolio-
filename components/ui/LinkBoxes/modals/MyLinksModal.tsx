export function MyLinksModal() {
  return (
    <div className="text-white/80">
      <p className="mb-4">Manage and organize all your important links in one place.</p>
      <div className="space-y-2">
        <input 
          type="text" 
          placeholder="Enter your link" 
          className="w-full p-3 rounded-lg bg-navy-700/50 border border-white/10 text-white placeholder-white/40"
        />
        <button className="w-full p-3 rounded-lg bg-navy-600 hover:bg-navy-500 text-white transition-colors duration-300">
          Add Link
        </button>
      </div>
    </div>
  );
} 