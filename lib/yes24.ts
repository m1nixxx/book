import type { Yes24Item } from "@/lib/types";

const BASE_URL = "https://apis.yes24.com/v1";

type Yes24ListResponse = {
  success: boolean;
  message: string;
  errorCode: string | null;
  data?: {
    items?: Yes24Item[];
    totalCount?: number;
  };
};

function getApiKey(): string {
  const key = process.env.YES24_API_KEY;
  if (!key) {
    throw new Error("YES24_API_KEY 환경변수가 없습니다.");
  }
  return key;
}

async function yes24Get(path: string, params: Record<string, string>): Promise<Yes24ListResponse> {
  const url = new URL(`${BASE_URL}${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url, {
    headers: { "X-Api-Key": getApiKey() },
    cache: "no-store",
  });

  const body = (await response.json()) as Yes24ListResponse;
  if (body.errorCode === "SEARCH_001") {
    return { ...body, success: true, data: { items: [], totalCount: 0 } };
  }
  if (!response.ok || !body.success) {
    const code = body.errorCode ?? `HTTP_${response.status}`;
    throw new Error(`YES24 API 오류 (${code}): ${body.message}`);
  }
  return body;
}

export async function searchBooks(query: string, pageSize = 8): Promise<Yes24Item[]> {
  const body = await yes24Get("/goods/itemList", {
    query,
    category: "BOOK",
    page: "1",
    pageSize: String(pageSize),
    detail: "Y",
  });
  return body.data?.items ?? [];
}

export async function getBookDetail(itemId: number): Promise<Yes24Item> {
  const body = await yes24Get("/goods/itemDetail", {
    searchType: "ItemId",
    query: String(itemId),
    detail: "Y",
  });
  const item = body.data?.items?.[0];
  if (!item) {
    throw new Error(`상품 상세가 없습니다. itemId=${itemId}`);
  }
  return item;
}
