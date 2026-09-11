"use client";

import Link from "next/link";
import { useMemo, type ReactNode } from "react";
import { AutoShelf } from "@/components/AutoShelf";
import { MonthPick } from "@/components/MonthPick";
import { readingPeriods } from "@/lib/reading";
import type { Book } from "@/lib/types";

type Props = {
  books: Book[];
  initialPeriodId: string;
  children?: ReactNode;
};

export function HomeShowcase({ books, initialPeriodId, children }: Props) {
  const periods = useMemo(() => readingPeriods(books), [books]);

  return (
    <div className="flex flex-col">
      <MonthPick books={books} periods={periods} initialPeriodId={initialPeriodId} />
      <section className="order-1 md:order-3 md:mt-12">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-xl font-bold">서재</h2>
          <Link href="/books" className="text-sm text-muted">
            서재 전체
          </Link>
        </div>
        <AutoShelf books={books} />
      </section>
      <div className="order-2">{children}</div>
    </div>
  );
}
