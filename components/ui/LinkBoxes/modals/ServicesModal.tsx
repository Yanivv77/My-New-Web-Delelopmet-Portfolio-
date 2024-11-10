export function ServicesModal() {
  return (
    <div className="grid grid-cols-2 gap-4 text-white/80">
      <div className="p-4 rounded-lg bg-navy-700/30 border border-white/10">
        <h4 className="font-medium mb-2">GitHub</h4>
        <p className="text-sm">Version control and collaboration</p>
      </div>
      <div className="p-4 rounded-lg bg-navy-700/30 border border-white/10">
        <h4 className="font-medium mb-2">Vercel</h4>
        <p className="text-sm">Deployment and hosting</p>
      </div>
    </div>
  );
} 