import type { Axes, Genre, NovelSubgenre } from "@/lib/types";

export type BookOverride = {
  genre: Genre;
  subgenre?: NovelSubgenre;
  tags: string[];
  axes: Axes;
  oneLiner: string;
};

export const BOOK_OVERRIDES: Record<string, BookOverride> = {
  수족관: {
    genre: "소설",
    subgenre: "문학",
    tags: ["성장", "가족", "한국소설"],
    axes: { imagination: 4, density: 3, emotion: 4, comfort: 2, knowledge: 2 },
    oneLiner: "보육 시설에서 자란 류이치와 아카리가, 과거라는 수족관에서 벗어나 바다에 닿기를 꿈꿉니다.",
  },
  평행우주: {
    genre: "과학",
    tags: ["우주", "물리학", "교양과학"],
    axes: { imagination: 3, density: 4, emotion: 1, comfort: 3, knowledge: 5 },
    oneLiner: "우리가 사는 우주가 유일한지, 평행우주로 갈 수 있는지를 물리학으로 설명합니다.",
  },
  명상록: {
    genre: "인문",
    tags: ["스토아", "고전", "철학"],
    axes: { imagination: 1, density: 4, emotion: 2, comfort: 4, knowledge: 5 },
    oneLiner: "전쟁을 치르던 로마 황제가 스스로에게 적어 둔 스토아 철학의 단상입니다.",
  },
  하우스메이드: {
    genre: "소설",
    subgenre: "스릴러",
    tags: ["스릴러", "반전", "심리"],
    axes: { imagination: 4, density: 2, emotion: 3, comfort: 1, knowledge: 1 },
    oneLiner: "전과를 숨긴 가정부가 억만장자의 집에 들어가며, 그 집의 비밀과 마주칩니다.",
  },
  "세상은 실제로 어떻게 돌아가는가": {
    genre: "사회",
    tags: ["에너지", "문명", "현실"],
    axes: { imagination: 1, density: 5, emotion: 1, comfort: 2, knowledge: 5 },
    oneLiner: "식량·에너지·기후를 통계로 짚으며, 현대 문명이 실제로 어떻게 돌아가는지 설명합니다.",
  },
  "나는 소망한다 내게 금지된 것을": {
    genre: "소설",
    subgenre: "문학",
    tags: ["한국문학", "욕망", "사회"],
    axes: { imagination: 4, density: 4, emotion: 5, comfort: 2, knowledge: 2 },
    oneLiner: "젊은 여성이 인기 배우를 납치해 감금하고, 금지된 욕망과 권력의 전복을 밀어붙입니다.",
  },
  "물고기는 존재하지 않는다": {
    genre: "과학",
    tags: ["과학", "분류", "서사"],
    axes: { imagination: 3, density: 3, emotion: 4, comfort: 2, knowledge: 4 },
    oneLiner: "분류학자 데이비드 스타 조던의 삶과, ‘물고기’라는 범주가 허구임을 따라갑니다.",
  },
  절창: {
    genre: "소설",
    subgenre: "문학",
    tags: ["한국소설", "운명", "문장"],
    axes: { imagination: 5, density: 4, emotion: 3, comfort: 2, knowledge: 2 },
    oneLiner: "타인의 상처를 만지면 그 마음을 읽는 여자와, 그녀를 곁에 둔 남자의 기묘한 동거를 그립니다.",
  },
  "괴테는 모든것을 말했다": {
    genre: "인문",
    tags: ["괴테", "독서", "고전"],
    axes: { imagination: 2, density: 3, emotion: 3, comfort: 3, knowledge: 4 },
    oneLiner: "괴테 연구가가 출처 없는 괴테 문장을 발견하고, 그 한 줄이 삶을 흔들기 시작합니다.",
  },
  "사랑의 기술": {
    genre: "인문",
    tags: ["사랑", "철학", "관계"],
    axes: { imagination: 1, density: 4, emotion: 4, comfort: 3, knowledge: 5 },
    oneLiner: "사랑은 감정이 아니라, 배우고 연습해야 할 기술이라고 말합니다.",
  },
  싯다르타: {
    genre: "소설",
    subgenre: "철학",
    tags: ["구도", "성장", "고전"],
    axes: { imagination: 4, density: 3, emotion: 4, comfort: 4, knowledge: 3 },
    oneLiner: "브라만의 아들 싯다르타가 고행과 세속을 지나, 강가에서 깨달음에 닿는 이야기입니다.",
  },
  "안녕이라 그랬어": {
    genre: "소설",
    subgenre: "문학",
    tags: ["단편", "일상", "한국소설"],
    axes: { imagination: 3, density: 3, emotion: 5, comfort: 3, knowledge: 2 },
    oneLiner: "집·이웃·파티 같은 공간을 배경으로, 사람과 사람 사이의 온도를 담은 단편들입니다.",
  },
  장미와나이프: {
    genre: "소설",
    subgenre: "스릴러",
    tags: ["미스터리", "단편", "추리"],
    axes: { imagination: 4, density: 3, emotion: 3, comfort: 2, knowledge: 2 },
    oneLiner: "히가시노 게이고 초기의 탐정 클럽이, 추리 단편들로 사건을 풀어 가는 작품입니다.",
  },
  데미안: {
    genre: "소설",
    subgenre: "철학",
    tags: ["성장", "자아", "고전"],
    axes: { imagination: 4, density: 4, emotion: 4, comfort: 3, knowledge: 3 },
    oneLiner: "소년 싱클레어가 데미안을 만나, 자아를 찾아 어른이 되어 가는 이야기입니다.",
  },
  연매장: {
    genre: "소설",
    subgenre: "문학",
    tags: ["중국문학", "역사", "가족"],
    axes: { imagination: 4, density: 4, emotion: 5, comfort: 2, knowledge: 3 },
    oneLiner: "기억을 잃은 어머니의 과거를 아들이 추적하며, 중국 토지개혁에 묻힌 가족의 비극을 파헤칩니다.",
  },
  제노사이드: {
    genre: "소설",
    subgenre: "SF",
    tags: ["스릴러", "과학", "인간"],
    axes: { imagination: 4, density: 4, emotion: 2, comfort: 1, knowledge: 3 },
    oneLiner: "인류보다 진화한 존재의 출현과, 그 위협을 둘러싼 음모를 추리와 SF로 풀어갑니다.",
  },
  "작별하지 않는다": {
    genre: "소설",
    subgenre: "문학",
    tags: ["한국문학", "기억", "역사"],
    axes: { imagination: 4, density: 5, emotion: 5, comfort: 2, knowledge: 3 },
    oneLiner: "제주 4·3의 기억을 따라, 지워지지 않는 사랑과 살아남은 이들의 이야기를 그립니다.",
  },
  "긴키지방의 어느 장소에 대하여": {
    genre: "소설",
    subgenre: "공포",
    tags: ["공포", "장소", "단편"],
    axes: { imagination: 5, density: 3, emotion: 3, comfort: 1, knowledge: 1 },
    oneLiner: "특정 지역에서 일어난 실종을 둘러싼 괴담을 옴니버스로 묶은 호러입니다.",
  },
  "가족 살인": {
    genre: "소설",
    subgenre: "스릴러",
    tags: ["스릴러", "범죄", "가족"],
    axes: { imagination: 4, density: 3, emotion: 3, comfort: 1, knowledge: 1 },
    oneLiner: "20년 전 미제사건을 리얼크라임 쇼로 파헤치며, 카메라 앞의 진실과 복수를 묻습니다.",
  },
  "왜 당신은 태도가 아니라 인생을 탓하는가": {
    genre: "자기계발",
    tags: ["태도", "인생", "에세이"],
    axes: { imagination: 1, density: 2, emotion: 3, comfort: 4, knowledge: 4 },
    oneLiner: "환경이 아니라 태도에서 삶이 바뀐다고, 사상가들의 문장을 엮어 말합니다.",
  },
  "죽은 왕녀를 위한 파반느": {
    genre: "소설",
    subgenre: "문학",
    tags: ["한국소설", "청춘", "기억"],
    axes: { imagination: 5, density: 4, emotion: 4, comfort: 2, knowledge: 2 },
    oneLiner: "1980년대 서울에서, 외모 이데올로기 바깥의 한 여자와 두 청년의 사랑과 우정을 그립니다.",
  },
  "무례한 세상에서 나를 지키는 법": {
    genre: "인문",
    tags: ["처세", "고전", "지혜"],
    axes: { imagination: 1, density: 3, emotion: 2, comfort: 3, knowledge: 4 },
    oneLiner: "발타자르 그라시안의 처세훈을 빌려, 착함 때문에 이용당하지 않는 법을 말합니다.",
  },
  유령해마: {
    genre: "소설",
    subgenre: "SF",
    tags: ["SF", "한국소설", "정체성"],
    axes: { imagination: 5, density: 3, emotion: 3, comfort: 2, knowledge: 2 },
    oneLiner: "우주에서 조난당한 인공지능 해마가, 자신이 구한 한 인간의 삶을 추적합니다.",
  },
  "나는 입이없다 그리고 나는 비명을 질러야한다": {
    genre: "소설",
    subgenre: "SF",
    tags: ["SF", "디스토피아", "단편"],
    axes: { imagination: 5, density: 4, emotion: 3, comfort: 1, knowledge: 2 },
    oneLiner: "할란 엘리슨의 대표 중단편을 모은 작품집으로, 표제작은 입이 없는 채 비명만 남는 세계를 그립니다.",
  },
  "나의 완벽한 장례식": {
    genre: "소설",
    subgenre: "문학",
    tags: ["죽음", "관계", "한국소설"],
    axes: { imagination: 4, density: 3, emotion: 5, comfort: 3, knowledge: 2 },
    oneLiner: "병원 매점에 그림자가 없는 손님들이 찾아오고, 아르바이트생이 그들의 못 다한 부탁을 들어줍니다.",
  },
  "거의 모든 것의 역사": {
    genre: "과학",
    tags: ["교양", "역사", "유머"],
    axes: { imagination: 2, density: 3, emotion: 2, comfort: 3, knowledge: 5 },
    oneLiner: "빅뱅부터 인류 문명까지, 유머를 섞어 과학의 역사를 훑습니다.",
  },
  "달과 6펜스": {
    genre: "소설",
    subgenre: "문학",
    tags: ["예술", "자유", "고전"],
    axes: { imagination: 4, density: 4, emotion: 4, comfort: 2, knowledge: 2 },
    oneLiner: "폴 고갱에게서 영감을 받은 이야기로, 안락한 삶을 버리고 그림을 좇는 남자를 그립니다.",
  },
  "해가 지는 곳으로": {
    genre: "소설",
    subgenre: "문학",
    tags: ["한국소설", "폭력", "자매"],
    axes: { imagination: 4, density: 3, emotion: 5, comfort: 2, knowledge: 2 },
    oneLiner: "바이러스로 무너진 세계에서, 동생을 지키며 길을 떠나는 도리의 아포칼립스입니다.",
  },
  "니체의 초월자": {
    genre: "인문",
    tags: ["니체", "철학", "초인"],
    axes: { imagination: 2, density: 5, emotion: 3, comfort: 2, knowledge: 5 },
    oneLiner: "니체의 ‘초월자’를, 남의 기준이 아니라 스스로 길을 고르는 삶으로 풀어 씁니다.",
  },
  불안: {
    genre: "인문",
    tags: ["철학", "사회", "지위"],
    axes: { imagination: 2, density: 3, emotion: 3, comfort: 2, knowledge: 4 },
    oneLiner: "타인의 시선과 사회적 지위가 만드는 불안을, 철학으로 풀어 봅니다.",
  },
  "브람스를 좋아하세요": {
    genre: "소설",
    subgenre: "문학",
    tags: ["고전", "사랑", "프랑스문학"],
    axes: { imagination: 3, density: 3, emotion: 5, comfort: 3, knowledge: 2 },
    oneLiner: "서른아홉 폴과 스물다섯 시몽 사이에서, 폴이 사랑을 다시 마주하는 이야기입니다.",
  },
  "밝은 밤": {
    genre: "소설",
    subgenre: "문학",
    tags: ["한국소설", "가족", "여성"],
    axes: { imagination: 3, density: 4, emotion: 5, comfort: 3, knowledge: 2 },
    oneLiner: "아무리 고된 상황에서도 결국엔 함께 이겨냈음에",
  },
};

export function overrideKey(title: string): string {
  return title.replace(/\s+/g, "");
}

export function findOverride(seedTitle: string): BookOverride | undefined {
  if (BOOK_OVERRIDES[seedTitle]) return BOOK_OVERRIDES[seedTitle];
  const compact = overrideKey(seedTitle);
  for (const [key, value] of Object.entries(BOOK_OVERRIDES)) {
    if (overrideKey(key) === compact) return value;
  }
  return undefined;
}
