import { getBooks, saveBooks } from "../lib/books";
import { findOverride } from "../lib/overrides";

async function main() {
  const books = await getBooks();
  const next = books.map((book) => {
    const override = findOverride(book.seedTitle);
    return {
      ...book,
      genre: override?.genre ?? book.genre,
      subgenre: override?.subgenre ?? (override?.genre === "소설" ? "문학" : null),
      tags: override?.tags ?? book.tags,
      axes: override?.axes ?? book.axes,
      oneLiner: override?.oneLiner ?? book.oneLiner,
    };
  });
  await saveBooks(next);
  const counts = new Map<string, number>();
  for (const book of next) {
    const key = book.subgenre ? `${book.genre} · ${book.subgenre}` : book.genre;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  for (const [key, count] of [...counts.entries()].sort()) {
    console.log(`${key}: ${count}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
