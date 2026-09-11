import quizData from "@/data/quiz.json";
import { AXIS_KEYS, addAxes, clampAxes, emptyAxes } from "@/lib/recommend";
import type { Axes, Persona, QuizIntro, QuizQuestion } from "@/lib/types";

export const QUIZ_INTRO = quizData.intro as QuizIntro;
export const QUIZ_QUESTIONS = quizData.questions as QuizQuestion[];

export const AXIS_LABELS: { key: (typeof AXIS_KEYS)[number]; label: string; hint: string }[] = [
  { key: "imagination", label: "상상", hint: "다른 생, 플롯, 낯선 장소" },
  { key: "density", label: "밀도", hint: "문장과 사유의 농도" },
  { key: "emotion", label: "정서", hint: "인물과 마음의 거리" },
  { key: "comfort", label: "온기", hint: "위로와 불편함 사이" },
  { key: "knowledge", label: "지식", hint: "세계가 돌아가는 방식" },
];

const AXIS_DAMPEN = 0.3;

function toQuizAxes(raw: Axes): Axes {
  const next = emptyAxes();
  for (const key of AXIS_KEYS) {
    next[key] = 3 + raw[key] * AXIS_DAMPEN;
  }
  return clampAxes(next);
}

export function scoreAnswers(answerIds: string[]): Axes {
  let total = emptyAxes();
  for (const [index, answerId] of answerIds.entries()) {
    const question = QUIZ_QUESTIONS[index];
    const choice = question?.choices.find((item) => item.id === answerId);
    if (choice) total = addAxes(total, choice.delta);
  }
  return toQuizAxes(total);
}

export function personaFromAxes(axes: Axes): Persona {
  if (axes.comfort <= 2 && axes.imagination >= 4 && axes.knowledge <= 3) {
    return {
      id: "abyss",
      name: "심연을 들여다보는 사람",
      summary:
        "편한 결말보다 잠이 안 오는 플롯에 손이 갑니다. 위험한 화자, 어두운 장소, 뒤집히는 관계를 피하지 않습니다.",
      fit: "이 문고에서는 스릴러와 공포, 차갑게 밀어붙이는 SF가 가깝습니다.",
    };
  }
  if (axes.knowledge >= 4 && axes.emotion <= 3 && axes.imagination <= 3) {
    return {
      id: "observer",
      name: "단단한 관찰자",
      summary:
        "세계가 실제로 어떻게 움직이는지에 마음이 갑니다. 감정으로 덮인 설명보다 숫자와 구조와 역사가 남은 책을 고릅니다.",
      fit: "과학·사회 논픽션처럼, 바깥 세계를 설명하는 책이 잘 맞습니다.",
    };
  }
  if (axes.density >= 4 && axes.knowledge >= 4 && axes.imagination <= 3) {
    return {
      id: "philosopher",
      name: "사유의 길을 걷는 사람",
      summary:
        "한 문장에 머무는 시간을 아끼지 않습니다. 삶을 어떻게 살 것인지 묻는 고전과 철학에 마음이 갑니다.",
      fit: "이 문고의 인문서와 오래 살아남은 문장이 가깝습니다.",
    };
  }
  if (axes.emotion >= 4 && axes.comfort >= 4) {
    return {
      id: "gentle",
      name: "다정한 독서가",
      summary:
        "사람의 마음을 다치지 않게 들여다보고, 읽고 난 뒤 온기가 남는 책을 찾습니다. 판단보다 옆에 앉아 주는 문장이 필요합니다.",
      fit: "온기가 있는 소설과, 삶을 다독이는 짧은 인문서가 잘 맞습니다.",
    };
  }
  if (axes.emotion >= 4 && axes.density >= 4) {
    return {
      id: "literary",
      name: "문장의 결을 따르는 사람",
      summary:
        "사건이 아니라 여운이 먼저입니다. 가족, 상실, 기억처럼 쉽게 닫히지 않는 마음을 천천히 읽습니다.",
      fit: "밀도 높은 한국 문학과, 한 줄이 오래 남는 소설이 가깝습니다.",
    };
  }
  if (axes.imagination >= 4 && axes.emotion >= 4) {
    return {
      id: "collector",
      name: "이야기 수집가",
      summary:
        "다른 생을 빌려 사는 일에 능숙합니다. 인물의 얼굴이 책보다 오래 남고, 배경이 달라도 사람은 남습니다.",
      fit: "인물이 선명한 소설, 다른 시대와 다른 운명으로 나가는 이야기가 잘 맞습니다.",
    };
  }
  if (axes.knowledge >= 4) {
    return {
      id: "structure",
      name: "세계의 구조를 묻는 사람",
      summary:
        "서사보다 원리가 궁금합니다. 읽고 나면 설명이 하나 더 생기는 책, 세계를 다시 그려 주는 책을 고릅니다.",
      fit: "교양 과학과 사회를 다루는 논픽션이 가깝습니다.",
    };
  }
  if (axes.density >= 4) {
    return {
      id: "slow",
      name: "천천히 읽는 사람",
      summary:
        "한 문장에 머무는 시간을 아끼지 않습니다. 밀도가 낮은 책은 쉽게 놓치고, 쉽게 소비되지 않는 생각에 손이 갑니다.",
      fit: "문장이 빽빽한 소설과, 오래 씹히는 인문서가 잘 맞습니다.",
    };
  }
  return {
    id: "balanced",
    name: "균형 잡힌 독서가",
    summary:
      "지식과 이야기, 위로와 자극 사이를 오갑니다. 한 장르에 가두지 않고, 오늘의 갈증에 가까운 책을 고르는 편입니다.",
    fit: "이 문고에서는 장르를 건너뛰며 골라도 어색하지 않은 책들이 남습니다.",
  };
}

export function parseAnswerQuery(raw: string | string[] | undefined): string[] {
  if (!raw) return [];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value.split(",").filter(Boolean);
}
