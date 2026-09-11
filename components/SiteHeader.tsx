import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";

const NAV = [
  { href: "/quiz", label: "책 추천받기", emphasis: true },
  { href: "/year", label: "한 해", emphasis: false },
  { href: "/books", label: "서재", emphasis: false },
  { href: "/books?genre=소설", label: "소설", emphasis: false },
  { href: "/books?genre=인문", label: "인문", emphasis: false },
  { href: "/books?genre=과학", label: "과학", emphasis: false },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-end px-4 py-1.5 text-xs text-muted sm:px-5 sm:py-2">
        <Link href="/admin" className="inline-flex min-h-9 items-center">
          관리
        </Link>
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-4 pb-3 md:flex-row md:items-center md:gap-8 md:px-5 md:pb-4">
        <Link href="/" className="font-serif shrink-0 text-[22px] font-bold tracking-tight text-navy md:text-[26px]">
          成珉文庫
        </Link>
        <div className="min-w-0 md:flex-1">
          <SearchBar />
        </div>
      </div>
      <nav className="border-t border-line">
        <div className="no-scrollbar mx-auto flex max-w-[1200px] items-center gap-4 overflow-x-auto px-4 py-2 text-sm sm:gap-5 sm:px-5 sm:py-3">
          <Link
            href="/books"
            className="inline-flex min-h-9 shrink-0 items-center rounded-full border border-line px-3 text-ink"
          >
            전체
          </Link>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.emphasis
                  ? "inline-flex min-h-9 shrink-0 items-center font-medium text-accent"
                  : "inline-flex min-h-9 shrink-0 items-center text-ink"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
