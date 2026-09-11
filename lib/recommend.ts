import type { Axes, Book } from "@/lib/types";

export const AXIS_KEYS = [
  "imagination",
  "density",
  "emotion",
  "comfort",
  "knowledge",
] as const;

export function emptyAxes(): Axes {
  return {
    imagination: 0,
    density: 0,
    emotion: 0,
    comfort: 0,
    knowledge: 0,
  };
}

export function addAxes(base: Axes, delta: Partial<Axes>): Axes {
  const next = { ...base };
  for (const key of AXIS_KEYS) {
    next[key] += delta[key] ?? 0;
  }
  return next;
}

export function clampAxes(axes: Axes, min = 1, max = 5): Axes {
  const next = { ...axes };
  for (const key of AXIS_KEYS) {
    next[key] = Math.min(max, Math.max(min, next[key]));
  }
  return next;
}

export function normalizeToScale(axes: Axes): Axes {
  const centered: Axes = {
    imagination: 3,
    density: 3,
    emotion: 3,
    comfort: 3,
    knowledge: 3,
  };
  return clampAxes(addAxes(centered, axes));
}

function toVector(axes: Axes): number[] {
  return AXIS_KEYS.map((key) => axes[key]);
}

export function cosineSimilarity(a: Axes, b: Axes): number {
  const va = toVector(a);
  const vb = toVector(b);
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < va.length; i += 1) {
    dot += va[i] * vb[i];
    na += va[i] * va[i];
    nb += vb[i] * vb[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom === 0 ? 0 : dot / denom;
}

export function rankBooks(books: Book[], userAxes: Axes): Book[] {
  return [...books].sort(
    (left, right) => cosineSimilarity(userAxes, right.axes) - cosineSimilarity(userAxes, left.axes),
  );
}

export function similarBooks(books: Book[], target: Book, limit = 3): Book[] {
  return rankBooks(
    books.filter((book) => book.id !== target.id),
    target.axes,
  ).slice(0, limit);
}
