import Link from "next/link";
import { HomeShowcase } from "@/components/HomeShowcase";
import { getBooks } from "@/lib/books";
import { defaultPeriod, readingPeriods } from "@/lib/reading";

export const dynamic = "force-dynamic";

const QUICK = [
  { href: "/quiz", label: "책 추천받기" },
  { href: "/books", label: "서가 전체" },
  { href: "/books?genre=소설", label: "소설" },
  { href: "/books?genre=인문", label: "인문" },
  { href: "/books?genre=과학", label: "과학" },
];

export default async function HomePage() {
  const books = await getBooks();
  const initialPeriodId = defaultPeriod(readingPeriods(books)).id;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-8">
        <HomeShowcase books={books} initialPeriodId={initialPeriodId}>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {QUICK.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-line bg-white py-4 text-center text-sm text-ink"
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
