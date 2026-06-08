"use client";

import { useEffect, useRef, useState } from "react";

type LessonStep = {
  teacherText: string;
  boardText: string;
};

const equationLesson: LessonStep[] = [
  {
    teacherText: "Let us solve the equation step by step.",
    boardText: "2x + 5 = 17",
  },
  {
    teacherText: "Subtract 5 from both sides.",
    boardText: "2x = 12",
  },
  {
    teacherText: "Now divide both sides by 2.",
    boardText: "x = 6",
  },
  {
    teacherText: "So the value of x is 6.",
    boardText: "Answer: x = 6",
  },
];

const fallbackLesson: LessonStep[] = [
  {
    teacherText: "This first board version currently supports a sample linear equation.",
    boardText: "Example: 2x + 5 = 17",
  },
  {
    teacherText: "We will later connect this board to the live teacher engine.",
    boardText: "Full question solving will be added next.",
  },
];

const defaultQuestion = "Solve 2x + 5 = 17";

function getLessonForQuestion(question: string) {
  const compactQuestion = question.toLowerCase().replace(/\s+/g, "");

  if (compactQuestion.includes("2x+5=17")) {
    return equationLesson;
  }

  return fallbackLesson;
}

export default function LiveBoardClient() {
  const [question, setQuestion] = useState(defaultQuestion);
  const [activeLesson, setActiveLesson] = useState<LessonStep[]>([]);
  const [visibleSteps, setVisibleSteps] = useState<LessonStep[]>([]);
  const [currentExplanation, setCurrentExplanation] = useState(
    "Enter a JAMB Mathematics question, then start the board lesson.",
  );
  const [isWriting, setIsWriting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function stopTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  function playLesson(lesson: LessonStep[]) {
    stopTimer();
    setActiveLesson(lesson);
    setVisibleSteps([]);
    setCurrentExplanation("Maths Teacher is preparing the board...");
    setIsWriting(true);
  }

  function startBoardLesson() {
    playLesson(getLessonForQuestion(question));
  }

  function replayLesson() {
    const lesson = activeLesson.length > 0 ? activeLesson : getLessonForQuestion(question);
    playLesson(lesson);
  }

  function clearBoard() {
    stopTimer();
    setActiveLesson([]);
    setVisibleSteps([]);
    setIsWriting(false);
    setCurrentExplanation("The board is clear. Enter a question to begin another lesson.");
  }

  useEffect(() => {
    if (!isWriting || activeLesson.length === 0) {
      return;
    }

    if (visibleSteps.length >= activeLesson.length) {
      return;
    }

    const nextStep = activeLesson[visibleSteps.length];
    const isFinalStep = visibleSteps.length === activeLesson.length - 1;

    timeoutRef.current = setTimeout(() => {
      setCurrentExplanation(nextStep.teacherText);
      setVisibleSteps((steps) => [...steps, nextStep]);

      if (isFinalStep) {
        setIsWriting(false);
      }
    }, visibleSteps.length === 0 ? 500 : 1300);

    return stopTimer;
  }, [activeLesson, isWriting, visibleSteps.length]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm sm:p-6">
        <label htmlFor="board-question" className="text-sm font-bold text-slate-800">
          Type your JAMB Mathematics question
        </label>
        <textarea
          id="board-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={3}
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base leading-7 text-slate-900 shadow-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-100"
          placeholder="Example: Solve 2x + 5 = 17"
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={startBoardLesson}
            className="rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow hover:bg-green-800"
          >
            Start Board Lesson
          </button>
          <button
            type="button"
            onClick={replayLesson}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-100"
          >
            Replay Lesson
          </button>
          <button
            type="button"
            onClick={clearBoard}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-100"
          >
            Clear Board
          </button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.4fr]">
        <aside className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
          <div className="rounded-3xl bg-green-50 p-5 text-center">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-green-700 text-5xl shadow-inner">
              <span aria-hidden="true">👩🏾‍🏫</span>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-green-900">JAMB Maths Teacher</h2>
            <p className="mt-2 text-sm font-semibold text-green-700">
              Maths Teacher is explaining...
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Current explanation
            </p>
            <p className="mt-2 min-h-24 text-lg leading-8 text-slate-800">
              {currentExplanation}
            </p>
          </div>

          <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Nigerian classroom-style voice will be added in a later version.
          </p>
        </aside>

        <section className="rounded-3xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
          <div className="rounded-2xl border border-green-700/50 bg-[radial-gradient(circle_at_top_left,_#14532d,_#052e16_48%,_#02130a)] p-5 text-green-50 shadow-inner sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-green-400/30 pb-4">
              <h2 className="text-xl font-bold">Class Board</h2>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-green-100">
                Step-by-step writing
              </span>
            </div>

            <div className="min-h-[28rem] space-y-5 rounded-xl bg-black/10 p-4 sm:p-6">
              {visibleSteps.length === 0 ? (
                <p className="text-lg leading-8 text-green-100/80">
                  The solution will appear here line by line when the lesson starts.
                </p>
              ) : (
                visibleSteps.map((step, index) => (
                  <div
                    key={`${step.boardText}-${index}`}
                    className="animate-[boardWrite_450ms_ease-out] border-b border-green-100/10 pb-3"
                  >
                    <p className="text-sm font-semibold text-green-200/80">Step {index + 1}</p>
                    <p className="mt-2 font-serif text-3xl italic leading-tight tracking-wide text-white sm:text-4xl">
                      {step.boardText}
                    </p>
                  </div>
                ))
              )}

              {isWriting && visibleSteps.length > 0 ? (
                <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-green-100">
                  Writing next step...
                </p>
              ) : null}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
