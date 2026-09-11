import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildChallenge, type Challenge } from "@/lib/challenge";
import { attachReading, type ReadingFile } from "@/lib/reading";
import type { Book, SeedTitle } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");

async function getReading(): Promise<ReadingFile> {
  const raw = await readFile(path.join(DATA_DIR, "reading.json"), "utf8");
  return JSON.parse(raw) as ReadingFile;
}

export async function getChallenge(): Promise<Challenge> {
  const reading = await getReading();
  return buildChallenge(reading);
}

export async function getBooks(): Promise<Book[]> {
  const raw = await readFile(path.join(DATA_DIR, "books.json"), "utf8");
  const books = JSON.parse(raw) as Book[];
  const reading = await getReading();
  return attachReading(books, reading);
}

export async function getBook(id: string): Promise<Book | undefined> {
  const books = await getBooks();
  return books.find((book) => book.id === id);
}

export async function saveBooks(books: Book[]): Promise<void> {
  const file = path.join(DATA_DIR, "books.json");
  await writeFile(file, `${JSON.stringify(books, null, 2)}\n`, "utf8");
}

export function parseSeedTitles(text: string): SeedTitle[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, author = ""] = line.split("|").map((part) => part.trim());
      return { title, author };
    });
}

export async function getSeedTitles(): Promise<SeedTitle[]> {
  const raw = await readFile(path.join(DATA_DIR, "seed-titles.txt"), "utf8");
  return parseSeedTitles(raw);
}
