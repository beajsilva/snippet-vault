import { editSnippet } from "@/actions";
import SnippetForm from "@/components/snippet-form";
import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

interface SnippetEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
   await new Promise((r) => setTimeout(r, 1000));
  const { id } = await props.params;
  
  const { userId } = await auth();
  if (!userId) redirect("/");

  const snippet = await db.snippet.findFirst({
    where: { id, userId },
  });

  if (!snippet) {
    return notFound();
  }

  const editSnippetAction = editSnippet.bind(null, snippet.id);

  return (
    <div className="p-4">
      <SnippetForm snippet={snippet} action={editSnippetAction} />
    </div>
  );
}
