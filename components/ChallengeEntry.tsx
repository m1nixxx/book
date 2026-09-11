import type { Challenge } from "@/lib/challenge";

function CompareChart({ challenge }: { challenge: Challenge }) {
  const max = Math.max(challenge.yearlyGoal, challenge.readCount, challenge.lastYearCount, 1);
  const rows = [
    { label: "작년", count: challenge.lastYearCount, className: "bg-navy/25" },
    { label: "올해", count: challenge.readCount, className: "bg-navy" },
    { label: "목표", count: challenge.yearlyGoal, className: "bg-navy/50" },
  ];

  return (
    <div className="grid gap-3">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[2.5rem_1fr_2rem] items-center gap-3">
          <span className="text-xs text-muted">{row.label}</span>
          <div className="h-2.5 bg-paper-deep">
            <div className={`h-2.5 ${row.className}`} style={{ width: `${(row.count / max) * 100}%` }} />
          </div>
          <span className="text-right text-xs text-ink">{row.count}</span>
        </div>
      ))}
    </div>
  );
}

function MonthChart({ challenge }: { challenge: Challenge }) {
  const max = Math.max(...challenge.months.map((item) => item.count), 1);

  return (
    <div>
      <div className="mb-1 flex gap-[5px] text-[10px] text-muted">
        {challenge.months.map((item) => (
          <span key={item.month} className="min-w-0 flex-1 text-center">
            {item.future || item.count === 0 ? "" : item.count}
          </span>
        ))}
      </div>
      <div className="flex h-24 items-end gap-[5px]">
        {challenge.months.map((item) => {
          const bar = item.future ? 6 : Math.max((item.count / max) * 100, 4);
          return (
            <div
              key={item.month}
              className={`min-w-0 flex-1 rounded-t-[2px] ${item.future ? "bg-line" : "bg-navy"}`}
              style={{ height: `${bar}%` }}
              title={`${item.month}월 ${item.future ? "아직" : `${item.count}권`}`}
            />
          );
        })}
      </div>
      <div className="mt-2 flex gap-[5px] text-[11px] text-muted">
        {challenge.months.map((item) => (
          <span key={item.month} className="min-w-0 flex-1 text-center">
            {item.month}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ChallengePanel({ challenge }: { challenge: Challenge }) {
  return (
    <div>
      <p className="text-xs tracking-wide text-muted">{challenge.year}</p>
      <h1 className="mt-1 font-serif text-2xl text-navy">成珉의 한 해</h1>
      <p className="mt-5 font-serif text-[22px] leading-snug text-navy">
        작년 15권.
        <br />
        올해 30권.
      </p>
      <p className="mt-3 text-sm leading-7 text-ink/80">작년의 나보다 더 많이 읽고 싶어서.</p>
      <div className="mt-6 border-y border-line py-5">
        <p className="font-serif text-4xl tracking-tight text-navy">{challenge.yearRate}%</p>
        <p className="mt-1 text-sm text-muted">
          {challenge.readCount}권 읽음 · 목표 {challenge.yearlyGoal}권
        </p>
        <div className="mt-4">
          <CompareChart challenge={challenge} />
        </div>
      </div>
      <div className="mt-5">
        <h2 className="mb-3 text-sm font-bold text-ink">월별 기록</h2>
        <MonthChart challenge={challenge} />
      </div>
    </div>
  );
}
