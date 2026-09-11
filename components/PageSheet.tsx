import type { ReactNode } from "react";

export function PageSheet({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-5 sm:py-12">
      <div className="bg-paper px-0 py-2 text-ink sm:px-10 sm:py-10">{children}</div>
    </div>
  );
}
