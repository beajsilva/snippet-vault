import { createSnippet } from "@/actions";
import SnippetForm from "@/components/snippet-form";

export default function SnippetCreatePage() {
  return (
    <div className="p-4">
      <SnippetForm action={createSnippet} />
    </div>
  );
}