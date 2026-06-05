import Link from "next/link";

const features = [
  "Step-by-step JAMB Mathematics explanations",
  "Practice questions with instant feedback",
  "Simple lessons for Nigerian secondary school students",
];

const studentBenefits = [
  "Review important Mathematics topics before the exam.",
  "Practise JAMB-style questions and check clear explanations.",
  "Build confidence with steady online study support.",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-16 text-center">
        <p className="mb-4 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
          JAMB Mathematics Preparation
        </p>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
          JAMB Maths Teacher
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Online Mathematics support for students preparing for JAMB. Study key
          topics, practise exam-style questions, and follow step-by-step
          explanations that make difficult ideas easier to understand.
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

        <section className="mt-12 w-full rounded-3xl border border-green-100 bg-white p-6 text-left shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Student support
          </p>
          <h2 className="mt-2 text-2xl font-bold">How it helps students</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {studentBenefits.map((benefit, index) => (
              <article key={benefit} className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm font-bold text-green-700">Benefit {index + 1}</p>
                <p className="mt-2 leading-7 text-slate-700">{benefit}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
