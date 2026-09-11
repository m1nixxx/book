import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { searchBooks } from "@/lib/yes24";

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "권한이 없습니다." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();
  if (!query) {
    return NextResponse.json({ message: "검색어를 입력하세요." }, { status: 400 });
  }

  try {
    const items = await searchBooks(query, 8);
    return NextResponse.json({ items });
  } catch (error) {
    const message = error instanceof Error ? error.message : "검색에 실패했습니다.";
    return NextResponse.json({ message }, { status: 502 });
  }
}
