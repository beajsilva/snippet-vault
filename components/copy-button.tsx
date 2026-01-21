'use client';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface CopyButtonProps {
  code: string;
}

export default function CopyButton({ code }: CopyButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard!", {position: 'top-center'});
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
    >
      <Copy size={14} />
      Copy
    </button>
  );
}