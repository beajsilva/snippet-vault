"use client";

import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";

interface CodeViewerProps {
  code: string;
  language: string;
}

export default function CodeViewer({ code, language }: CodeViewerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full border-slate-200 overflow-hidden bg-[#1e1e1e]">
      {isMounted ? (
        <Editor
          height="45vh"
          language={language}
          theme="vs-dark"
          value={code}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
            domReadOnly: true,
          }}
        />
      ) : (
        <div className="h-[45vh] bg-[#1e1e1e] flex items-center justify-center text-slate-600 font-mono text-xs">
          Loading Viewer...
        </div>
      )}
    </div>
  );
}
