import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const sans = Noto_Sans_KR({
  variable: "--font-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const serif = Noto_Serif_KR({
  variable: "--font-serif-kr",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "成珉文庫",
  description: "성민이가 읽은 책을 모아두는 문고입니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${sans.variable} ${serif.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-ink antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="mt-16 border-t border-line bg-paper-deep">
          <div className="mx-auto max-w-[1200px] px-5 py-8 text-xs leading-6 text-muted">
            <p className="font-serif font-bold text-navy">成珉文庫</p>
            <p className="mt-2">성민이가 읽은 책을 모아두는 문고입니다. 책을 구경하거나 추천받을 수 있어요!</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
