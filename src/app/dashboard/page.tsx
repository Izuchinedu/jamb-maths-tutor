import Link from "next/link";

const topics = [
  "Number and Numeration",
  "Algebra",
  "Geometry",
  "Trigonometry",
  "Calculus",
  "Statistics",
  "Probability",
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-green-700">
              Student Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold">Welcome to your JAMB Maths class</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Choose a topic below. Each topic will later contain live online lessons,
              worked examples, practice questions, and revision tests.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold hover:bg-slate-100"
          >
            Home
          </Link>
        </div>

        <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <article
              key={topic}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold">{topic}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Learn the key ideas, solve JAMB-style examples, and practise
                questions from this topic.
              </p>

              <div className="mt-5 flex gap-3">
                <Link
                  href="/tutor"
                  className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
                >
                  Start Topic
                </Link>

                <Link
                  href="/quiz"
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100"
                >
                  Take Quiz
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
