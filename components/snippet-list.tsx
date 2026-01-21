import { db } from "@/db";
import { Code, Globe, Lock } from "lucide-react";
import Link from "next/link";

interface SnippetListProps {
  query: string;
  userId: string;
}

export default async function SnippetList({ query, userId }: SnippetListProps) {
  // We added a small artificial delay so you can actually SEE the skeleton
  await new Promise((r) => setTimeout(r, 1000));

  const snippets = await db.snippet.findMany({
    where: {
      userId,
      title: { contains: query || "" },
    },
    orderBy: { id: "desc" },
  });

  if (snippets.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
        <h3 className="text-lg font-medium text-slate-900">
          {!query ? (
            <span>No snippets yet</span>
          ) : (
            <span>No snippets found</span>
          )}
        </h3>
        <p className="text-slate-500 max-w-sm mx-auto mt-2 mb-6">
          {!query ? (
            <span>
              Create your first snippet to start building your personal code
              vault.
            </span>
          ) : (
            <span>Try searching again.</span>
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {snippets.map((snippet) => (
        <Link
          key={snippet.id}
          href={`/snippets/${snippet.id}`}
          className="group block p-6 bg-white border border-slate-200 rounded-xl hover:border-brand hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-brand-50 rounded-lg text-brand group-hover:bg-brand group-hover:text-white transition-colors">
              <Code size={20} />
            </div>

            {/* Privacy Badge */}
            {snippet.isPublic ? (
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <Globe size={10} /> Public
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                <Lock size={10} /> Private
              </span>
            )}
          </div>

          <h2 className="font-semibold text-slate-900 mb-2 truncate group-hover:text-brand transition-colors">
            {snippet.title}
          </h2>

          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="capitalize">{snippet.language}</span>
            <span>View Code &rarr;</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
