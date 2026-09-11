import type { Book } from "@/lib/types";

export type ReadingFile = {
  best2025: string[];
  reads: Array<{ title: string; year: number; month: number }>;
};

export type ReadingPeriod = {
  id: string;
  label: string;
  year: number;
  month: number | null;
};

function compact(value: string): string {
  return value.replace(/\s+/g, "").replace(/[.,'"“”‘’·\-]/g, "").toLowerCase();
}

export function attachReading(books: Book[], reading: ReadingFile): Book[] {
  const bestOrder = new Map(reading.best2025.map((title, index) => [compact(title), index]));
  const byTitle = new Map(reading.reads.map((item) => [compact(item.title), item]));

  return books.map((book) => {
    const key = compact(book.seedTitle || book.title);
    const found = byTitle.get(key);
    const rank = bestOrder.get(key);
    return {
      ...book,
      best2025: rank !== undefined,
      best2025Rank: rank ?? null,
      readYear: found?.year ?? null,
      readMonth: found?.month ?? null,
    };
  });
}

export function readingPeriods(books: Book[]): ReadingPeriod[] {
  const months = new Map<string, ReadingPeriod>();
  for (const book of books) {
    if (!book.readYear || !book.readMonth) continue;
    const id = `${book.readYear}-${String(book.readMonth).padStart(2, "0")}`;
    if (!months.has(id)) {
      months.set(id, {
        id,
        label: `${book.readMonth}월의 책`,
        year: book.readYear,
        month: book.readMonth,
      });
    }
  }

  const list = [...months.values()].sort((a, b) => a.id.localeCompare(b.id));
  if (books.some((book) => book.best2025)) {
    list.unshift({
      id: "2025-best",
      label: "2025년 BEST",
      year: 2025,
      month: null,
    });
  }
  return list;
}

export function booksInPeriod(books: Book[], period: ReadingPeriod): Book[] {
  if (period.id === "2025-best") {
    return books
      .filter((book) => book.best2025)
      .sort((a, b) => (a.best2025Rank ?? Number.MAX_SAFE_INTEGER) - (b.best2025Rank ?? Number.MAX_SAFE_INTEGER));
  }
  return books.filter((book) => book.readYear === period.year && book.readMonth === period.month);
}

export function defaultPeriod(periods: ReadingPeriod[], now = new Date()): ReadingPeriod {
  const current = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  return periods.find((item) => item.id === current) ?? periods.at(-1) ?? periods[0];
}

export function readWhenLabel(book: Book): string | null {
  if (book.readYear && book.readMonth) {
    return `${book.readYear}년 ${book.readMonth}월`;
  }
  if (book.best2025) return "2025년 BEST";
  return null;
}
