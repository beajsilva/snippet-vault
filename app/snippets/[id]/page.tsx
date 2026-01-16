import { deleteSnippet } from "@/actions";
import CodeViewer from "@/components/code-viewer";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SnippetShowPageProps {
  params: Promise<{ id: string }>;
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  const { id } = await props.params;
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-main tracking-tight">
            {snippet.title}
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2.5 py-0.5 text-[10px] font-black tracking-widest text-brand uppercase bg-brand/20 border border-brand/30 rounded-md">
              {snippet.language}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="flex-1 md:flex-none text-center px-5 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-main bg-surface hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction} className="flex-1 md:flex-none">
            <button className="w-full px-5 py-2 border border-danger/10 rounded-lg text-sm font-semibold text-danger bg-danger/10 hover:bg-danger/20 hover:border-danger/30 transition-all shadow-sm">
              Delete
            </button>
          </form>
        </div>
      </div>

      {/* Code View */}
      <div className="rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 bg-[#1e1e1e] border border-slate-200">
        <div className="flex items-center justify-between px-5 py-3 bg-[#252525] border-b border-[#333]">
          <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest select-none">
            Read only
          </span>
        </div>
        <CodeViewer code={snippet.code} language={snippet.language} />
      </div>

      {/* Action */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-brand transition-all"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to Collection
        </Link>
      </div>
    </div>
  );
}
