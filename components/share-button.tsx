"use client";

import { toggleSnippetPrivacy } from "@/actions";
import { AlertCircle, Globe, Lock } from "lucide-react";
import { useState, useTransition } from "react";

interface ShareButtonProps {
  id: string;
  isPublic: boolean;
}

export default function ShareButton({ id, isPublic }: ShareButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleClick = () => {
    setError("");
    startTransition(async () => {
      const result = await toggleSnippetPrivacy(id, isPublic);
      if (result && result.message) {
        setError(result.message);
      }
    });
  };

  return (
    <div className="flex items-center gap-3">
      {error && (
        <span className="text-xs text-red-500 font-medium flex items-center gap-1 animate-pulse">
          <AlertCircle size={12} />
          {error}
        </span>
      )}

      <button
        onClick={handleClick}
        disabled={isPending}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border cursor-pointer
          ${
            isPublic
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
          }
          ${isPending ? "opacity-50 cursor-wait" : ""}
        `}
      >
        {isPending ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : isPublic ? (
          <Globe size={16} />
        ) : (
          <Lock size={16} />
        )}
        {isPublic ? "Public" : "Private"}
      </button>
    </div>
  );
}
