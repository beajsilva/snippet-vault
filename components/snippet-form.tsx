"use client";

import { FormState } from "@/actions";
import { Editor } from "@monaco-editor/react";
import type { Snippet } from "@prisma/client";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

interface SnippetFormProps {
  snippet?: Snippet;
  action: (formState: FormState, formData: FormData) => Promise<FormState>;
}

export default function SnippetForm({ snippet, action }: SnippetFormProps) {
  const [code, setCode] = useState(snippet?.code || "");
  const [language, setLanguage] = useState(snippet?.language || "javascript");
  const [formState, actionDispatch, pending] = useActionState(action, {
    message: "",
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <form action={actionDispatch} className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-surface border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-main tracking-tight">
            {snippet ? "Edit Snippet" : "New Code Snippet"}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Fill in the details below to save your code to the cloud.
          </p>
        </div>

        <div className="space-y-6">
          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-main" htmlFor="title">
              Snippet Title
            </label>
            <input
              name="title"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-main focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all outline-none bg-slate-50/50"
              id="title"
              defaultValue={snippet?.title}
              placeholder="e.g. useCustom Hook"
            />
          </div>

          {/* Language Selection */}
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-semibold text-main"
              htmlFor="language"
            >
              Language
            </label>
            <select
              name="language"
              id="language"
              className="select-custom w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all outline-none bg-slate-50/50"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="json">JSON</option>
            </select>
          </div>

          {/* Code Editor */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-main">
              Source Code
            </label>
            <input type="hidden" name="code" value={code} />

            <div className="w-full border border-slate-200 rounded-lg overflow-hidden bg-[#1e1e1e]">
              {isMounted ? (
                <Editor
                  height="45vh"
                  language={language}
                  theme="vs-dark"
                  defaultValue={snippet?.code || ""}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    padding: { top: 16, bottom: 16 },
                  }}
                  onChange={(value) => setCode(value || "")}
                />
              ) : (
                <div className="h-[45vh] bg-[#1e1e1e] flex items-center justify-center text-slate-600 font-mono text-xs">
                  Loading Editor...
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {formState.message && (
            <div className="p-3 bg-danger/10 border border-danger/15 rounded-lg text-danger text-sm font-medium text-center">
              {formState.message}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t border-slate-100 mt-6 gap-3">
            <Link
              href={snippet ? `/snippets/${snippet.id}` : "/"}
              className="flex-1 md:flex-none text-center px-5 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-main bg-surface hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              Cancel
            </Link>
            {/* This is not necessary, pending works fine */}
            {/* <SubmitButton /> */}
            <button
              type="submit"
              disabled={pending}
              className="bg-main text-white px-8 py-2.5 rounded-lg font-semibold text-sm hover:bg-slate-800 disabled:bg-slate-400 transition-all flex items-center gap-2"
            >
              {pending ? "Saving..." : "Save Snippet"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
