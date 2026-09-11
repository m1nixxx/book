import Link from "next/link";
import { ChallengeEntry } from "@/components/ChallengeEntry";
import { SearchBar } from "@/components/SearchBar";
import { getChallenge } from "@/lib/books";

const NAV = [
  { href: "/quiz", label: "책 추천받기", emphasis: true },
  { href: "/books", label: "서가", emphasis: false },
  { href: "/books?genre=소설", label: "소설", emphasis: false },
  { href: "/books?genre=인문", label: "인문", emphasis: false },
  { href: "/books?genre=과학", label: "과학", emphasis: false },
];

export async function SiteHeader() {
  const challenge = await getChallenge();

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-end gap-4 px-5 py-2 text-xs text-muted">
        <Link href="/admin">관리</Link>
      </div>
      <div className="mx-auto flex max-w-[1200px] items-center gap-8 px-5 pb-4">
        <Link href="/" className="font-serif shrink-0 text-[26px] font-bold tracking-tight text-navy">
          成珉文庫
        </Link>
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <SearchBar />
          <ChallengeEntry challenge={challenge} />
        </div>
      </div>
      <nav className="border-t border-line">
        <div className="no-scrollbar mx-auto flex max-w-[1200px] items-center gap-5 overflow-x-auto px-5 py-3 text-sm">
          <Link href="/books" className="shrink-0 rounded-full border border-line px-3 py-1 text-ink">
            전체
          </Link>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.emphasis ? "shrink-0 font-medium text-accent" : "shrink-0 text-ink"}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
