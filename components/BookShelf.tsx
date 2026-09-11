"use client";

import { useMemo, useState } from "react";
import { LibraryShelf } from "@/components/LibraryShelf";
import { GENRES, NOVEL_SUBGENRES, type Book, type Genre, type NovelSubgenre } from "@/lib/types";

function chipClass(active: boolean): string {
  return `border-b-2 px-1 pb-2 text-sm ${
    active ? "border-navy font-medium text-navy" : "border-transparent text-muted"
  }`;
}

export function BookShelf({
  books,
  initialGenre = "전체",
}: {
  books: Book[];
  initialGenre?: Genre | "전체";
}) {
  const [genre, setGenre] = useState<Genre | "전체">(initialGenre);
  const [subgenre, setSubgenre] = useState<NovelSubgenre | "전체">("전체");

  const availableGenres = new Set(books.map((book) => book.genre));
  const availableSubgenres = NOVEL_SUBGENRES.filter((item) =>
    books.some((book) => book.genre === "소설" && book.subgenre === item),
  );

  const filtered = useMemo(() => {
    let list = books;
    if (genre !== "전체") {
      list = list.filter((book) => book.genre === genre);
    }
    if (genre === "소설" && subgenre !== "전체") {
      list = list.filter((book) => book.subgenre === subgenre);
    }
    return [...list].sort((a, b) => a.title.localeCompare(b.title, "ko"));
  }, [books, genre, subgenre]);

  function chooseGenre(next: Genre | "전체") {
    setGenre(next);
    setSubgenre("전체");
  }

  const novelGroups =
    genre === "소설" && subgenre === "전체"
      ? availableSubgenres.map((item) => ({
          label: item,
          items: filtered.filter((book) => book.subgenre === item),
        }))
      : null;

  return (
    <div>
      <div className="flex flex-wrap gap-5 border-b border-line">
        {(["전체", ...GENRES.filter((item) => availableGenres.has(item))] as const).map((item) => (
          <button key={item} type="button" onClick={() => chooseGenre(item)} className={chipClass(genre === item)}>
            {item}
          </button>
        ))}
      </div>
      {genre === "소설" && availableSubgenres.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => setSubgenre("전체")} className={chipClass(subgenre === "전체")}>
            소설 전체
          </button>
          {availableSubgenres.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSubgenre(item)}
              className={chipClass(subgenre === item)}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
      <div className="mt-8">
        {novelGroups ? (
          novelGroups.map((group) => (
            <LibraryShelf key={group.label} label={group.label} books={group.items} />
          ))
        ) : (
          <LibraryShelf books={filtered} />
        )}
      </div>
    </div>
  );
}
