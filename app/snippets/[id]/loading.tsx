export default function SnippetLoading() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="animate-pulse">
        {/* Header Placeholder */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <div className="h-10 w-70 bg-slate-200 rounded"></div>
            <div className="h-5 w-20 bg-slate-200 rounded mt-2"></div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto mb-">
            <div className="h-8 w-20 bg-slate-200 rounded"></div>
            <div className="h-8 w-20 bg-slate-200 rounded"></div>
            <div className="h-8 w-20 bg-slate-200 rounded"></div>
          </div>
        </div>

        {/* Code Placeholders */}
        <div className="h-100 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
}
