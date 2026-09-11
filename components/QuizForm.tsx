"use client";

import { useState } from "react";
import { QUIZ_INTRO, QUIZ_QUESTIONS } from "@/lib/quiz";

export function QuizForm() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const question = QUIZ_QUESTIONS[index];
  const progress = Math.round(((index + 1) / QUIZ_QUESTIONS.length) * 100);

  function choose(choiceId: string) {
    const nextAnswers = [...answers.slice(0, index), choiceId];
    setAnswers(nextAnswers);
    if (index + 1 >= QUIZ_QUESTIONS.length) {
      window.location.assign(`/result?a=${nextAnswers.join(",")}`);
      return;
    }
    setIndex(index + 1);
  }

  return (
    <div>
      <div className="h-1 w-full bg-paper-deep">
        <div className="h-1 bg-navy" style={{ width: `${progress}%` }} />
      </div>
      {index === 0 ? (
        <div className="mt-6 max-w-xl">
          <p className="text-sm tracking-wide text-ink/60">{QUIZ_INTRO.eyebrow}</p>
          <p className="mt-2 text-sm leading-7 text-ink/70">{QUIZ_INTRO.lead}</p>
        </div>
      ) : null}
      <p className="mt-6 text-sm text-muted">
        {index + 1} / {QUIZ_QUESTIONS.length}
      </p>
      <h1 className="mt-4 font-serif text-2xl leading-snug break-keep sm:text-3xl">{question.prompt}</h1>
      <div className="mt-8 grid gap-3">
        {question.choices.map((choice) => {
          const selected = answers[index] === choice.id;
          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => choose(choice.id)}
              className={`min-h-14 border bg-card px-4 py-4 text-left hover:border-navy ${
                selected ? "border-navy" : "border-line"
              }`}
            >
              <span className="block text-sm leading-6 text-ink">{choice.label}</span>
            </button>
          );
        })}
      </div>
      {index > 0 ? (
        <button
          type="button"
          onClick={() => setIndex(index - 1)}
          className="mt-6 inline-flex min-h-10 items-center text-sm text-muted hover:text-navy"
        >
          이전 문항
        </button>
      ) : null}
    </div>
  );
}
