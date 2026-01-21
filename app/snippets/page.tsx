import SearchInput from "@/components/search-input";
import SnippetList from "@/components/snippet-list";
import { auth } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface SnippetPageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function SnippetsPage(props: SnippetPageProps) {
  const searchParams = await props.searchParams;
  const query = searchParams.query || "";

  const { userId } = await auth();
  if (!userId) redirect("/");

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Library</h1>
          <p className="text-slate-500 mt-1">Manage and organize your code.</p>
        </div>

        <div className="flex items-center gap-4">
          <SearchInput />

          <Link
            href="/snippets/new"
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-all font-medium text-sm whitespace-nowrap"
          >
            <Plus size={18} />
            New Snippet
          </Link>
        </div>
      </div>
      {/* Grid Section */}
      <Suspense
        key={query}
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-48 bg-slate-200 rounded-xl"></div>
            <div className="h-48 bg-slate-200 rounded-xl"></div>
            <div className="h-48 bg-slate-200 rounded-xl"></div>
          </div>
        }
      >
        <SnippetList query={query} userId={userId} />
      </Suspense>
    </div>
  );
}
