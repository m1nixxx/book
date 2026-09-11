import { BookShelf } from "@/components/BookShelf";
import { getBooks } from "@/lib/books";
import { GENRES, type Genre } from "@/lib/types";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string; genre?: string }>;
};

function isGenre(value: string | undefined): value is Genre {
  return GENRES.includes(value as Genre);
}

export default async function BooksPage({ searchParams }: Props) {
  const { q, genre } = await searchParams;
  const books = await getBooks();
  const query = q?.trim() ?? "";
  const matched = query
    ? books.filter((book) => `${book.title} ${book.author}`.includes(query))
    : books;

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-5 sm:py-10">
      <h1 className="text-xl font-bold sm:text-2xl">서재</h1>
      <p className="mt-2 text-sm text-muted">
        {query ? `'${query}' 검색 결과 ${matched.length}권` : "문고에 꽂힌 책을 장르별로 모아 두었습니다."}
      </p>
      <div className="mt-8">
        <BookShelf books={matched} initialGenre={isGenre(genre) ? genre : "전체"} />
      </div>
    </div>
  );
}
