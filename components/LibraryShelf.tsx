import Link from "next/link";
import { CoverImage } from "@/components/CoverImage";
import type { Book } from "@/lib/types";

type Props = {
  books: Book[];
  label?: string;
};

export function LibraryShelf({ books, label }: Props) {
  if (books.length === 0) return null;

  return (
    <section className="mb-10">
      {label ? <h2 className="mb-4 text-base font-bold text-ink">{label}</h2> : null}
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-8 md:grid-cols-6">
        {books.map((book) => (
          <Link key={book.id} href={`/books/${book.id}`} className="min-w-0">
            <span className="block aspect-[2/3] overflow-hidden bg-paper-deep">
              {book.cover ? <CoverImage src={book.cover} alt={book.title} /> : null}
            </span>
            <span className="mt-2 line-clamp-2 block text-sm leading-5 break-keep">{book.title}</span>
            <span className="mt-1 line-clamp-1 block text-xs text-muted">{book.author}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
