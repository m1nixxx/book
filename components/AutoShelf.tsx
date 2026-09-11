"use client";

import Link from "next/link";
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
          <Link key={`${book.id}-${index}`} href={`/books/${book.id}`} className="w-[120px] shrink-0">
            <span className="block h-[170px] overflow-hidden bg-paper-deep">
              {book.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
              ) : null}
            </span>
            <span className="mt-2 line-clamp-2 block text-[13px] leading-5 text-ink">{book.title}</span>
            <span className="mt-1 line-clamp-1 block text-xs text-muted">{book.author}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
