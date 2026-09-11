export const GENRES = [
  "소설",
  "에세이",
  "인문",
  "사회",
  "과학",
  "역사",
  "자기계발",
  "예술",
  "기타",
] as const;

export type Genre = (typeof GENRES)[number];

export const NOVEL_SUBGENRES = ["문학", "철학", "공포", "스릴러", "SF"] as const;

export type NovelSubgenre = (typeof NOVEL_SUBGENRES)[number];

export function bookKindLabel(book: { genre: Genre; subgenre: NovelSubgenre | null }): string {
  if (book.genre === "소설" && book.subgenre) {
    return `소설 · ${book.subgenre}`;
  }
  return book.genre;
}

export type Axes = {
  imagination: number;
  density: number;
  emotion: number;
  comfort: number;
  knowledge: number;
};

export type Book = {
  id: string;
  itemId: number;
  isbn13: string;
  title: string;
  subTitle: string | null;
  author: string;
  publisher: string;
  cover: string;
  introduction: string;
  link: string;
  genre: Genre;
  subgenre: NovelSubgenre | null;
  tags: string[];
  axes: Axes;
  oneLiner: string;
  seedTitle: string;
  readYear: number | null;
  readMonth: number | null;
  best2025: boolean;
  best2025Rank: number | null;
};

export type SeedTitle = {
  title: string;
  author: string;
};

export type Yes24Item = {
  itemId: number;
  title: string;
  subTitle?: string | null;
  author: string;
  publisher: string;
  isbn13?: string;
  cover?: string;
  link?: string;
  salePoint?: number | null;
  contentDetail?: {
    bookIntroduction?: string | null;
    bookSummary?: string | null;
  } | null;
};

export type QuizChoice = {
  id: string;
  label: string;
  delta: Partial<Axes>;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: QuizChoice[];
};

export type QuizIntro = {
  eyebrow: string;
  lead: string;
};

export type Persona = {
  id: string;
  name: string;
  summary: string;
  fit: string;
};
