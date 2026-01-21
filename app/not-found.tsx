import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-bg-app text-text-main p-6 text-center">
      {/* 1. The Glitchy Number */}
      <h1 className="text-9xl font-black text-slate-300 select-none relative">
        404
        <span className="absolute top-0 left-0 -ml-1 text-slate-400 opacity-50 blur-sm animate-pulse">404</span>
      </h1>

      {/* 2. The Message */}
      <div className="space-y-4 mt-8 max-w-md">
        <h2 className="text-2xl font-bold tracking-tight">
          Snippet not found
        </h2>
        <p className="text-slate-500">
          The snippet you are looking for doesn't exist or is private.
        </p>
      </div>

      {/* 3. The Action */}
      <Link 
        href="/" 
        className="mt-8 px-6 py-3 rounded-lg bg-brand text-white font-medium hover:bg-brand/90 transition-all hover:scale-105 active:scale-95"
      >
        Return to Library
      </Link>

      {/* 4. Subtle Footer */}
      <div className="absolute bottom-10 text-xs text-slate-400 font-mono">
        ERR_SNIPPET_MISSING
      </div>
    </div>
  );
}