import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { getBooks, saveBooks } from "@/lib/books";
import { toBook } from "@/lib/classify";
import { getBookDetail } from "@/lib/yes24";

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "권한이 없습니다." }, { status: 401 });
  }

  const body = (await request.json()) as { itemId?: number; seedTitle?: string };
  if (!body.itemId) {
    return NextResponse.json({ message: "itemId가 필요합니다." }, { status: 400 });
  }

  try {
    const detail = await getBookDetail(body.itemId);
    const book = toBook(detail, body.seedTitle?.trim() || detail.title);
    const books = await getBooks();
    const next = books.filter((item) => item.itemId !== book.itemId);
    next.push(book);
    next.sort((a, b) => a.title.localeCompare(b.title, "ko"));
    await saveBooks(next);
    return NextResponse.json({ book });
  } catch (error) {
    const message = error instanceof Error ? error.message : "저장에 실패했습니다.";
    return NextResponse.json({ message }, { status: 502 });
  }
}
