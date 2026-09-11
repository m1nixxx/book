import Link from "next/link";
import { bookKindLabel, type Book } from "@/lib/types";

type Props = {
  book: Book;
  reason?: string;
};

export function BookCard({ book, reason }: Props) {
  return (
    <article className="flex gap-4 border border-line bg-card p-4">
      <Link href={`/books/${book.id}`} className="relative h-36 w-24 shrink-0 overflow-hidden bg-paper-deep">
        {book.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
        ) : null}
      </Link>
      <div className="min-w-0">
        <p className="text-xs tracking-wide text-muted">{bookKindLabel(book)}</p>
        <h3 className="mt-1 font-serif text-lg leading-snug">
          <Link href={`/books/${book.id}`} className="hover:text-accent">
            {book.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted">{book.author}</p>
        {reason ? (
          <p className="mt-3 text-sm leading-6 text-ink/80">{reason}</p>
        ) : book.oneLiner ? (
          <div className="mt-3">
            <p className="text-[11px] tracking-[0.12em] text-navy/70">성민이의 감상평</p>
            <p className="mt-1 font-serif text-sm leading-6 text-navy">
              <span aria-hidden className="text-navy/30">
                “
              </span>
              {book.oneLiner}
              <span aria-hidden className="text-navy/30">
                ”
              </span>
            </p>
          </div>
        ) : null}
      </div>
    </article>
  );
}
