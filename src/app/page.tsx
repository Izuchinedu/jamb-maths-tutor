import Link from "next/link";

const features = [
  "Step-by-step JAMB Mathematics explanations",
  "Practice questions with instant feedback",
  "Simple lessons for Nigerian secondary school students",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="mb-4 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
          JAMB Mathematics Preparation
        </p>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
          JAMB Maths Teacher
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Online Mathematics support for students preparing for JAMB.
          Learn topics, ask questions, practise quizzes, and build confidence
          before the exam.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className="rounded-xl bg-green-700 px-6 py-3 text-base font-semibold text-white shadow hover:bg-green-800"
          >
            Start Learning
          </Link>

          <Link
            href="/quiz"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 hover:bg-slate-100"
          >
            Try a Quiz
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm"
            >
              <p className="text-sm font-semibold text-green-700">Feature</p>
              <p className="mt-2 text-slate-700">{feature}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
