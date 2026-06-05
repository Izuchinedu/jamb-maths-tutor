"use client";

import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "If 2x + 5 = 17, find x.",
    options: ["4", "5", "6", "7"],
    answer: "6",
    explanation: "Subtract 5 from both sides to get 2x = 12. Then divide by 2, so x = 6.",
  },
  {
    id: 2,
    question: "Simplify: 3a + 2a - a.",
    options: ["2a", "3a", "4a", "6a"],
    answer: "4a",
    explanation: "Add the coefficients: 3 + 2 - 1 = 4. So the answer is 4a.",
  },
  {
    id: 3,
    question: "What is the value of sin 30 degrees?",
    options: ["0", "1/2", "1", "sqrt(3)/2"],
    answer: "1/2",
    explanation: "A standard trigonometric value is sin 30 degrees = 1/2.",
  },
  {
    id: 4,
    question: "Find the mean of 2, 4, 6, 8.",
    options: ["4", "5", "6", "8"],
    answer: "5",
    explanation: "The mean is (2 + 4 + 6 + 8) divided by 4, which is 20/4 = 5.",
  },
  {
    id: 5,
    question: "Expand: (x + 2)(x + 3).",
    options: ["x^2 + 5x + 6", "x^2 + 6x + 5", "x^2 + x + 6", "x^2 + 5"],
    answer: "x^2 + 5x + 6",
    explanation: "Multiply each term: x times x is x^2, x times 3 is 3x, 2 times x is 2x, and 2 times 3 is 6. So the result is x^2 + 5x + 6.",
  },
];

export default function QuizPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.filter(
    (question) => selectedAnswers[question.id] === question.answer
  ).length;

  function retakeQuiz() {
    setSelectedAnswers({});
    setSubmitted(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <div>
          <p className="text-sm font-semibold text-green-700">Practice Quiz</p>
          <h1 className="mt-2 text-3xl font-bold">JAMB-style Mathematics quiz</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Answer the questions, submit, and check the explanations.
          </p>
        </div>

        {submitted && (
          <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">
            <p className="text-sm font-bold uppercase tracking-wide text-green-700">
              Quiz result
            </p>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-green-900">
                  {score} / {questions.length} correct
                </h2>
                <p className="mt-2 text-green-800">
                  Review the answers below and study the explanations carefully.
                </p>
              </div>
              <button
                type="button"
                onClick={retakeQuiz}
                className="rounded-xl border border-green-700 bg-white px-5 py-3 font-semibold text-green-800 hover:bg-green-100"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        )}

        <section className="mt-8 space-y-5">
          {questions.map((question) => (
            <article
              key={question.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="font-bold">
                {question.id}. {question.question}
              </h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {question.options.map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 hover:bg-slate-50"
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      disabled={submitted}
                      checked={selectedAnswers[question.id] === option}
                      onChange={() =>
                        setSelectedAnswers((currentAnswers) => ({
                          ...currentAnswers,
                          [question.id]: option,
                        }))
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>

              {submitted && (
                <div className="mt-4 rounded-xl bg-slate-100 p-4 text-sm leading-6">
                  <p>
                    <strong>Correct answer:</strong> {question.answer}
                  </p>
                  <p className="mt-2">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </article>
          ))}
        </section>

        {!submitted ? (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="mt-8 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            type="button"
            onClick={retakeQuiz}
            className="mt-8 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
          >
            Retake Quiz
          </button>
        )}
      </div>
    </main>
  );
}
