"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReadingPeriod } from "@/lib/reading";
import type { Book } from "@/lib/types";

type Props = {
  books: Book[];
  period: ReadingPeriod;
  periods: ReadingPeriod[];
  onPeriod: (id: string) => void;
};

export function MonthPick({ books, period, periods, onPeriod }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [period.id]);

  useEffect(() => {
    if (paused || books.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % books.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, books.length, period.id]);

  const book = books[index];
  if (!book) return null;

  return (
    <section
      className="overflow-hidden rounded-2xl border border-line bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex flex-col gap-3 border-b border-line px-6 py-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-bold text-navy">{period.label}</h2>
        <div className="no-scrollbar flex gap-1 overflow-x-auto text-xs">
          {periods.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onPeriod(item.id)}
              className={`shrink-0 rounded-full px-3 py-1 ${
                period.id === item.id ? "bg-navy text-white" : "text-muted hover:text-ink"
              }`}
            >
              {item.month ? `${item.month}월` : "2025 BEST"}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-8 px-6 py-8 md:grid-cols-[180px_1fr] md:items-center">
        <Link href={`/books/${book.id}`} className="justify-self-center">
          {book.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.cover}
              alt={book.title}
              className="h-60 w-40 object-cover shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            />
          ) : null}
        </Link>
        <div>
          <p className="text-sm text-muted">
            {book.genre}
            {book.subgenre ? ` · ${book.subgenre}` : ""}
          </p>
          <h3 className="mt-3 font-serif text-3xl leading-snug text-navy">
            <Link href={`/books/${book.id}`}>{book.title}</Link>
          </h3>
          <p className="mt-2 text-sm text-muted">{book.author}</p>
          <p className="mt-5 max-w-xl text-base leading-7 text-ink/80">{book.oneLiner}</p>
          {books.length > 1 ? (
            <div className="mt-6 flex items-center gap-3 text-sm">
              <button
                type="button"
                onClick={() => setIndex((current) => (current - 1 + books.length) % books.length)}
                className="rounded-full border border-line bg-white px-3 py-1 text-ink"
              >
                이전
              </button>
              <button
                type="button"
                onClick={() => setIndex((current) => (current + 1) % books.length)}
                className="rounded-full border border-line bg-white px-3 py-1 text-ink"
              >
                다음
              </button>
              <span className="text-muted">
                {index + 1} / {books.length}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
