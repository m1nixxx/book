import { AdminDesk } from "@/components/AdminDesk";
import { PageSheet } from "@/components/PageSheet";

export default function AdminPage() {
  return (
    <PageSheet>
      <h1 className="font-serif text-2xl sm:text-3xl">문고에 책 더하기</h1>
      <p className="mt-3 text-sm leading-6 text-ink/70">
        예스24에서 검색한 뒤, 맞는 책을 고르면 문고에 꽂습니다.
      </p>
      <div className="mt-8">
        <AdminDesk />
      </div>
    </PageSheet>
  );
}
