import Link from "next/link";

const topics = [
  {
    title: "Number and Numeration",
    description: "Work with place value, fractions, decimals, ratios, indices, and number bases.",
  },
  {
    title: "Algebra",
    description: "Simplify expressions, solve equations, form inequalities, and practise word problems.",
  },
  {
    title: "Geometry",
    description: "Study angles, triangles, polygons, circles, construction, and coordinate geometry.",
  },
  {
    title: "Trigonometry",
    description: "Revise sine, cosine, tangent, bearings, heights, distances, and standard angles.",
  },
  {
    title: "Calculus",
    description: "Practise limits, differentiation, integration, gradients, and simple applications.",
  },
  {
    title: "Statistics",
    description: "Review mean, median, mode, charts, measures of spread, and data interpretation.",
  },
  {
    title: "Probability",
    description: "Solve questions on chance, sample spaces, combined events, and simple probability rules.",
  },
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
            <h1 className="mt-2 text-3xl font-bold">Welcome to JAMB Maths Teacher</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Choose a topic below. Each topic will later contain live online lessons,
              worked examples, practice questions, and revision tests.
            </p>
          </div>
        </div>

        <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <article
              key={topic.title}
              className="flex min-h-64 flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-bold leading-7">{topic.title}</h2>
                <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                  Recommended for JAMB
                </span>
              </div>
              <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
                {topic.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
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
