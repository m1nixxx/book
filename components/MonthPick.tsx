"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { booksInPeriod, type ReadingPeriod } from "@/lib/reading";
import type { Book } from "@/lib/types";

type Props = {
  books: Book[];
  periods: ReadingPeriod[];
  initialPeriodId: string;
};

export function MonthPick({ books, periods, initialPeriodId }: Props) {
  const [periodId, setPeriodId] = useState(initialPeriodId);
  const [deskIndex, setDeskIndex] = useState(0);

  const period = periods.find((item) => item.id === periodId) ?? periods[0];
  const pool = useMemo(() => (period ? booksInPeriod(books, period) : []), [books, period]);
  const book = pool[deskIndex] ?? pool[0];

  useEffect(() => {
    setDeskIndex(0);
  }, [periodId]);

  useEffect(() => {
    if (pool.length < 2) return;
    const timer = window.setInterval(() => {
      setDeskIndex((current) => (current + 1) % pool.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [pool.length, periodId]);

  if (!period || !book) return null;

  return (
    <section className="hidden rounded-2xl border border-line bg-white md:block">
      <div className="flex items-center justify-between gap-3 border-b border-line px-6 py-4">
        <h2 className="text-lg font-bold text-navy">{period.label}</h2>
        <div className="flex gap-1 overflow-x-auto">
          {periods.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPeriodId(item.id)}
              className={`inline-flex min-h-8 shrink-0 items-center rounded-full px-3 text-xs ${
                item.id === period.id ? "bg-navy text-white" : "text-muted"
              }`}
            >
              {item.month ? `${item.month}월` : "2025 BEST"}
            </button>
          ))}
        </div>
      </div>
      <div className="grid items-center gap-8 px-6 py-8 md:grid-cols-[220px_1fr]">
        <Link href={`/books/${book.id}`} className="justify-self-center">
          {book.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.cover}
              alt={book.title}
              className="h-72 w-48 object-cover shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            />
          ) : null}
        </Link>
        <div className="min-w-0">
          <p className="text-sm text-muted">
            {book.genre}
            {book.subgenre ? ` · ${book.subgenre}` : ""}
          </p>
          <h3 className="mt-3 font-serif text-3xl leading-snug break-keep text-navy">
            <Link href={`/books/${book.id}`}>{book.title}</Link>
          </h3>
          <p className="mt-2 text-sm text-muted">{book.author}</p>
          <p className="mt-5 max-w-xl text-base leading-7 text-ink/80">{book.oneLiner}</p>
          {pool.length > 1 ? (
            <div className="mt-6 flex items-center gap-3 text-sm">
              <button
                type="button"
                onClick={() => setDeskIndex((current) => (current - 1 + pool.length) % pool.length)}
                className="inline-flex min-h-9 items-center rounded-full border border-line bg-white px-4"
              >
                이전
              </button>
              <button
                type="button"
                onClick={() => setDeskIndex((current) => (current + 1) % pool.length)}
                className="inline-flex min-h-9 items-center rounded-full border border-line bg-white px-4"
              >
                다음
              </button>
              <span className="text-muted">
                {deskIndex + 1} / {pool.length}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
