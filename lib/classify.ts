import { findOverride } from "@/lib/overrides";
import type { Axes, Book, Genre, NovelSubgenre, Yes24Item } from "@/lib/types";

const DEFAULT_AXES: Axes = {
  imagination: 3,
  density: 3,
  emotion: 3,
  comfort: 3,
  knowledge: 3,
};

function firstSentence(text: string): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const match = cleaned.match(/^.{20,80}?[.。!?]/);
  if (match) return match[0];
  return cleaned.slice(0, 72) + (cleaned.length > 72 ? "…" : "");
}

export function toBook(item: Yes24Item, seedTitle: string): Book {
  const override = findOverride(seedTitle);
  const introduction =
    item.contentDetail?.bookIntroduction?.trim() ||
    item.contentDetail?.bookSummary?.trim() ||
    "";

  return {
    id: String(item.itemId),
    itemId: item.itemId,
    isbn13: item.isbn13 ?? "",
    title: item.title,
    subTitle: item.subTitle ?? null,
    author: item.author,
    publisher: item.publisher,
    cover: item.cover ?? "",
    introduction,
    link: item.link ?? `https://www.yes24.com/product/goods/${item.itemId}`,
    genre: override?.genre ?? guessGenre(item, seedTitle),
    subgenre: override?.subgenre ?? (override?.genre === "소설" || !override ? guessSubgenre(item, seedTitle) : null),
    tags: override?.tags ?? [],
    axes: override?.axes ?? DEFAULT_AXES,
    oneLiner: override?.oneLiner ?? (introduction ? firstSentence(introduction) : "문고에 남겨 둔 책입니다."),
    seedTitle,
    readYear: null,
    readMonth: null,
    best2025: false,
    best2025Rank: null,
  };
}

function guessGenre(item: Yes24Item, seedTitle: string): Genre {
  const hay = `${seedTitle} ${item.title} ${item.author} ${item.contentDetail?.bookIntroduction ?? ""}`;
  if (/우주|물리|과학|생물|진화/.test(hay)) return "과학";
  if (/철학|니체|명상|스토아|프롬|괴테/.test(hay)) return "인문";
  if (/역사|문명|에너지/.test(hay)) return "사회";
  if (/에세이/.test(hay)) return "에세이";
  return "소설";
}

function guessSubgenre(item: Yes24Item, seedTitle: string): NovelSubgenre | null {
  const genre = guessGenre(item, seedTitle);
  if (genre !== "소설") return null;
  const hay = `${seedTitle} ${item.title} ${item.contentDetail?.bookIntroduction ?? ""}`;
  if (/\bSF\b|공상과학|디스토피아/.test(hay)) return "SF";
  if (/공포|호러/.test(hay)) return "공포";
  if (/스릴러|미스터리|추리|살인/.test(hay)) return "스릴러";
  if (/철학|구도|자아/.test(hay)) return "철학";
  return "문학";
}
