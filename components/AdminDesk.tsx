"use client";

import { useState } from "react";
import type { Book, Yes24Item } from "@/lib/types";

export function AdminDesk() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Yes24Item[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const body = (await response.json()) as { message?: string };
    setBusy(false);
    if (!response.ok) {
      setMessage(body.message ?? "로그인에 실패했습니다.");
      return;
    }
    setAuthed(true);
  }

  async function search(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const response = await fetch(`/api/yes24/search?q=${encodeURIComponent(query)}`);
    const body = (await response.json()) as { items?: Yes24Item[]; message?: string };
    setBusy(false);
    if (!response.ok) {
      setMessage(body.message ?? "검색에 실패했습니다.");
      return;
    }
    setItems(body.items ?? []);
  }

  async function addBook(item: Yes24Item) {
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/admin/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId: item.itemId, seedTitle: item.title }),
    });
    const body = (await response.json()) as { book?: Book; message?: string };
    setBusy(false);
    if (!response.ok) {
      setMessage(body.message ?? "저장에 실패했습니다.");
      return;
    }
    setMessage(`저장했습니다: ${body.book?.title ?? item.title}`);
  }

  if (!authed) {
    return (
      <form onSubmit={login} className="max-w-sm">
        <label className="block text-sm text-muted">관리 비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full border border-line bg-card px-3 py-2 text-sm"
        />
        <button type="submit" disabled={busy} className="mt-4 bg-ink px-4 py-2 text-sm text-paper">
          입장
        </button>
        {message ? <p className="mt-3 text-sm text-accent">{message}</p> : null}
      </form>
    );
  }

  return (
    <div>
      <form onSubmit={search} className="flex gap-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="제목 또는 저자"
          className="flex-1 border border-line bg-card px-3 py-2 text-sm"
        />
        <button type="submit" disabled={busy} className="bg-ink px-4 py-2 text-sm text-paper">
          검색
        </button>
      </form>
      {message ? <p className="mt-4 text-sm text-accent">{message}</p> : null}
      <ul className="mt-6 grid gap-3">
        {items.map((item) => (
          <li key={item.itemId} className="flex items-start justify-between gap-4 border border-line bg-card p-4">
            <div>
              <p className="font-serif">{item.title}</p>
              <p className="mt-1 text-sm text-muted">
                {item.author} · {item.publisher}
              </p>
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={() => addBook(item)}
              className="shrink-0 border border-line px-3 py-1 text-sm hover:border-accent"
            >
              서가에 꽂기
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
