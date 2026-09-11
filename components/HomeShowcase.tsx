"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { AutoShelf } from "@/components/AutoShelf";
import { MonthPick } from "@/components/MonthPick";
import { booksInPeriod, readingPeriods } from "@/lib/reading";
import type { Book } from "@/lib/types";

type Props = {
  books: Book[];
  initialPeriodId: string;
  children?: ReactNode;
};

export function HomeShowcase({ books, initialPeriodId, children }: Props) {
  const periods = useMemo(() => readingPeriods(books), [books]);
  const [periodId, setPeriodId] = useState(initialPeriodId);
  const period = periods.find((item) => item.id === periodId) ?? periods[0];
  const pool = booksInPeriod(books, period);

  return (
    <>
      <MonthPick books={pool} period={period} periods={periods} onPeriod={setPeriodId} />
      {children}
      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-xl font-bold">서가</h2>
          <Link href="/books" className="text-sm text-muted">
            서가 전체
          </Link>
        </div>
        <AutoShelf books={books} />
      </section>
    </>
  );
}
