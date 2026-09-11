import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { toBook } from "../lib/classify";
import { loadLocalEnv } from "../lib/env";
import type { Book } from "../lib/types";
import { getBookDetail } from "../lib/yes24";

loadLocalEnv();

const DATA_DIR = path.join(process.cwd(), "data");

const RESOLVED: Array<{ seedTitle: string; itemId: number }> = [
  { seedTitle: "명상록", itemId: 59463540 },
  { seedTitle: "사랑의 기술", itemId: 192649322 },
  { seedTitle: "싯다르타", itemId: 257435 },
  { seedTitle: "데미안", itemId: 176787 },
  { seedTitle: "달과 6펜스", itemId: 135880 },
];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  let books = JSON.parse(await readFile(path.join(DATA_DIR, "books.json"), "utf8")) as Book[];
  for (const item of RESOLVED) {
    const detail = await getBookDetail(item.itemId);
    const book = toBook(detail, item.seedTitle);
    books = books.filter((entry) => entry.seedTitle !== item.seedTitle && entry.itemId !== book.itemId);
    books.push(book);
    console.log(`확정: ${book.title} / ${book.author}`);
    await sleep(220);
  }
  books.sort((a, b) => a.title.localeCompare(b.title, "ko"));
  await writeFile(path.join(DATA_DIR, "books.json"), `${JSON.stringify(books, null, 2)}\n`, "utf8");
  await writeFile(path.join(DATA_DIR, "review-queue.json"), "[]\n", "utf8");
  console.log(`서재 ${books.length}권`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
