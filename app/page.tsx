import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-3xl font-bold text-main tracking-tight">
            Snippet Collection
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {snippets.length} saved pieces of code
          </p>
        </div>
        <Link
          href="/snippets/new"
          className="bg-main text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-main/90 transition-all shadow-sm active:scale-95"
        >
          + New Snippet
        </Link>
      </div>

      {/* The Snippet List */}
      <div className="grid grid-cols-1 gap-4">
        {snippets.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">
              No snippets found. Start by creating your first one!
            </p>
          </div>
        ) : (
          snippets.map((snippet) => (
            <Link
              key={snippet.id}
              href={`/snippets/${snippet.id}`}
              className="group flex items-center justify-between p-6 bg-surface border border-slate-200 rounded-xl hover:border-brand hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-6">
                {/* Language Icon Box */}
                <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-lg group-hover:bg-brand/10 transition-colors">
                  <span className="text-[10px] font-black text-slate-400 group-hover:text-brand uppercase tracking-tighter">
                    {snippet.language.slice(0, 3)}
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-main capitalize group-hover:text-brand transition-colors">
                    {snippet.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {snippet.language}
                    </span>
                    <span className="text-slate-200 text-xs">•</span>
                    <span className="text-xs text-slate-400">
                      View code details
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-300 group-hover:text-brand transition-all transform group-hover:translate-x-1">
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Open
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
