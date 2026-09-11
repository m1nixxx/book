import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import { PageSheet } from "@/components/PageSheet";
import { getBook, getBooks } from "@/lib/books";
import { similarBooks } from "@/lib/recommend";
import { readWhenLabel } from "@/lib/reading";
import { bookKindLabel } from "@/lib/types";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BookDetailPage({ params }: Props) {
  const { id } = await params;
  const book = await getBook(id);
  if (!book) notFound();

  const others = similarBooks(await getBooks(), book, 3);

  return (
    <PageSheet>
      <Link href="/books" className="text-sm text-ink/60 hover:text-ink">
        서가로
      </Link>
      <div className="mt-6 flex gap-6">
        <div className="relative h-52 w-36 shrink-0 overflow-hidden bg-paper-deep">
          {book.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div>
          <p className="text-xs tracking-wide text-muted">
            {bookKindLabel(book)}
            {readWhenLabel(book) ? ` · ${readWhenLabel(book)}` : ""}
          </p>
          <h1 className="mt-2 font-serif text-3xl leading-tight">{book.title}</h1>
          {book.subTitle ? <p className="mt-2 text-sm text-muted">{book.subTitle}</p> : null}
          <p className="mt-4 text-sm">
            {book.author}
            <span className="text-muted"> · {book.publisher}</span>
          </p>
        </div>
      </div>

      {book.tags.length > 0 ? (
        <ul className="mt-8 flex flex-wrap gap-2 text-xs text-muted">
          {book.tags.map((tag) => (
            <li key={tag} className="border border-line px-2 py-1">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      {book.introduction ? (
        <section className="mt-10">
          <h2 className="font-serif text-xl">책 소개</h2>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-ink/85">{book.introduction}</p>
          <p className="mt-4 text-xs text-muted">소개 출처: 예스24</p>
        </section>
      ) : null}

      {book.oneLiner ? (
        <section className="mt-12">
          <h2 className="text-center font-serif text-xs tracking-[0.18em] text-muted">성민이의 감상평</h2>
          <blockquote className="relative mx-auto mt-6 max-w-xl px-10 py-6 text-center">
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 font-serif text-[4.5rem] leading-none text-navy/20"
            >
              “
            </span>
            <p className="font-serif text-[1.25rem] leading-9 text-navy">{book.oneLiner}</p>
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-[-0.4rem] right-0 font-serif text-[4.5rem] leading-none text-navy/20"
            >
              ”
            </span>
          </blockquote>
        </section>
      ) : null}

      <p className="mt-8">
        <a href={book.link} target="_blank" rel="noreferrer" className="text-sm underline">
          예스24에서 보기
        </a>
      </p>

      {others.length > 0 ? (
        <section className="mt-14">
          <h2 className="font-serif text-xl">가까운 결의 책</h2>
          <div className="mt-5 grid gap-4">
            {others.map((item) => (
              <BookCard key={item.id} book={item} />
            ))}
          </div>
        </section>
      ) : null}
    </PageSheet>
  );
}
