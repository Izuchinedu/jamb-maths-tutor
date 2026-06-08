import type { Metadata } from "next";
import LiveBoardClient from "./LiveBoardClient";

export const metadata: Metadata = {
  title: "Live Board Lesson | JAMB Maths Teacher",
  description:
    "Watch the Maths Teacher explain and solve JAMB Mathematics questions step by step.",
};

export default function LiveBoardPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-14">
        <p className="mb-4 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
          JAMB Maths Teacher
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Live Board Lesson
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Watch the Maths Teacher explain and solve JAMB Mathematics questions step by step.
        </p>

        <div className="mt-8">
          <LiveBoardClient />
        </div>
      </section>
    </main>
  );
}
