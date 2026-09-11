import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { toBook } from "../lib/classify";
import { loadLocalEnv } from "../lib/env";
import { parseSeedTitles } from "../lib/books";
import type { Book, SeedTitle, Yes24Item } from "../lib/types";
import { getBookDetail, searchBooks } from "../lib/yes24";

loadLocalEnv();

const DATA_DIR = path.join(process.cwd(), "data");
const DELAY_MS = 220;

type QueueItem = {
  seed: SeedTitle;
  reason: string;
  candidates: Array<Pick<Yes24Item, "itemId" | "title" | "author" | "publisher" | "isbn13">>;
};

function compact(value: string): string {
  return value.replace(/\s+/g, "").replace(/[.,'"“”‘’·\-]/g, "").toLowerCase();
}

const AMBIGUOUS = new Set(
  ["명상록", "싯다르타", "데미안", "사랑의 기술", "달과 6펜스"].map(compact),
);

function titleMatches(seed: string, found: string): boolean {
  const a = compact(seed);
  const b = compact(found);
  if (!a || !b) return false;
  return b.includes(a) || a.includes(b);
}

function authorMatches(seed: string, found: string): boolean {
  if (!seed) return true;
  const a = compact(seed);
  const b = compact(found);
  return b.includes(a) || a.includes(b);
}

function pickMatch(seed: SeedTitle, items: Yes24Item[]): Yes24Item | undefined {
  const matched = items.filter(
    (item) => titleMatches(seed.title, item.title) && authorMatches(seed.author, item.author),
  );
  if (matched.length === 0) return undefined;
  if (matched.length === 1) return matched[0];
  if (AMBIGUOUS.has(compact(seed.title))) return undefined;
  return [...matched].sort((a, b) => (b.salePoint ?? 0) - (a.salePoint ?? 0))[0];
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const seedText = await readFile(path.join(DATA_DIR, "seed-titles.txt"), "utf8");
  const seeds = parseSeedTitles(seedText);
  const books: Book[] = [];
  const queue: QueueItem[] = [];

  for (const seed of seeds) {
    const query = [seed.title, seed.author].filter(Boolean).join(" ");
    console.log(`검색: ${query}`);
    let items: Yes24Item[] = [];
    try {
      items = await searchBooks(query, 8);
    } catch (error) {
      queue.push({
        seed,
        reason: error instanceof Error ? error.message : "검색 실패",
        candidates: [],
      });
      await sleep(DELAY_MS);
      continue;
    }

    const chosen = pickMatch(seed, items);
    if (!chosen) {
      queue.push({
        seed,
        reason: "동명이거나 저자 일치 항목이 없어 확인이 필요합니다.",
        candidates: items.slice(0, 5).map((item) => ({
          itemId: item.itemId,
          title: item.title,
          author: item.author,
          publisher: item.publisher,
          isbn13: item.isbn13,
        })),
      });
      await sleep(DELAY_MS);
      continue;
    }

    await sleep(DELAY_MS);
    const detail = await getBookDetail(chosen.itemId);
    books.push(toBook(detail, seed.title));
    console.log(`  저장: ${detail.title} / ${detail.author}`);
    await sleep(DELAY_MS);
  }

  await writeFile(path.join(DATA_DIR, "books.json"), `${JSON.stringify(books, null, 2)}\n`, "utf8");
  await writeFile(path.join(DATA_DIR, "review-queue.json"), `${JSON.stringify(queue, null, 2)}\n`, "utf8");
  console.log(`완료: 자동 저장 ${books.length}권, 확인 대기 ${queue.length}권`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
