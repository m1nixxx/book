"use client";

import Link from "next/link";
import { CoverImage } from "@/components/CoverImage";
import type { Book } from "@/lib/types";

type Props = {
  books: Book[];
};

export function AutoShelf({ books }: Props) {
  if (books.length === 0) return null;

  const loop = [...books, ...books];
  const duration = Math.max(48, books.length * 2.4);

  return (
    <div className="overflow-hidden">
      <div className="shelf-track" style={{ animationDuration: `${duration}s` }}>
        {loop.map((book, index) => (
          <Link
            key={`${book.id}-${index}`}
            href={`/books/${book.id}`}
            className="w-[112px] shrink-0 sm:w-[120px]"
          >
            <span className="block h-[160px] overflow-hidden bg-paper-deep sm:h-[170px]">
              {book.cover ? <CoverImage src={book.cover} alt={book.title} /> : null}
            </span>
            <span className="mt-2 line-clamp-2 block text-[13px] leading-5 text-ink">{book.title}</span>
            <span className="mt-1 line-clamp-1 block text-xs text-muted">{book.author}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
