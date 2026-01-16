import { editSnippet } from "@/actions";
import SnippetForm from "@/components/snippet-form";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface SnippetEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  const { id } = await props.params;
  const idNum = parseInt(id);

  const snippet = await db.snippet.findFirst({
    where: { id: idNum },
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
