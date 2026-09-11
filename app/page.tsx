import Link from "next/link";
import { HomeShowcase } from "@/components/HomeShowcase";
import { getBooks } from "@/lib/books";
import { defaultPeriod, readingPeriods } from "@/lib/reading";

export const dynamic = "force-dynamic";

const QUICK = [
  { href: "/quiz", label: "책 추천받기" },
  { href: "/books", label: "서재 전체" },
  { href: "/books?genre=소설", label: "소설" },
  { href: "/books?genre=인문", label: "인문" },
  { href: "/books?genre=과학", label: "과학" },
];

export default async function HomePage() {
  const books = await getBooks();
  const initialPeriodId = defaultPeriod(readingPeriods(books)).id;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-5 sm:px-5 sm:py-8">
        <HomeShowcase books={books} initialPeriodId={initialPeriodId}>
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-5 sm:gap-3">
            {QUICK.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  item.href === "/quiz"
                    ? "col-span-2 flex min-h-16 items-center justify-center rounded-xl border border-line bg-white px-2 py-3 text-center text-base font-medium text-ink sm:col-span-1 sm:min-h-12 sm:text-sm sm:font-normal"
                    : "flex min-h-12 items-center justify-center rounded-xl border border-line bg-white px-2 py-3 text-center text-sm text-ink"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </HomeShowcase>
      </div>
    </div>
  );
}
