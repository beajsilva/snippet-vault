"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-main text-white px-8 py-2.5 rounded-lg font-semibold text-sm hover:bg-slate-800 disabled:bg-slate-400 transition-all flex items-center gap-2"
    >
      {pending ? "Saving..." : "Save Snippet"}
    </button>
  );
}