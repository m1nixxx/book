import type { ReadingFile } from "@/lib/reading";

export const LAST_YEAR_COUNT = 15;
export const YEARLY_GOAL = 30;
export const MONTHS_IN_YEAR = 12;

export type MonthStat = {
  month: number;
  count: number;
  future: boolean;
};

export type Challenge = {
  year: number;
  lastYearCount: number;
  yearlyGoal: number;
  readCount: number;
  elapsedMonths: number;
  expectedByNow: number;
  remainingMonths: number;
  remainingBooks: number;
  yearRate: number;
  gap: number;
  months: MonthStat[];
};

export function buildChallenge(reading: ReadingFile, now = new Date()): Challenge {
  const year = now.getFullYear();
  const elapsedMonths = now.getMonth() + 1;
  const counts = Array.from({ length: MONTHS_IN_YEAR }, () => 0);

  for (const item of reading.reads) {
    if (item.year !== year) continue;
    if (item.month < 1 || item.month > MONTHS_IN_YEAR) continue;
    counts[item.month - 1] += 1;
  }

  const readCount = counts.reduce((sum, count) => sum + count, 0);
  const expectedByNow = Math.round((YEARLY_GOAL * elapsedMonths) / MONTHS_IN_YEAR);
  const remainingMonths = Math.max(0, MONTHS_IN_YEAR - elapsedMonths);
  const remainingBooks = Math.max(0, YEARLY_GOAL - readCount);

  return {
    year,
    lastYearCount: LAST_YEAR_COUNT,
    yearlyGoal: YEARLY_GOAL,
    readCount,
    elapsedMonths,
    expectedByNow,
    remainingMonths,
    remainingBooks,
    yearRate: Math.min(100, Math.round((readCount / YEARLY_GOAL) * 100)),
    gap: expectedByNow - readCount,
    months: counts.map((count, index) => ({
      month: index + 1,
      count,
      future: index + 1 > elapsedMonths,
    })),
  };
}
