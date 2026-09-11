import Link from "next/link";
import { BookCard } from "@/components/BookCard";
import { PageSheet } from "@/components/PageSheet";
import { getBooks } from "@/lib/books";
import { AXIS_LABELS, parseAnswerQuery, personaFromAxes, scoreAnswers } from "@/lib/quiz";
import { rankBooks } from "@/lib/recommend";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ a?: string }>;
};

export default async function ResultPage({ searchParams }: Props) {
  const { a } = await searchParams;
  const answers = parseAnswerQuery(a);
  if (answers.length === 0) {
    return (
      <PageSheet>
        <p>추천 결과가 없습니다.</p>
        <Link href="/quiz" className="mt-4 inline-block text-ink underline">
          책 추천받기
        </Link>
      </PageSheet>
    );
  }

  const axes = scoreAnswers(answers);
  const persona = personaFromAxes(axes);
  const ranked = rankBooks(await getBooks(), axes);
  const top = ranked.slice(0, 3);
  const rest = ranked.slice(3, 6);

  return (
    <PageSheet>
      <p className="text-sm tracking-wide text-ink/60">오늘의 읽기 성향</p>
      <h1 className="mt-3 font-serif text-3xl break-keep sm:text-4xl">{persona.name}</h1>
      <p className="mt-5 max-w-xl text-base leading-8 text-ink/70">{persona.summary}</p>
      <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{persona.fit}</p>

      <section className="mt-10 max-w-xl">
        <h2 className="text-sm tracking-wide text-ink/60">읽기 좌표</h2>
        <div className="mt-4 grid gap-3">
          {AXIS_LABELS.map((axis) => (
            <div key={axis.key} className="grid grid-cols-[2.75rem_1fr_1.75rem] items-center gap-2 sm:grid-cols-[3rem_1fr_1.5rem] sm:gap-3">
              <span className="text-xs text-muted">{axis.label}</span>
              <div className="h-2 bg-paper-deep" title={axis.hint}>
                <div
                  className="h-2 bg-navy"
                  style={{ width: `${(axes[axis.key] / 5) * 100}%` }}
                />
              </div>
              <span className="text-right text-xs text-ink">{axes[axis.key].toFixed(1)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl">성민이가 추천하는 책</h2>
        <p className="mt-2 text-sm leading-6 text-muted">읽고싶은 책이 있다면 빌려드릴 수 있어요!</p>
        <div className="mt-6 grid gap-4">
          {top.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {rest.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-serif text-xl">함께 봐도 좋은 책</h2>
          <div className="mt-5 grid gap-4">
            {rest.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-12 flex gap-4 text-sm">
        <Link href="/quiz" className="underline">
          다시 추천받기
        </Link>
        <Link href="/books" className="text-ink/60 hover:text-ink">
          서재 전체
        </Link>
      </div>
    </PageSheet>
  );
}
