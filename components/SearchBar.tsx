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
    <form onSubmit={onSubmit} className="flex h-12 flex-1 items-center rounded-full border border-[#c8c8c8] px-4">
      <span className="pr-3 text-sm text-muted">통합검색</span>
      <span className="h-4 w-px bg-line" />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="문고에서 책 제목 또는 저자를 검색하세요"
        className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted"
      />
      <button type="submit" className="text-sm font-medium text-navy">
        검색
      </button>
    </form>
  );
}
