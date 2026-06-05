"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const startingTopics = [
  "Number and Numeration",
  "Algebra",
  "Geometry",
  "Trigonometry",
  "Calculus",
  "Statistics",
  "Probability",
];

export default function AdminPage() {
  const [sampleQuestion, setSampleQuestion] = useState("");
  const [savedQuestions, setSavedQuestions] = useState<string[]>([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!sampleQuestion.trim()) {
      return;
    }

    setSavedQuestions((currentQuestions) => [
      sampleQuestion,
      ...currentQuestions,
    ]);
    setSampleQuestion("");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-green-700">Admin Area</p>
            <h1 className="mt-2 text-3xl font-bold">Content management</h1>
            <p className="mt-3 text-slate-600">
              This is a simple placeholder admin page. We will connect it to a
              real database later.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold hover:bg-slate-100"
          >
            Back to Dashboard
          </Link>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Topic list</h2>
            <ul className="mt-4 space-y-3">
              {startingTopics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-xl bg-slate-100 px-4 py-3 font-medium"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Add a sample question</h2>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <textarea
                value={sampleQuestion}
                onChange={(event) => setSampleQuestion(event.target.value)}
                placeholder="Example: Solve 2x + 5 = 17."
                className="min-h-32 w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-green-700"
              />

              <button
                type="submit"
                className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
              >
                Add Question
              </button>
            </form>

            <div className="mt-6">
              <h3 className="font-bold">Questions added in this session</h3>
              <div className="mt-3 space-y-3">
                {savedQuestions.length === 0 ? (
                  <p className="text-sm text-slate-500">No question added yet.</p>
                ) : (
                  savedQuestions.map((question, index) => (
                    <p key={`${question}-${index}`} className="rounded-xl bg-slate-100 p-3">
                      {question}
                    </p>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
