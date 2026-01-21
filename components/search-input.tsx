"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [term, setTerm] = useState(searchParams.get("query")?.toString() || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }

      replace(`${pathname}?${params.toString()}`);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [term]);

  return (
    <div className="relative flex-1 max-w-sm">
      <input
        id="searchInput"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500"
        placeholder="Search snippets..."
        onChange={(e) => setTerm(e.target.value)}
        value={term}
      />
    </div>
  );
}
