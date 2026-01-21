export default function SnippetLoading() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="animate-pulse">
        {/* Header Placeholder */}
        <div className="h-8 w-48 bg-slate-200 rounded mb-4"></div>
        <div className="h-4 w-64 bg-slate-200 rounded mb-10"></div>
        
        {/* Grid Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-48 bg-slate-200 rounded-xl"></div>
          <div className="h-48 bg-slate-200 rounded-xl"></div>
          <div className="h-48 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}