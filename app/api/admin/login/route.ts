import { NextResponse } from "next/server";
import { adminCookie } from "@/lib/admin";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const cookie = adminCookie(body.password ?? "");
  if (!cookie) {
    return NextResponse.json({ ok: false, message: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookie.name, cookie.value, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return response;
}
