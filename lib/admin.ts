import { cookies } from "next/headers";

const COOKIE_NAME = "library_admin";

export function adminSecret(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD 환경변수가 없습니다.");
  }
  return password;
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === adminSecret();
}

export function adminCookie(password: string): { name: string; value: string } | null {
  if (password !== adminSecret()) return null;
  return { name: COOKIE_NAME, value: password };
}
