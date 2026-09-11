"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/books?q=${encodeURIComponent(value)}` : "/books");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-11 min-w-0 flex-1 items-center rounded-full border border-[#c8c8c8] px-3 sm:h-12 sm:px-4"
    >
      <span className="hidden pr-3 text-sm text-muted sm:inline">통합검색</span>
      <span className="hidden h-4 w-px bg-line sm:block" />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="책 제목 또는 저자"
        className="h-full min-w-0 flex-1 bg-transparent px-1 text-base outline-none placeholder:text-muted sm:px-3 sm:text-sm"
      />
      <button type="submit" className="shrink-0 px-1 text-sm font-medium text-navy sm:px-0">
        검색
      </button>
    </form>
  );
}
