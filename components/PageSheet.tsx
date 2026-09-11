import type { ReactNode } from "react";

export function PageSheet({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <div className="bg-paper px-6 py-8 text-ink sm:px-10 sm:py-10">{children}</div>
    </div>
  );
}
